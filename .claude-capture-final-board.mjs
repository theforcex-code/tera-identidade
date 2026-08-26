const target = (await (await fetch('http://localhost:9226/json/list')).json()).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let id = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => { const message = JSON.parse(data); const callback = pending.get(message.id); if (callback) { pending.delete(message.id); callback(message); } });
function command(method, params = {}) { const requestId = ++id; socket.send(JSON.stringify({ id: requestId, method, params })); return new Promise((resolve, reject) => pending.set(requestId, (message) => message.error ? reject(message.error) : resolve(message.result))); }
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 1200))', awaitPromise: true });
await command('Runtime.evaluate', { expression: `(() => [...document.querySelectorAll('*')].find((el) => el.textContent?.trim() === 'Preto Carvão')?.closest('.palette-board')?.scrollIntoView({ block: 'center', behavior: 'instant' }))()` });
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 300))', awaitPromise: true });
const shot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
process.stdout.write(shot.data);
socket.close();
