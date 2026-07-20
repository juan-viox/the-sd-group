/* =========================================================
   The SD Group · Shared partials
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
    { href: '/method/',          key: 'method',        en: 'Our Process',     es: 'Nuestro Proceso' },
    { href: '/neighborhoods/',   key: 'neighborhoods', en: 'Neighborhoods',   es: 'Barrios' },
    { href: '/home-search/',     key: 'home-search',   en: 'Home Search',     es: 'Buscar Casa' },
    { href: '/home-evaluation/', key: 'home-eval',     en: 'Home Evaluation', es: 'Evaluación' },
    { href: '/contact/',         key: 'contact',       en: 'Contact',         es: 'Contacto' }
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
      '<a class="nav__brand" href="/" aria-label="The SD Group home">' +
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
            '<img class="foot__logo" src="/assets/logo-full.png" alt="The SD Group · The Sarah Dee Group" width="320" height="213" loading="lazy" />' +
            '<a class="foot__kw" href="https://kw.com/agent/sarah-de-jesus/2000142585" target="_blank" rel="noopener" aria-label="Keller Williams Village Square Realty">' +
              '<svg class="foot__kw-svg" viewBox="0 0 322 138" fill="none" aria-hidden="true">' +
                '<defs><mask id="kwCut">' +
                  '<rect x="2" y="6" width="82" height="82" rx="4" fill="#fff" />' +
                  '<text x="43" y="66" text-anchor="middle" font-family="var(--ff-body), Arial, sans-serif" font-weight="700" font-size="50" fill="#000">kw</text>' +
                '</mask></defs>' +
                '<rect x="2" y="6" width="82" height="82" rx="4" fill="#FFFFFF" mask="url(#kwCut)" />' +
                '<text x="96" y="41" font-family="var(--ff-body), Arial, sans-serif" font-weight="700" font-size="20" letter-spacing="0.2" fill="#FFFFFF">VILLAGE SQUARE</text>' +
                '<text x="96" y="69" font-family="var(--ff-body), Arial, sans-serif" font-weight="700" font-size="20" letter-spacing="0.2" fill="#FFFFFF">REALTY</text>' +
                '<text x="4" y="127" font-family="var(--ff-body), Arial, sans-serif" font-size="24" letter-spacing="0.4" fill="#FFFFFF"><tspan font-weight="700">KELLER</tspan><tspan font-weight="300">WILLIAMS</tspan><tspan font-weight="700">.</tspan></text>' +
              '</svg>' +
            '</a>' +
            '<p class="foot__tag" data-en="Thoughtful guidance for buyers, sellers, and investors across Bergen County. Bilingual by default." data-es="Orientación cuidadosa para compradores, vendedores e inversionistas en todo el Condado de Bergen. Bilingüe por defecto.">Thoughtful guidance for buyers, sellers, and investors across Bergen County. Bilingual by default.</p>' +
            '<div class="foot__badges" role="group" aria-label="Equal Housing Opportunity and REALTOR®">' +
              '<span class="foot__badge">' +
                '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">' +
                  '<path d="M7 22 L24 8 L41 22" />' +
                  '<path d="M11 20 V40 H37 V20" />' +
                  '<rect x="18" y="25" width="12" height="3" fill="currentColor" stroke="none" />' +
                  '<rect x="18" y="31" width="12" height="3" fill="currentColor" stroke="none" />' +
                '</svg>' +
                '<span class="foot__badge-label" data-en="Equal Housing Opportunity" data-es="Igualdad de Oportunidades de Vivienda">Equal Housing Opportunity</span>' +
              '</span>' +
              '<span class="foot__badge">' +
                '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
                  '<rect x="5" y="5" width="38" height="38" stroke="currentColor" stroke-width="2" />' +
                  '<text x="24" y="35" text-anchor="middle" font-family="var(--ff-display), serif" font-weight="600" font-size="30" fill="currentColor">R</text>' +
                '</svg>' +
                '<span class="foot__badge-label">REALTOR&reg;</span>' +
              '</span>' +
            '</div>' +
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
              '<a href="https://www.linkedin.com/in/sarahdejesusrealtor" target="_blank" rel="noopener" aria-label="LinkedIn">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.02h4.45V22H.25V8.02zM8.02 8.02h4.27v1.9h.06c.6-1.13 2.05-2.32 4.22-2.32 4.51 0 5.34 2.97 5.34 6.83V22h-4.45v-6.18c0-1.47-.03-3.37-2.05-3.37-2.06 0-2.37 1.6-2.37 3.26V22H8.02V8.02z"/></svg>' +
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
