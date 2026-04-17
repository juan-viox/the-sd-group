/* =========================================================
   The SD Group — Shared partials
   Injects lang toggle, nav, footer, and voice widget into
   [data-partial="..."] placeholders on every page.
   Must run BEFORE site.js (site.js queries these elements).
   ========================================================= */
(function(){
  'use strict';

  // ---- helper: where are we? ----
  var path = location.pathname.replace(/\/index\.html$/, '/');
  if (!path.endsWith('/')) path = path + '/';

  var NAV_LINKS = [
    { href: '/',               key: 'home',          en: 'Home',          es: 'Inicio' },
    { href: '/about/',         key: 'about',         en: 'About',         es: 'Sobre mí' },
    { href: '/method/',        key: 'method',        en: 'Method',        es: 'Método' },
    { href: '/neighborhoods/', key: 'neighborhoods', en: 'Neighborhoods', es: 'Barrios' },
    { href: '/contact/',       key: 'contact',       en: 'Contact',       es: 'Contacto' }
  ];

  function isCurrent(href){
    // Exact match for home; prefix match for subpages
    if (href === '/') return path === '/';
    return path.indexOf(href) === 0;
  }

  // ---- LANG TOGGLE ----
  var langHTML =
    '<div class="lang" role="group" aria-label="Language selector">' +
      '<button type="button" data-lang="en" aria-pressed="true">EN</button>' +
      '<button type="button" data-lang="es" aria-pressed="false">ES</button>' +
    '</div>';

  // ---- NAV ----
  var navLinksHTML = NAV_LINKS.map(function(l){
    var cur = isCurrent(l.href) ? ' aria-current="page"' : '';
    return '<li><a href="' + l.href + '"' + cur +
      ' data-en="' + l.en + '" data-es="' + l.es + '">' + l.en + '</a></li>';
  }).join('');

  var overlayLinksHTML = NAV_LINKS.map(function(l){
    return '<li><a href="' + l.href + '"' +
      ' data-en="' + l.en + '" data-es="' + l.es + '">' + l.en + '</a></li>';
  }).join('');

  var navHTML =
    '<nav class="nav" aria-label="Primary">' +
      '<a class="nav__brand" href="/" aria-label="The SD Group — home">' +
        '<img class="nav__brand-logo" src="/assets/logo-mark-white.png" alt="The SD Group" />' +
      '</a>' +
      '<ul class="nav__links" role="list">' + navLinksHTML + '</ul>' +
      '<button class="nav__burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="navOverlay">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>' +
    '<div class="nav-overlay" id="navOverlay" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<button class="nav-overlay__close" aria-label="Close menu" id="navClose">' +
        '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M2 2L20 20M20 2L2 20" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>' +
      '</button>' +
      '<ul>' + overlayLinksHTML + '</ul>' +
    '</div>';

  // ---- FOOTER ----
  var footerHTML =
    '<footer aria-label="Footer">' +
      '<div class="foot__wrap">' +
        '<div class="foot__top">' +
          '<div class="foot__brand">' +
            '<img class="foot__logo" src="/assets/logo-full.png" alt="The SD Group — The Sarah Dee Group" width="320" height="213" loading="lazy" />' +
            '<p class="foot__tag" data-en="Real estate with strategy, service, and results — bilingual by default, from Ridgewood to the rest of Bergen." data-es="Bienes raíces con estrategia, servicio y resultados — bilingüe por defecto, desde Ridgewood al resto de Bergen.">Real estate with strategy, service, and results — bilingual by default, from Ridgewood to the rest of Bergen.</p>' +
          '</div>' +
          '<div class="foot__col">' +
            '<h4 data-en="Explore" data-es="Explora">EXPLORE</h4>' +
            '<ul>' +
              '<li><a href="/about/" data-en="About Sarah" data-es="Sobre Sarah">About Sarah</a></li>' +
              '<li><a href="/method/" data-en="The SD Method" data-es="El Método SD">The SD Method</a></li>' +
              '<li><a href="/neighborhoods/" data-en="Neighborhoods" data-es="Barrios">Neighborhoods</a></li>' +
              '<li><a href="/contact/" data-en="Contact" data-es="Contacto">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="foot__col">' +
            '<h4 data-en="Contact" data-es="Contacto">CONTACT</h4>' +
            '<ul>' +
              '<li><a href="tel:+12013145696">(201) 314-5696</a></li>' +
              '<li><a href="mailto:sdejesus@kw.com">sdejesus@kw.com</a></li>' +
              '<li>74 Godwin Ave, Ridgewood NJ 07450</li>' +
            '</ul>' +
            '<div class="foot__socials" style="margin-top:22px">' +
              '<a href="https://www.instagram.com/thesdgroup/" target="_blank" rel="noopener" aria-label="Instagram">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>' +
              '</a>' +
              '<a href="https://kw.com/agent/sarah-de-jesus/2000142585" target="_blank" rel="noopener" aria-label="Keller Williams profile">' +
                '<span style="font-family:var(--ff-display);font-weight:500;font-size:14px">kw</span>' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="foot__bottom">' +
          '<div>' +
            '<p>© 2026 The SD Group · <span data-en="A Keller Williams Village Square Realty brand." data-es="Una marca de Keller Williams Village Square Realty.">A Keller Williams Village Square Realty brand.</span></p>' +
            '<p style="margin-top:6px">NJ REALTOR® #2669265 · <span data-en="Each Keller Williams® office is independently owned and operated." data-es="Cada oficina de Keller Williams® es de propiedad y operación independiente.">Each Keller Williams® office is independently owned and operated.</span></p>' +
          '</div>' +
          '<div class="eho" aria-label="Equal Housing Opportunity">' +
            '<span class="eho__mark" aria-hidden="true"></span>' +
            '<span data-en="Equal Housing Opportunity" data-es="Igualdad de Oportunidades de Vivienda">Equal Housing Opportunity</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  // ---- VOICE WIDGET ----
  var voiceHTML =
    '<elevenlabs-convai agent-id="agent_1201kpe46cqff3fr1bnaa6m59244"></elevenlabs-convai>';

  function inject(selector, html){
    var el = document.querySelector('[data-partial="' + selector + '"]');
    if (el) el.innerHTML = html;
  }

  inject('lang-toggle', langHTML);
  inject('nav', navHTML);
  inject('footer', footerHTML);
  inject('voice-widget', voiceHTML);

  // Load the ElevenLabs widget script once
  if (document.querySelector('[data-partial="voice-widget"]') &&
      !document.getElementById('eleven-convai-script')) {
    var s = document.createElement('script');
    s.id = 'eleven-convai-script';
    s.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    s.async = true;
    s.type = 'text/javascript';
    document.body.appendChild(s);
  }
})();
