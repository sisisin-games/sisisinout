/* global Reveal:false */
(async () => {
  $('#bodyContent').addClass('reveal');
  $('.mw-parser-output').addClass('slides');

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize();
})();
