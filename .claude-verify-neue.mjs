const target = (await (await fetch('http://localhost:9227/json/list')).json()).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let id = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => { const message = JSON.parse(data); const callback = pending.get(message.id); if (callback) { pending.delete(message.id); callback(message); } });
function command(method, params = {}) { const requestId = ++id; socket.send(JSON.stringify({ id: requestId, method, params })); return new Promise((resolve, reject) => pending.set(requestId, (message) => message.error ? reject(message.error) : resolve(message.result))); }
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 1500))', awaitPromise: true });
const inspected = await command('Runtime.evaluate', { expression: `(() => {
 const input = document.querySelector('input[aria-label="Texto de demonstração"]');
 const board = [...document.querySelectorAll('*')].find((el) => el.textContent?.trim() === 'Laboratório tipográfico')?.parentElement?.parentElement;
 const before = input?.value;
 if (input) { input.value = 'Teste'; input.dispatchEvent(new Event('input', { bubbles: true })); }
 const buttons = [...document.querySelectorAll('button')];
 buttons.find((b) => b.textContent?.trim() === 'Bold')?.click();
 const preview = [...document.querySelectorAll('p')].find((el) => el.textContent?.trim() === 'teste');
 board?.scrollIntoView({ block: 'center', behavior: 'instant' });
 return JSON.stringify({
   neueTitle: Boolean([...document.querySelectorAll('h3')].find((el) => el.textContent?.trim() === 'Neue Montreal')),
   inputBefore: before,
   inputAfter: input?.value,
   previewWeight: preview ? getComputedStyle(preview).fontWeight : null,
   paletteColumns: board ? getComputedStyle(board).display : null,
   paletteCount: board?.children.length ?? null,
 });
})()`, returnByValue: true });
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 250))', awaitPromise: true });
const screenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
process.stdout.write(`${inspected.result.value}\n${screenshot.data}`);
socket.close();
