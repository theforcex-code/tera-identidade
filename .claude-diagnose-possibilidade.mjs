const target = (await (await fetch('http://localhost:9224/json/list')).json()).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let id = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => { const message = JSON.parse(data); const callback = pending.get(message.id); if (callback) { pending.delete(message.id); callback(message); } });
function command(method, params = {}) { const requestId = ++id; socket.send(JSON.stringify({ id: requestId, method, params })); return new Promise((resolve, reject) => pending.set(requestId, (message) => message.error ? reject(message.error) : resolve(message.result))); }
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 500))', awaitPromise: true });
const result = await command('Runtime.evaluate', { expression: `JSON.stringify([...document.querySelectorAll('h2')].filter((element) => ['POSSIBILIDADE', 'Moodboard', 'Tipografia', 'Paleta'].includes(element.textContent.trim())).map((element) => ({ text: element.textContent.trim(), fontStyle: getComputedStyle(element).fontStyle, fontWeight: getComputedStyle(element).fontWeight })))`, returnByValue: true });
process.stdout.write(result.result.value);
socket.close();
