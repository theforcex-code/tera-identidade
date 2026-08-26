const target = (await (await fetch('http://localhost:9223/json/list')).json()).find((item) => item.type === 'page');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
let requestId = 0;
const commands = new Map();
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  const handler = commands.get(message.id);
  if (!handler) return;
  commands.delete(message.id);
  handler(message);
});
function command(method, params = {}) {
  const id = ++requestId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => {
    commands.set(id, (message) => message.error ? reject(message.error) : resolve(message.result));
  });
}
await command('Runtime.evaluate', {
  expression: `new Promise((resolve) => setTimeout(resolve, 1500))`,
  awaitPromise: true,
});
await command('Runtime.evaluate', {
  expression: `new Promise((resolve) => { document.querySelector('img[src="/media/interferencia-luz.png"]').scrollIntoView({ block: 'center', behavior: 'instant' }); setTimeout(resolve, 800); })`,
  awaitPromise: true,
});
const inspected = await command('Runtime.evaluate', {
  expression: `(() => {
    const title = [...document.querySelectorAll('h3')].find((el) => el.textContent.trim() === 'Interferência da Luz');
    const material = document.querySelector('img[src="/media/interferencia-luz.png"]');
    const specimen = [...document.querySelectorAll('p')].find((el) => el.textContent.trim() === 'INTER BOLD');
    const italic = [...document.querySelectorAll('p')].find((el) => el.textContent.trim() === 'INTER EXTRA LIGHT IT.');
    const get = (el) => el ? getComputedStyle(el) : null;
    return JSON.stringify({
      scrollY: window.scrollY,
      title: title && { fontStyle: get(title).fontStyle, fontWeight: get(title).fontWeight },
      material: material && { display: get(material).display, parentBorder: get(material.parentElement).borderWidth, parentBorderRadius: get(material.parentElement).borderRadius },
      bold: specimen && { fontStyle: get(specimen).fontStyle, fontWeight: get(specimen).fontWeight },
      italic: italic && { fontStyle: get(italic).fontStyle, fontWeight: get(italic).fontWeight },
    });
  })()`,
  returnByValue: true,
});
const screenshot = await command('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
process.stdout.write(`${inspected.result.value}\n${screenshot.data}`);
socket.close();
