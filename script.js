/* global Reveal:false */
(async () => {
  $('#bodyContent').addClass('reveal');
  $('.mw-parser-output').addClass('slides');

  $('<link rel="stylesheet"/>')
    .attr('href', 'https://cdn.jsdelivr.net/npm/reveal.js@3.0.0/css/reveal.min.css')
    .appendTo(document.head);

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize();
})();
