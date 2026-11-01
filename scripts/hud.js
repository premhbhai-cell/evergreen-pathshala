/* Camera HUD behaviour: rotating title + battery drain */
(function () {
  'use strict';
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function () {
    /* rotate headings */
    var heads = document.querySelectorAll('#rotate .cam-heading');
    if (heads.length > 1) {
      var i = 0;
      setInterval(function () {
        heads[i].classList.remove('is-active');
        i = (i + 1) % heads.length;
        heads[i].classList.add('is-active');
      }, 3600);
    }
    /* battery: slow drain loop, label shows remaining time */
    var fill = document.getElementById('batFill');
    var label = document.getElementById('batTime');
    var box = document.querySelector('.hud-battery');
    if (fill && label) {
      var FULL = 46, total = 90, left = total;   // 01:30 -> 00:00 (1 s = 1 min, visual only)
      function fmt(m){ var h=Math.floor(m/60), mm=m%60; return '~'+('0'+h).slice(-2)+':'+('0'+mm).slice(-2); }
      function draw(){
        fill.setAttribute('width', Math.max(2, FULL * left / total));
        label.textContent = fmt(left);
        if (box) box.classList.toggle('low', left <= 15);
      }
      draw();
      setInterval(function () {
        left = left <= 0 ? total : left - 1;
        draw();
      }, 4000);
    }
  });
})();
