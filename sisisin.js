$(document).on('click', '.nyan', ({target}) => {
  const $el = $(target);

  $(document).trigger('si:click', [
    +$el.data('x'),
    +$el.data('y'),
  ]);
});

$(document).on('si:click', (_, x, y) => {
  $(`[data-x="${x}"][data-y="${y}"]`).each((_, nyan) => {
    const $nyan = $(nyan);
    $nyan.data('r', ($nyan.data('r') + 1) % 4);
  });
  $(`
    [data-x="${x}"][data-y="${y - 1}"], [data-x="${x - 1}"][data-y="${y}"],
    [data-x="${x + 1}"][data-y="${y}"], [data-x="${x}"][data-y="${y + 1}"]
  `).each((_, nyan) => {
      const $nyan = $(nyan);
      $nyan.data('r', ($nyan.data('r') + 3) % 4);
    });

  setTimeout(() => $(document).trigger('si:change'), 100);
});

$(document).on('si:change', () => {
  if (!$('.nyan:not([data-r="0"])').length)
    $(document).trigger('si:finish');
});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);
  const board = $('.board').css({
    'grid-template-columns': '1fr '.repeat(width),
    'grid-template-rows': '1fr '.repeat(height),
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      $(`<div class="nyan"/>`)
        .data({ x, y, r: 0 })
        .appendTo(board);
    }
  }

  $('.nyan').filter(() => Math.random() < 0.5).each((_, l) => $(l).click());

  const startedAt = Date.now();

  await new Promise(resolve => $(document).one('si:finish', resolve));

  const endedAt = Date.now();

  alert(`クリア！\nタイムは ${(endedAt - startedAt) / 1000 | 0} 秒でした`);
});
