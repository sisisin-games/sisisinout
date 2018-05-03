jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);
  const board = $('.board');

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board.append(`<div class="light" data-x="${x}" data-y="${y}">`);
    }
  }
});
