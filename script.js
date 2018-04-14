/* global Reveal:false */
(async () => {
  $('.mw-parser-output');

  await $.getScript('https://cdn.jsdelivr.net/npm/reveal.js@3.6.0/js/reveal.min.js');
  
  Reveal.initialize();
})();
