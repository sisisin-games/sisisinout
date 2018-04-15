/* global Reveal:false */
(async () => {
  $('#mw-content-text')
    .addClass('reveal')
    .prependTo(document.body)
    .nextAll()
    .remove();

  $('.mw-parser-output')
    .addClass('slides')
    .nextAll()
    .remove();

  $('.vertical-navbox').remove();

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.0.0/css/reveal.min.css')
    .appendTo(document.head);

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/css/theme/black.min.css')
    .appendTo(document.head);

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/lib/js/head.min.js');
  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize();
})();
