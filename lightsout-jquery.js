$(document).on('click', '.light', ({target}) => {
  const $el = $(target);

  $(document).trigger('lo:click', [
    +$el.data('x'),
    +$el.data('y'),
  ]);
});

$(document).on('lo:click', (_, x, y) => {
  $(`[data-x="${x}"][data-y="${y}"]`)
    .add(`[data-x="${x}"][data-y="${y - 1}"]`)
    .add(`[data-x="${x - 1}"][data-y="${y}"]`)
    .add(`[data-x="${x + 1}"][data-y="${y}"]`)
    .add(`[data-x="${x}"][data-y="${y + 1}"]`)
    .toggleClass('on');

  setTimeout(() => $(document).trigger('lo:change'), 100);
});

$(document).on('lo:change', () => {
  if (!$('.light.on').length)
    $(document).trigger('lo:finish');
});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);
  const board = $('.board').css({
    'grid-template-columns': '1fr '.repeat(width),
    'grid-template-rows': '1fr '.repeat(height),
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board.append(`<div class="light" data-x="${x}" data-y="${y}">`);
    }
  }

  $('.light').filter(() => Math.random() < 0.5).each((_, l) => $(l).click());

  const startedAt = Date.now();

  await new Promise(resolve => $(document).one('lo:finish', resolve));

  const endedAt = Date.now();

  alert(`クリア！\nタイムは ${(endedAt - startedAt) / 1000 | 0} 秒でした`);
});
