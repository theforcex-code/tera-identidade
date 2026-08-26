const target = (await (await fetch('http://localhost:9224/json/list')).json()).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let id = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => { const message = JSON.parse(data); const done = pending.get(message.id); if (done) { pending.delete(message.id); done(message); } });
function command(method, params = {}) { const requestId = ++id; socket.send(JSON.stringify({ id: requestId, method, params })); return new Promise((resolve, reject) => pending.set(requestId, (message) => message.error ? reject(message.error) : resolve(message.result))); }
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 1200))', awaitPromise: true });
const result = await command('Runtime.evaluate', { expression: `(() => {
  const possibility = document.querySelector('img[src="/media/capa-possibilidade.mp4"]');
  const continuity = document.querySelector('img[src="/media/capa-continuidade.gif"]');
  const material = document.querySelector('img[src="/media/interferencia-luz.png"]');
  const futura = [...document.querySelectorAll('h3')].filter((el) => el.textContent.trim() === 'Futura');
  return JSON.stringify({
    possibility: possibility && { width: possibility.clientWidth, height: possibility.clientHeight },
    continuity: continuity && { transform: getComputedStyle(continuity).transform },
    material: material && { parentBorder: getComputedStyle(material.parentElement).borderWidth, radius: getComputedStyle(material.parentElement).borderRadius, ratio: getComputedStyle(material.parentElement).aspectRatio },
    futura: futura.map((el) => ({ top: Math.round(el.parentElement.parentElement.getBoundingClientRect().top) })),
  });
})()`, returnByValue: true });
process.stdout.write(result.result.value);
socket.close();
