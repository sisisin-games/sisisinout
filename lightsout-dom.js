document.addEventListener('DOMContentLoaded', async () => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);
  let clickCount = 0;

  document.addEventListener('click', ({target}) => {
    if (!target.matches('.light'))
      return;

    onClick(
      +target.getAttribute('data-x'),
      +target.getAttribute('data-y'),
    );
  }, false);

  function onClick(x, y) {
    clickCount++;

    document.querySelectorAll(`
      [data-x="${x}"][data-y="${y}"],
      [data-x="${x}"][data-y="${y - 1}"],
      [data-x="${x - 1}"][data-y="${y}"],
      [data-x="${x + 1}"][data-y="${y}"],
      [data-x="${x}"][data-y="${y + 1}"]
    `).forEach(el => el.classList.toggle('on'));

    setTimeout(onChange, 100);
  }

  function onChange() {
    if (!document.querySelector('.light.on'))
      onFinish();
  }

  function onFinish() {
    const endedAt = Date.now();

    alert(`クリア！\nタイムは ${(endedAt - startedAt) / 1000 | 0} 秒でした`);

    location.href = `?size=${width + 1}x${height + 1}`;
  }

  const board = document.querySelector('.board');

  board.style['grid-template-columns'] = '1fr '.repeat(width);
  board.style['grid-template-rows'] = '1fr '.repeat(height);

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      board.insertAdjacentHTML('beforeend', `<div class="light" data-x="${x}" data-y="${y}">`);

  Array.from(document.querySelectorAll('.light'))
    .filter(() => Math.random() < 0.5)
    .forEach(el => el.click());

  const startedAt = Date.now();
}, false);
