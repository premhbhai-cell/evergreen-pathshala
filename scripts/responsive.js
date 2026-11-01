/* Small mobile helpers (works on every page) */
(function () {
  'use strict';
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function () {
    var nav = document.getElementById('mySidenav');
    if (!nav) return;

    // dim background while menu is open
    var scrim = document.createElement('div');
    scrim.className = 'menu-scrim';
    document.body.appendChild(scrim);

    function isOpen(){ return nav.style.width && nav.style.width !== '0px' && nav.style.width !== '0'; }
    function sync(){ scrim.classList.toggle('show', isOpen()); }
    function close(){ nav.style.width = '0px'; sync(); }

    // existing code opens the menu by setting inline width, so observe it
    new MutationObserver(sync).observe(nav, {attributes:true, attributeFilter:['style']});

    scrim.addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
    nav.addEventListener('click', function(e){
      var a = e.target.closest('a');
      if (a && !a.classList.contains('closebtn')) close();
    });
  });
})();
