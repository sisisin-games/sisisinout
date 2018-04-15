/* global Reveal:false */
(async () => {
  const container = $('<div class="reveal"/>');
  const slides = $('<div class="slides"/>').appendTo(container);

  slides
    .append($('h1'))
    .append($('.mw-parser-output').children())
    .find('.plainlinks, .vertical-navbox, .infobox, .toc, .mw-editsection, .reference, :empty').remove().end()
    .children(':header').each((_, h) => {
      $(h).nextUntil(':header').addBack().wrapAll('<section/>');
    });

  slides.find('> section > *:not(:first-child), > section ').addClass('fragment');

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
    center: false,
    transition: 'fade',
  });
})();
