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
    .find('section > :not(section):not(:first-child), li, dt, dd').not(':first-child').addClass('fragment').end()
    .appendTo(container);

  $('style, link[rel="stylesheet"]').remove();

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/css/reveal.min.css')
    .appendTo(document.head);

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/css/theme/league.min.css')
    .appendTo(document.head);

  $('body').empty().append(container);

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize({
    width: '100%',
    height: '100%',
    transition: 'fade',
  });
})();
