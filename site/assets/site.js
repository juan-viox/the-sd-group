/* =========================================================
   The SD Group — Shared site behavior
   Runs on every page. Every feature is guarded by an
   element-existence check so pages without certain sections
   degrade gracefully.
   ========================================================= */
window.addEventListener('load', init);

function init(){
  var hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------- LANGUAGE TOGGLE ---------- */
  var langButtons = document.querySelectorAll('.lang button');

  function applyLang(lang){
    document.documentElement.lang = lang;
    try { localStorage.setItem('sdg-lang', lang); } catch(e){}
    langButtons.forEach(function(b){
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    // <title>
    var titleEl = document.querySelector('title');
    if (titleEl) {
      var tAttr = titleEl.getAttribute('data-' + lang);
      if (tAttr) titleEl.textContent = tAttr;
    }
    // Every bilingual element
    document.querySelectorAll('[data-en][data-es]').forEach(function(el){
      var txt = el.getAttribute('data-' + lang);
      if (txt != null) el.textContent = txt;
    });
    // Placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(function(el){
      el.placeholder = el.getAttribute('data-' + lang + '-placeholder') || el.placeholder;
    });
    // Mission text re-split if present
    if (typeof splitMission === 'function') splitMission();
    if (hasGSAP) ScrollTrigger.refresh();
  }

  var initial;
  try { initial = localStorage.getItem('sdg-lang'); } catch(e){}
  if (!initial) initial = (navigator.language && navigator.language.toLowerCase().indexOf('es') === 0) ? 'es' : 'en';
  applyLang(initial);
  langButtons.forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.dataset.lang); });
  });

  /* ---------- NAV SCROLLED ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function(){
      if (window.scrollY > 80) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE NAV ---------- */
  var burger = document.getElementById('navBurger');
  var overlay = document.getElementById('navOverlay');
  var navClose = document.getElementById('navClose');
  if (burger && overlay && navClose) {
    var openNav = function(){ overlay.classList.add('open'); burger.setAttribute('aria-expanded','true'); };
    var closeNav = function(){ overlay.classList.remove('open'); burger.setAttribute('aria-expanded','false'); };
    burger.addEventListener('click', openNav);
    navClose.addEventListener('click', closeNav);
    overlay.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeNav(); });
  }

  /* ---------- HERO CANVAS FRAME-SCRUB ---------- */
  var canvas = document.getElementById('hero-canvas');
  var fallback = document.getElementById('hero-fallback');
  if (canvas && fallback) {
    var FRAME_COUNT = 121;
    var framePath = function(i){ return '/assets/frames/frame_' + String(i).padStart(4,'0') + '.jpg'; };

    var probeFrame1 = new Image();
    probeFrame1.onload = function(){
      canvas.style.display = 'block';
      fallback.style.display = 'none';
      var ctx = canvas.getContext('2d');
      var frames = new Array(FRAME_COUNT);
      frames[0] = probeFrame1;

      var resize = function(){
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr,0,0,dpr,0,0);
        draw(state.i);
      };
      var drawImage = function(img){
        var cw = window.innerWidth, ch = window.innerHeight;
        var ir = img.width / img.height, cr = cw / ch;
        var w,h,x,y;
        if (ir > cr){ h = ch; w = ch * ir; x = (cw - w)/2; y = 0; }
        else        { w = cw; h = cw / ir; x = 0; y = (ch - h)/2; }
        ctx.clearRect(0,0,cw,ch);
        ctx.drawImage(img, x, y, w, h);
      };
      var state = { i: 0 };
      var draw = function(i){
        var img = frames[Math.max(0, Math.min(FRAME_COUNT-1, Math.floor(i)))];
        if (img && img.complete) drawImage(img);
      };
      resize();
      window.addEventListener('resize', resize);

      for (var i = 1; i < FRAME_COUNT; i++){
        var img = new Image();
        img.src = framePath(i+1);
        frames[i] = img;
      }

      if (hasGSAP){
        gsap.to(state, {
          i: FRAME_COUNT - 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: function(){ draw(state.i); }
          }
        });
      }
    };
    probeFrame1.onerror = function(){
      canvas.style.display = 'none';
      fallback.style.display = 'block';
    };
    probeFrame1.src = framePath(1);
  }

  /* ---------- HERO CONTENT ENTRANCE ---------- */
  if (hasGSAP && document.getElementById('hero')){
    // immediateRender:false so CSS-default (visible) paints first; if RAF stalls, content stays visible
    gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.2, immediateRender: false });
    gsap.fromTo('.hero-title',   { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.35, immediateRender: false });
    gsap.fromTo('.hero-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.6, immediateRender: false });
    gsap.fromTo('.hero-ctas',    { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.8, immediateRender: false });
    // Scroll fade-out: explicit fromTo + immediateRender:false so the start state isn't
    // force-rendered at setup (which was leaving opacity stuck at 0 in some cases)
    gsap.fromTo('.hero-content',
      { opacity: 1, y: 0 },
      {
        opacity: 0, y: -40, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '60% top', scrub: true }
      }
    );
  }

  /* ---------- HERO-LIGHT (sub-pages) entrance ---------- */
  if (hasGSAP && document.querySelector('.hero-light')){
    gsap.fromTo('.hero-light__eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', delay: 0.2, immediateRender: false });
    gsap.fromTo('.hero-light h1',       { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.3, ease: 'power3.out', delay: 0.3, immediateRender: false });
    gsap.fromTo('.hero-light__sub',     { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.55, immediateRender: false });
  }

  /* ---------- MARQUEE ---------- */
  var marquees = document.querySelectorAll('.marquee__track');
  if (marquees.length){
    var marqueeState = [];
    marquees.forEach(function(tr){
      marqueeState.push({ el: tr, x: 0, dir: +tr.dataset.marqueeDir || 1, base: 30 });
    });
    var lastY = window.scrollY, velocity = 0;
    var tick = function(){
      var y = window.scrollY;
      velocity = velocity * 0.88 + (y - lastY) * 0.12;
      lastY = y;
      marqueeState.forEach(function(m){
        var speed = m.base + Math.min(80, Math.abs(velocity) * 4);
        m.x -= (speed / 60) * m.dir;
        var w = m.el.scrollWidth / 3;
        if (m.x <= -w) m.x += w;
        if (m.x >= 0)  m.x -= w;
        m.el.style.transform = 'translate3d(' + m.x + 'px, 0, 0)';
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- MISSION TEXT MASK ---------- */
  var missionEl = document.getElementById('missionText');
  function splitMission(){
    if (!missionEl) return;
    var lang = document.documentElement.lang;
    var raw = missionEl.getAttribute('data-' + lang) || missionEl.textContent;
    missionEl.innerHTML = raw.split(/(\s+)/).map(function(chunk){
      if (/^\s+$/.test(chunk)) return chunk;
      return '<span class="w">' + chunk + '</span>';
    }).join('');
    if (hasGSAP){
      ScrollTrigger.getAll().forEach(function(t){ if (t.vars && t.vars.id === 'mission') t.kill(); });
      var words = missionEl.querySelectorAll('.w');
      ScrollTrigger.create({
        id: 'mission',
        trigger: '#mission',
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: 0.6,
        onUpdate: function(self){
          var p = self.progress;
          words.forEach(function(w, i){
            var t = i / (words.length - 1);
            if (p >= t) w.classList.add('lit');
            else w.classList.remove('lit','gold');
            if (p >= t && p - t < 0.08) w.classList.add('gold');
            else w.classList.remove('gold');
          });
        }
      });
    }
  }
  window.splitMission = splitMission; // expose for applyLang
  splitMission();

  /* ---------- METHOD STICKY STACK ---------- */
  var steps = document.querySelectorAll('.method__step');
  var stepN = document.getElementById('stepN');
  var stepT = document.getElementById('stepT');
  var rail  = document.querySelector('.method__rail-progress');
  if (steps.length && stepN && stepT && rail) {
    if (hasGSAP){
      steps.forEach(function(s, i){
        ScrollTrigger.create({
          trigger: s,
          start: 'top 70%',
          end: 'bottom 40%',
          onEnter: function(){ setStep(i); },
          onEnterBack: function(){ setStep(i); }
        });
      });
    }
    var setStep = function(i){
      steps.forEach(function(s, j){ s.classList.toggle('active', j === i); });
      stepN.textContent = String(i+1).padStart(2,'0');
      var title = steps[i].querySelector('.method__step-title');
      var lang = document.documentElement.lang;
      stepT.textContent = title.getAttribute('data-' + lang) || title.textContent;
      rail.style.setProperty('--p', (i+1) / steps.length);
    };
    setStep(0);
  }

  /* ---------- NEIGHBORHOOD PARALLAX ZOOM ---------- */
  if (hasGSAP){
    document.querySelectorAll('.nbh__tile').forEach(function(tile){
      var bg = tile.querySelector('.nbh__tile-bg');
      if (!bg) return;
      gsap.to(bg, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: tile, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
    if (document.querySelector('.nbh__grid')){
      gsap.fromTo('.nbh__tile',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: '.nbh__grid', start: 'top 85%' }
        }
      );
    }
  }

  /* ---------- TESTIMONIALS ACCORDION ---------- */
  document.querySelectorAll('.test__item').forEach(function(item){
    var btn = item.querySelector('.test__btn');
    if (!btn) return;
    btn.addEventListener('click', function(){
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open){
        document.querySelectorAll('.test__item').forEach(function(o){
          if (o !== item){
            o.classList.remove('open');
            var ob = o.querySelector('.test__btn');
            if (ob) ob.setAttribute('aria-expanded','false');
          }
        });
      }
    });
  });

  /* ---------- SECTION FADE-INS ---------- */
  if (hasGSAP){
    [
      '#about .about__body > *',
      '.method__intro > *',
      '.nbh__head > *',
      '.test__head > *',
      '.contact__head > *',
      '#newsletter .news__wrap > *',
      '.about__portrait',
      '.teaser__head > *',
      '.teaser__portrait',
      '.teaser__preview-row'
    ].forEach(function(sel){
      if (document.querySelector(sel)){
        gsap.fromTo(sel,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.08,
            immediateRender: false,
            scrollTrigger: { trigger: sel, start: 'top 85%' }
          }
        );
      }
    });
  }

  /* ---------- FORMS ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = e.target.querySelector('button[type="submit"]');
      var lang = document.documentElement.lang;
      btn.textContent = lang === 'es' ? 'Gracias · te respondo pronto' : "Thank you · I'll be in touch";
      btn.disabled = true;
      e.target.querySelectorAll('input, textarea, select').forEach(function(el){ el.disabled = true; });
    });
  }
  var newsForm = document.getElementById('newsForm');
  if (newsForm){
    newsForm.addEventListener('submit', function(e){
      e.preventDefault();
      var form = e.target;
      form.classList.add('done');
      var btn = form.querySelector('button');
      btn.textContent = 'Thank you · Gracias';
      btn.disabled = true;
      form.querySelector('input').disabled = true;
    });
  }

  /* ---------- SMOOTH SCROLL (in-page anchors only) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if (id && id.length > 1){
        var t = document.querySelector(id);
        if (t){ e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
}
