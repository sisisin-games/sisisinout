$(document).on('click', '.nyan', ({target}) => {
  const $el = $(target);

  $(document).trigger('si:click', [
    +$el.data('x'),
    +$el.data('y'),
  ]);
});

$(document).on('si:click', (_, x, y) => {
  $(`[data-x="${x}"][data-y="${y}"]`).each((_, nyan) => {
    const deg = +nyan.dataset.deg + 90;
    nyan.dataset.r = (+nyan.dataset.r + 1) % 4;
    nyan.dataset.deg = deg;
    nyan.style.transform = `rotate(${deg}deg)`;
  });

  $(`
    [data-x="${x}"][data-y="${y - 1}"], [data-x="${x - 1}"][data-y="${y}"],
    [data-x="${x + 1}"][data-y="${y}"], [data-x="${x}"][data-y="${y + 1}"]
  `).each((_, nyan) => {
    const deg = nyan.dataset.deg - 90;
    nyan.dataset.r = (+nyan.dataset.r + 3) % 4;
    nyan.dataset.deg = deg;
    nyan.style.transform = `rotate(${deg}deg)`;
  });

  setTimeout(() => $(document).trigger('si:change'), 200);
});

$(document).on('si:change', () => {
  if (!$('.nyan:not([data-r="0"])').length)
    $(document).trigger('si:finish');
});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);
  const board = $('.board').css({
    'grid-template': `repeat(${height}, 1fr)/ repeat(${width}, 1fr)`,
  });

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      board.append(`<div class="nyan" data-x="${x}" data-y="${y}" data-r="0" data-deg="0">`);

  for (const i of [...Array(3)])
    $('.nyan').filter(() => Math.random() < 0.3).each((_, l) => $(l).click());

  let count = 0;

  $(document).on('si:click', () => {
    count++;
    document.title = `sisisinout (${count})`;
  });

  const startedAt = Date.now();

  await new Promise(resolve => $(document).one('si:finish', resolve));

  const time = ((Date.now() - startedAt) / 1000).toFixed(2);

  alert(`クリア！\n操作数は ${count} 回\nタイムは ${time} 秒でした`);

  location.reload();
});
