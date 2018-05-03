$(document).on('click', '.light', ({target}) => {
  const $l = $(target);
  const x = +$l.data('x');
  const y = +$l.data('y');

  $l
    .add(`[data-x="${x}"][data-y="${y - 1}"]`)
    .add(`[data-x="${x - 1}"][data-y="${y}"]`)
    .add(`[data-x="${x + 1}"][data-y="${y}"]`)
    .add(`[data-x="${x}"][data-y="${y + 1}"]`)
    .toggleClass('on');

  $(document).trigger('lo:change');
});

$(document).on('lo:change', () => {
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
});
