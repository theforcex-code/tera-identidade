const target = (await (await fetch('http://localhost:9224/json/list')).json()).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let id = 0;
const pending = new Map();
socket.addEventListener('message', ({ data }) => { const message = JSON.parse(data); const callback = pending.get(message.id); if (callback) { pending.delete(message.id); callback(message); } });
function command(method, params = {}) { const requestId = ++id; socket.send(JSON.stringify({ id: requestId, method, params })); return new Promise((resolve, reject) => pending.set(requestId, (message) => message.error ? reject(message.error) : resolve(message.result))); }
await command('Page.reload', { ignoreCache: true });
await command('Runtime.evaluate', { expression: 'new Promise((resolve) => setTimeout(resolve, 1500))', awaitPromise: true });
const inspected = await command('Runtime.evaluate', { expression: `(() => {
  const title = [...document.querySelectorAll('*')].find((el) => el.textContent?.trim() === 'Preto Carvão');
  const article = title?.closest('article');
  const grid = article?.parentElement;
  const swatch = article?.firstElementChild;
  if (grid) grid.scrollIntoView({ block: 'center', behavior: 'instant' });
  const s = (el) => el ? getComputedStyle(el) : null;
  return JSON.stringify({
    grid: grid && { display: s(grid).display, columns: s(grid).gridTemplateColumns, width: s(grid).width },
    article: article && { display: s(article).display, width: s(article).width, height: s(article).height },
    swatch: swatch && { display: s(swatch).display, width: s(swatch).width, height: s(swatch).height, background: s(swatch).backgroundColor },
  });
})()`, returnByValue: true });
process.stdout.write(inspected.result.value);
socket.close();
