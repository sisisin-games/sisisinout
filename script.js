/* global Reveal:false */
(async () => {
  $('.mw-parser-output')
    .addClass('slides');

  $('#mw-content-text')
    .addClass('reveal')
    .prependTo(document.body)
    .nextAll()
    .remove();

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.0.0/css/reveal.min.css')
    .appendTo(document.head);

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize();
})();
