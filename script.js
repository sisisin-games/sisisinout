/* global Reveal:false */
(async () => {
  const container = $('<div class="reveal"/>');

  $('<div class="slides"/>')
    .append($('h1'))
    .append($('.mw-parser-output').children())
    .find('.plainlinks, .vertical-navbox, .mbox-small, .infobox, .toc, .mw-editsection, .reference, .navbox, :empty:not(img)').remove().end()
    .find('.references').prev(':header').remove().end().remove().end()
    .children(':header').each((_, h) => {
      $(h).nextUntil(':header').addBack().wrapAll('<section/>');
    }).end()
    .find('section > :not(section):not(:first-child)').addClass('fragment').end()
    .find('li, dt, dd').not(':first-child').addClass('fragment').end().end()
    .appendTo(container);

  $('body').empty().append(container);

  $('style, link[rel="stylesheet"]').remove();

  $('head')
    .append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/css/reveal.min.css"/>')
    .append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/css/theme/league.min.css"/>');

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');

  Reveal.initialize({
    width: '100%',
    height: '100%',
    transition: 'fade',
  });
})();
