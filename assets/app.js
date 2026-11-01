/* Evergreen Paathshala - shared behaviour */
(function(){
  var R=document.documentElement;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  var TITLES={};
  function setLang(l){
    R.setAttribute('lang',l); set('ep_lang',l);
    document.querySelectorAll('[data-lang-btn]').forEach(function(b){b.classList.toggle('on',b.dataset.langBtn===l)});
    document.querySelectorAll('[data-ph-en]').forEach(function(e){e.placeholder=l==='hi'?e.dataset.phHi:e.dataset.phEn});
    var t=document.querySelector('title'); if(t&&t.dataset['t'+l]) document.title=t.dataset['t'+l];
  }
  function setTheme(t){R.setAttribute('data-theme',t);set('ep_theme',t);
    var m=document.querySelector('meta[name=theme-color]'); if(m) m.content=t==='day'?'#fffaf5':'#0b0c11';}
  setLang(get('ep_lang')||'en'); setTheme(get('ep_theme')||'night');
  document.addEventListener('DOMContentLoaded',function(){
    setLang(R.getAttribute('lang'));
    document.querySelectorAll('[data-lang-btn]').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.langBtn)})});
    var tb=document.getElementById('themeBtn'); if(tb) tb.addEventListener('click',function(){setTheme(R.getAttribute('data-theme')==='day'?'night':'day')});

    /* drawer */
    var dr=document.getElementById('drawer'),sc=document.getElementById('scrim');
    function openD(){dr.classList.add('open');sc.classList.add('show')}
    function closeD(){dr.classList.remove('open');sc.classList.remove('show')}
    var mb=document.getElementById('menuBtn'); if(mb) mb.addEventListener('click',openD);
    if(sc) sc.addEventListener('click',closeD);
    document.querySelectorAll('#drawer a,#drawer .close').forEach(function(a){a.addEventListener('click',closeD)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeD();var lb=document.getElementById('lb');if(lb)lb.classList.remove('show')}});

    /* active nav */
    var pg=document.body.dataset.page;
    document.querySelectorAll('[data-nav]').forEach(function(a){if(a.dataset.nav===pg)a.classList.add('active')});

    /* reveal */
    var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
    document.querySelectorAll('.reveal').forEach(function(e){io?io.observe(e):e.classList.add('in')});

    /* counters */
    function count(el){var to=+el.dataset.to,s=el.dataset.suf||'',t0=null;
      function f(ts){t0=t0||ts;var p=Math.min((ts-t0)/1400,1);el.textContent=Math.floor(to*p).toLocaleString('en-IN')+s;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
    var co=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);co.unobserve(e.target)}})},{threshold:.5}):null;
    document.querySelectorAll('[data-to]').forEach(function(e){co?co.observe(e):e.textContent=e.dataset.to+(e.dataset.suf||'')});

    /* testimonial slider */
    var sl=document.querySelector('.slider');
    if(sl){var slides=sl.querySelectorAll('.slide'),dots=sl.querySelectorAll('.dots button'),i=0,tm;
      function show(n){i=(n+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('on',k===i)})}
      function auto(){clearInterval(tm);tm=setInterval(function(){show(i+1)},5500)}
      dots.forEach(function(d,k){d.addEventListener('click',function(){show(k);auto()})});show(0);auto();}

    /* tabs */
    document.querySelectorAll('.tabs').forEach(function(tabs){
      tabs.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
        tabs.querySelectorAll('button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
        document.querySelectorAll('.pane').forEach(function(p){p.classList.toggle('on',p.id===b.dataset.pane)})})})});

    if(location.hash){var hb=document.querySelector('.tabs button[data-pane="'+location.hash.slice(1)+'"]');if(hb)hb.click()}
    window.addEventListener('hashchange',function(){var hb=document.querySelector('.tabs button[data-pane="'+location.hash.slice(1)+'"]');if(hb)hb.click()});
    /* accordion */
    document.querySelectorAll('.acc-q').forEach(function(q){q.addEventListener('click',function(){q.parentNode.classList.toggle('open')})});

    /* gallery filter + lightbox */
    var fl=document.querySelector('.filters');
    if(fl){fl.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
      fl.querySelectorAll('button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
      document.querySelectorAll('.gitem').forEach(function(g){g.classList.toggle('hide',b.dataset.f!=='all'&&g.dataset.cat!==b.dataset.f)})})})}
    var lb=document.getElementById('lb');
    if(lb){document.querySelectorAll('.gitem').forEach(function(g){g.addEventListener('click',function(){
        lb.querySelector('.slot').innerHTML=g.outerHTML.replace('gitem','');lb.classList.add('show')})});
      lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('show')})}

    /* forms -> WhatsApp (works without a server) */
    document.querySelectorAll('form[data-wa]').forEach(function(f){f.addEventListener('submit',function(e){
      e.preventDefault();var l=R.getAttribute('lang'),box=f.querySelector('.msg'),lines=[],ok=true;
      f.querySelectorAll('[name]').forEach(function(el){if(el.required&&!el.value.trim())ok=false;
        if(el.value.trim())lines.push((el.dataset.label||el.name)+': '+el.value.trim())});
      var ph=f.querySelector('[name=phone]'); if(ph&&ph.value&&!/^[0-9+\-\s]{10,15}$/.test(ph.value.trim()))ok=false;
      box.className='msg '+(ok?'ok':'err');
      box.textContent=ok?(l==='hi'?'धन्यवाद! WhatsApp खुल रहा है, संदेश भेज दीजिए।':'Thank you! Opening WhatsApp - please press send.')
                        :(l==='hi'?'कृपया सभी ज़रूरी जानकारी सही भरें।':'Please fill all required fields correctly.');
      if(ok){window.open('https://wa.me/917209980722?text='+encodeURIComponent('Evergreen Paathshala - '+f.dataset.wa+'\n'+lines.join('\n')),'_blank');f.reset()}
    })});

    /* misc */
    var up=document.getElementById('totop');
    if(up){window.addEventListener('scroll',function(){up.classList.toggle('show',window.scrollY>500)});up.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})})}
    document.querySelectorAll('.yr').forEach(function(e){e.textContent=new Date().getFullYear()});
  });
})();
