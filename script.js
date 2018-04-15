/* global Reveal:false */
(async () => {
  $('.mw-parser-output')
    .addClass('slides')
    .prepend($('h1'))
    .nextAll()
    .remove();

  $('#mw-content-text')
    .addClass('reveal')
    .prependTo(document.body)
    .nextAll()
    .remove();


  $('.mw-parser-output')
    .children(':not(:header)').addClass('fragment').end()
    .find('li, dt, dd').filter(':not(:first-child)').addClass('fragment').end().end()
    .find(':header').each((_, h) => {
      $(h).nextUntil(':header').addBack().wrapAll('<section/>');
    });

  $('.plainlinks, .vertical-navbox, .infobox, .toc, .mw-editsection, .reference, :empty').remove();

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.0.0/css/reveal.min.css')
    .appendTo(document.head);

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/css/theme/league.min.css')
    .appendTo(document.head);

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize({transition: 'fade'});
})();
