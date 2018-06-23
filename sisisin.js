$(document).on('click touch', '.nyan', ({target}) => {
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
  const imageUrl = 'https://emoji.slack-edge.com/T04Q5G460/sisisin/dca153ae0c46d1c3.jpg';
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 5, 5]).map(Number);
  const board = $('.board').css({
    'grid-template-columns': '1fr '.repeat(width),
    'grid-template-rows': '1fr '.repeat(height),
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board.append(`<div class="cell"><img src="${imageUrl}" class="nyan" data-x="${x}" data-y="${y}" data-r="0" data-deg="0">`);
    }
  }

  $('.nyan').filter(() => Math.random() < 0.3).each((_, l) => $(l).click());
  $('.nyan').filter(() => Math.random() < 0.3).each((_, l) => $(l).click());
  $('.nyan').filter(() => Math.random() < 0.3).each((_, l) => $(l).click());

  let count = 0;

  $(document).on('si:click', () => count++);

  const startedAt = Date.now();

  await new Promise(resolve => $(document).one('si:finish', resolve));

  const endedAt = Date.now();
  const time = ((endedAt - startedAt) / 1000).toFixed(2);

  const cving = cv({ count, time, size: `${width}x${height}` });

  alert(`クリア！\n操作数は ${count} 回\nタイムは ${time} 秒でした`);

  await cving;

  location.reload();
});

async function cv(cvDetail) {
  if (!window._adp) {
    window._adp = [];
  }

  const ping = {
    cvDetail,
    s: 'wc',
    a: '403',
    f: '469',
    u: 'https://a403.stg-tracker.adplan7.com/wc/c/j/469',
    db: 'https://a403.stg-tracker.adplan7.com/db/pb/403',
  };

  window._adp.push(ping);

  const script = document.createElement('script');
  script.src = 'https://stg-widget.adplan7.com/s/1.0/wc.js';
  script.charset = 'utf-8';
  script.async = true;
  document.head.appendChild(script);
  document.adoptNode(script);

  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (!window._adp._done || !window._adp._done.includes(ping))
        return;

      clearInterval(timer);
      resolve();
    }, 100);
  });
}
