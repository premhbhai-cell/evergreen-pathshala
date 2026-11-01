/* Evergreen Paathshala - navbar behaviour (all pages) */
(function () {
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded',fn); }
  ready(function () {
    var nav = document.getElementById('mySidenav');
    var open = document.getElementById('navmenubar');
    var close = document.getElementById('closebtn');
    if (!nav) return;
    function openNav(){ nav.style.width = Math.min(350, window.innerWidth * 0.88) + 'px'; }
    function closeNav(){ nav.style.width = '0px'; }
    if (open) open.addEventListener('click', function(e){ e.stopPropagation(); openNav(); });
    if (close) close.addEventListener('click', function(e){ e.preventDefault(); closeNav(); });
    window.addEventListener('resize', function(){ if (window.innerWidth > 1239) closeNav(); });

    // "More" dropdown: tap support on touch screens
    var more = document.querySelector('.main-nav .has-sub > a');
    if (more) more.addEventListener('click', function(e){
      e.preventDefault();
      more.parentNode.classList.toggle('open');
    });
    document.addEventListener('click', function(e){
      var li = document.querySelector('.main-nav .has-sub');
      if (li && !li.contains(e.target)) li.classList.remove('open');
    });
  });
})();
