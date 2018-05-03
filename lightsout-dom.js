document.addEventListener('DOMContentLoaded', async () => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);

  document.addEventListener('click', ({currentTarget}) => {
    if (!currentTarget.matches('.light'))
      return;

    const x = +currentTarget.getAttribute('data-x');
    const y = +currentTarget.getAttribute('data-y');

    document.querySelectorAll(`
      [data-x="${x}"][data-y="${y}"],
      [data-x="${x}"][data-y="${y - 1}"],
      [data-x="${x - 1}"][data-y="${y}"],
      [data-x="${x + 1}"][data-y="${y}"],
      [data-x="${x}"][data-y="${y + 1}"]
    `).forEach(el => el.classList.toggle('on'));

    setTimeout(onChange, 100);
  }, false);

  function onClick(x, y) {
  }

  function onChange() {
    if (!document.querySelector('.light.on'))
      onFinish();
  }

  function onFinish() {
  }


  const board = document.querySelector('.board');
  board.style['grid-template-columns'] = '1fr '.repeat(width);
  board.style['grid-template-rows'] = '1fr '.repeat(height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board.insertAdjacentHTML('beforeend', `<div class="light" data-x="${x}" data-y="${y}">`);
    }
  }

  Array.from(document.querySelectorAll('.light'))
    .filter(() => Math.random() < 0.5)
    .forEach(el => el.click());

  const startedAt = Date.now();

  await new Promise(resolve => $(document).one('lo:finish', resolve));

  const endedAt = Date.now();

  alert(`クリア！\nタイムは ${(endedAt - startedAt) / 1000 | 0} 秒でした`);
}, false);
