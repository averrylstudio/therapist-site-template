/**
 * Therapist site template — Averryl Studio
 * Reads window.SITE from site.config.js and hydrates the page.
 * Also wires unique features: quick exit, breathing, fit checklist,
 * comfort controls, form (FormSubmit), FAQ, mobile nav.
 */
(function () {
  "use strict";

  var SITE = window.SITE || {};

  /* ---------- tiny helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") node.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] === false || attrs[k] == null) { /* skip */ }
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function fullName() {
    var n = SITE.therapistName || "";
    var c = SITE.credentials || "";
    return c ? n + ", " + c : n;
  }
  function siteUrl() {
    return (SITE.siteUrl || "").replace(/\/$/, "");
  }
  function pageFile() {
    var p = (location.pathname.split("/").pop() || "index.html");
    if (!p || p === "/") return "index.html";
    return p;
  }
  function isHome() {
    var p = pageFile();
    return p === "index.html" || p === "" || p === "index";
  }

  /* ---------- theme colours from config ---------- */
  function applyTheme() {
    var c = SITE.colors || {};
    var map = {
      cream: "--cream",
      creamDark: "--cream-dark",
      paper: "--paper",
      sage: "--sage",
      sageMid: "--sage-mid",
      sageSoft: "--sage-soft",
      sageMist: "--sage-mist",
      ink: "--ink",
      inkSoft: "--ink-soft",
      gold: "--gold",
      terracotta: "--terracotta"
    };
    Object.keys(map).forEach(function (k) {
      if (c[k]) document.documentElement.style.setProperty(map[k], c[k]);
    });
  }

  /* ---------- brand / logo ---------- */
  function brandInner(forFooter) {
    var wrap = document.createDocumentFragment();
    if (SITE.logo) {
      wrap.appendChild(el("img", {
        class: "brand-logo",
        src: SITE.logo,
        alt: SITE.logoAlt || (SITE.practiceName + " logo")
      }));
    } else {
      if (SITE.showMark !== false) {
        var mark = el("span", { class: "brand-mark", "aria-hidden": "true" });
        mark.innerHTML = '<img src="' + esc(SITE.markSrc || "images/mark.svg") + '" alt="">';
        wrap.appendChild(mark);
      }
      var text = el("span", { class: "brand-text" }, [
        el("span", { class: "brand-name", text: SITE.practiceName || "" }),
        el("span", { class: "brand-sub", text: (SITE.location && SITE.location.city) ? SITE.location.city : "" })
      ]);
      wrap.appendChild(text);
    }
    return wrap;
  }

  /* ---------- header / nav / footer ---------- */
  function navItems() {
    return [
      { href: "index.html", label: "Home", file: "index.html" },
      { href: "about.html", label: "About", file: "about.html" },
      { href: "services.html", label: "Services", file: "services.html" },
      { href: "fees.html", label: "Fees & FAQ", file: "fees.html" },
      { href: "contact.html", label: "Request a session", file: "contact.html", cta: true }
    ];
  }

  function renderHeader() {
    var host = $("#site-header");
    if (!host) return;
    host.innerHTML = "";
    var current = pageFile();
    var brand = el("a", { class: "brand", href: "index.html" });
    brand.appendChild(brandInner());
    brand.setAttribute("aria-label", SITE.practiceName || "Home");

    var toggle = el("button", {
      class: "nav-toggle",
      type: "button",
      id: "nav-toggle",
      "aria-expanded": "false",
      "aria-controls": "site-nav",
      "aria-label": "Open menu"
    });
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>';

    var nav = el("nav", { class: "nav", id: "site-nav", "aria-label": "Primary" });
    navItems().forEach(function (item) {
      var a = el("a", { href: item.href, text: item.label });
      if (item.cta) a.className = "btn btn-primary nav-cta";
      if (item.file === current || (item.file === "index.html" && isHome())) {
        a.setAttribute("aria-current", "page");
      }
      nav.appendChild(a);
    });

    var inner = el("div", { class: "header-inner" });
    inner.appendChild(brand);
    inner.appendChild(toggle);
    inner.appendChild(nav);
    host.appendChild(inner);

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.innerHTML = open
        ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>';
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.focus();
      }
    });
    window.addEventListener("scroll", function () {
      host.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  function renderFooter() {
    var host = $("#site-footer");
    if (!host) return;
    host.innerHTML = "";
    var loc = SITE.location || {};
    var tel = SITE.telehealth || {};
    var contact = SITE.contact || {};
    var credit = SITE.footerCredit || {};

    var brand = el("a", { class: "footer-brand", href: "index.html" });
    brand.appendChild(brandInner(true));

    var navHtml = navItems().map(function (i) {
      return "<li><a href=\"" + esc(i.href) + "\">" + esc(i.label) + "</a></li>";
    }).join("");

    var social = SITE.social || {};
    var socialLinks = [];
    if (social.instagram) socialLinks.push('<li><a href="' + esc(social.instagram) + '" rel="noopener noreferrer">Instagram</a></li>');
    if (social.psychologyToday) socialLinks.push('<li><a href="' + esc(social.psychologyToday) + '" rel="noopener noreferrer">Psychology Today</a></li>');
    if (social.linkedin) socialLinks.push('<li><a href="' + esc(social.linkedin) + '" rel="noopener noreferrer">LinkedIn</a></li>');
    if (social.facebook) socialLinks.push('<li><a href="' + esc(social.facebook) + '" rel="noopener noreferrer">Facebook</a></li>');

    var addr = "";
    if (loc.showAddress) {
      addr = "<p>" + esc(loc.address || "") + "<br>" + esc(loc.postalCode || "") + "</p>";
    }
    var states = (tel.states || []).join(" and ");

    host.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-crisis" role="note">' + esc(SITE.crisisText || "") + "</div>" +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            brand.outerHTML +
            "<p>" + esc(SITE.shortDescription || "") + "</p>" +
            addr +
          "</div>" +
          '<div class="footer-col"><h3>Explore</h3><ul>' + navHtml + "</ul></div>" +
          '<div class="footer-col"><h3>Visit</h3>' +
            "<p>" + esc(fullName()) + (SITE.pronouns ? " · " + esc(SITE.pronouns) : "") + "</p>" +
            (contact.email ? "<p><a href=\"mailto:" + esc(contact.email) + "\">" + esc(contact.email) + "</a></p>" : "") +
            (contact.phone ? "<p><a href=\"tel:" + esc(contact.phone.replace(/[^\d+]/g, "")) + "\">" + esc(contact.phone) + "</a></p>" : "") +
            (contact.hours ? "<p>" + esc(contact.hours) + "</p>" : "") +
            (tel.available && states ? "<p>Telehealth in " + esc(states) + "</p>" : "") +
            (socialLinks.length ? "<ul>" + socialLinks.join("") + "</ul>" : "") +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<p>© " + new Date().getFullYear() + " " + esc(SITE.practiceName || "") + ". All rights reserved.</p>" +
          (credit.show !== false
            ? '<p class="averryl-credit"><a href="' + esc(credit.url || "https://averryl.com") + '" rel="noopener noreferrer">' +
              esc(credit.text || "Site by Averryl Studio") + "</a></p>"
            : "") +
        "</div>" +
      "</div>";
    // re-attach brand inner because outerHTML lost the image child correctly? It's fine, outerHTML includes it.
    // Actually we used brand.outerHTML after appending children, so it's OK.
  }

  /* ---------- Quick exit ---------- */
  function setupQuickExit() {
    var qe = SITE.quickExit || {};
    if (qe.enabled === false) {
      var existing = $("#quick-exit");
      if (existing) existing.remove();
      return;
    }
    var url = qe.url || "https://www.weather.com";
    var btn = $("#quick-exit");
    if (!btn) {
      btn = el("a", {
        id: "quick-exit",
        class: "quick-exit",
        href: url,
        rel: "noopener noreferrer"
      });
      document.body.appendChild(btn);
    }
    btn.href = url;
    btn.className = "quick-exit";
    btn.setAttribute("title", qe.hint || "Leave this site immediately");
    btn.setAttribute("aria-label", (qe.label || "Quick exit") + ". " + (qe.hint || "Leaves this site immediately. Press Escape three times to do the same."));
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M21 3l-9 9M10 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke-linecap="round" stroke-linejoin="round"/></svg> ' +
      esc(qe.label || "Quick exit");

    function exitNow(e) {
      if (e) e.preventDefault();
      try { document.documentElement.innerHTML = ""; } catch (err) { /* ignore */ }
      window.location.replace(url);
    }
    btn.addEventListener("click", exitNow);
    // Keyboard: Esc three times within 2 seconds
    var presses = [];
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var now = Date.now();
      presses = presses.filter(function (t) { return now - t < 2000; });
      presses.push(now);
      if (presses.length >= 3) {
        presses = [];
        exitNow();
      }
    });
    // Expose for tests
    window.__quickExit = exitNow;
  }

  /* ---------- Comfort controls ---------- */
  function setupComfort() {
    var KEY = "therapist-site-comfort";
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }

    var bar = el("div", { class: "comfort", role: "group", "aria-label": "Comfort controls" });
    var textBtn = el("button", {
      type: "button",
      id: "toggle-text",
      "aria-pressed": "false",
      title: "Larger text",
      "aria-label": "Larger text"
    });
    textBtn.innerHTML = '<span aria-hidden="true">A+</span>';
    var motionBtn = el("button", {
      type: "button",
      id: "toggle-motion",
      "aria-pressed": "false",
      title: "Reduce motion",
      "aria-label": "Reduce motion"
    });
    motionBtn.innerHTML = '<span aria-hidden="true" class="comfort-label">calm</span>';

    function apply() {
      document.documentElement.classList.toggle("text-lg", !!saved.largeText);
      document.documentElement.classList.toggle("reduce-motion", !!saved.reduceMotion);
      textBtn.setAttribute("aria-pressed", saved.largeText ? "true" : "false");
      motionBtn.setAttribute("aria-pressed", saved.reduceMotion ? "true" : "false");
    }
    function persist() {
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* ignore */ }
      apply();
    }
    textBtn.addEventListener("click", function () { saved.largeText = !saved.largeText; persist(); });
    motionBtn.addEventListener("click", function () { saved.reduceMotion = !saved.reduceMotion; persist(); });
    bar.appendChild(textBtn);
    bar.appendChild(motionBtn);
    document.body.appendChild(bar);

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches && saved.reduceMotion == null) {
      saved.reduceMotion = true;
    }
    apply();
  }

  /* ---------- Breathing widget (4-4-6) ---------- */
  function setupBreathing() {
    var widget = document.getElementById("breathe-widget");
    if (!widget) return;
    var circle = document.getElementById("breathe-circle");
    var phaseEl = document.getElementById("breathe-phase");
    var running = false;
    var timer = null;

    // 4s in, 4s hold, 6s out = 14s cycle
    var phases = [
      { name: "in", label: "Breathe in", ms: 4000 },
      { name: "hold", label: "Hold", ms: 4000 },
      { name: "out", label: "Breathe out", ms: 6000 }
    ];

    function btn() { return document.getElementById("breathe-toggle"); }

    function clearPhase() {
      if (!circle) return;
      circle.classList.remove("is-in", "is-hold", "is-out");
    }
    function setPhase(p) {
      clearPhase();
      if (circle) circle.classList.add("is-" + p.name);
      if (phaseEl) phaseEl.textContent = p.label;
    }
    function stop() {
      running = false;
      if (timer) { clearTimeout(timer); timer = null; }
      clearPhase();
      if (phaseEl) phaseEl.textContent = "Ready when you are";
      var b = btn();
      if (b) { b.textContent = "Begin"; b.setAttribute("aria-pressed", "false"); }
    }
    function run(i) {
      if (!running) return;
      var p = phases[i % 3];
      setPhase(p);
      timer = setTimeout(function () { run(i + 1); }, p.ms);
    }
    function start() {
      running = true;
      var b = btn();
      if (b) { b.textContent = "Pause"; b.setAttribute("aria-pressed", "true"); }
      if (phaseEl) phaseEl.textContent = phases[0].label;
      clearPhase();
      requestAnimationFrame(function () { run(0); });
    }
    widget.addEventListener("click", function (e) {
      var t = e.target.closest("#breathe-toggle");
      if (!t) return;
      e.preventDefault();
      if (running) stop(); else start();
    });
    if (phaseEl && !phaseEl.textContent) phaseEl.textContent = "Ready when you are";
    window.__breathe = { start: start, stop: stop, isRunning: function () { return running; } };
  }

  /* ---------- Fit checklist ---------- */
  function setupFit() {
    var list = $("#fit-list");
    if (!list) return;
    var questions = SITE.fitQuestions || [];
    list.innerHTML = "";
    questions.forEach(function (q, i) {
      var id = "fit-q-" + i;
      var item = el("label", { class: "fit-item", for: id });
      var input = el("input", { type: "checkbox", id: id, name: "fit" });
      item.appendChild(input);
      item.appendChild(el("span", { text: q }));
      list.appendChild(item);
      input.addEventListener("change", update);
    });
    var result = $("#fit-result");
    var resultText = $("#fit-result-text");
    function update() {
      var n = $all("#fit-list input:checked").length;
      if (!result || !resultText) return;
      result.hidden = false;
      var text = SITE.fitCtaEmpty || "";
      if (n >= 3) text = SITE.fitCta || text;
      else if (n >= 1) text = SITE.fitCtaSoft || text;
      resultText.textContent = text;
    }
    update();
  }

  /* ---------- Form (FormSubmit) ---------- */
  function setupForm() {
    var form = $("#session-form");
    if (!form) return;
    var contact = SITE.contact || {};
    var formCfg = SITE.form || {};
    var email = contact.inquiryEmail || contact.email || "hello@example.com";
    form.setAttribute("action", "https://formsubmit.co/" + encodeURIComponent(email));
    form.setAttribute("method", "POST");
    form.setAttribute("novalidate", "false");

    function setHidden(name, value) {
      var input = form.querySelector('[name="' + name + '"]');
      if (!input) {
        input = el("input", { type: "hidden", name: name });
        form.appendChild(input);
      }
      input.setAttribute("type", "hidden");
      input.value = value;
    }
    var next = siteUrl() + "/" + (formCfg.thankYouPath || "thank-you.html");
    setHidden("_next", next);
    setHidden("_subject", formCfg.subject || ("New session request — " + (SITE.practiceName || "")));
    setHidden("_template", "table");
    setHidden("_captcha", "false");
    if (formCfg.autoresponse) setHidden("_autoresponse", formCfg.autoresponse);

    // Honeypot: _honey, visually hidden, not display:none (FormSubmit docs)
    if (!form.querySelector('[name="_honey"]')) {
      var honey = el("input", {
        type: "text",
        name: "_honey",
        class: "honeypot",
        tabindex: "-1",
        autocomplete: "off",
        "aria-hidden": "true"
      });
      form.insertBefore(honey, form.firstChild);
    }

    // Consent label from config
    var consentLabel = $("#consent-text");
    if (consentLabel && formCfg.consentText) consentLabel.textContent = formCfg.consentText;

    var emergency = $("#emergency-note");
    if (emergency && SITE.emergencyFormNote) emergency.textContent = SITE.emergencyFormNote;

    var submit = form.querySelector('[type="submit"]');
    if (submit && formCfg.submitLabel) submit.textContent = formCfg.submitLabel;
  }

  /* ---------- Lists rendered from config ---------- */
  function renderSpecialties() {
    var host = $("#specialty-list");
    if (!host || !SITE.specialties) return;
    host.innerHTML = SITE.specialties.map(function (s, i) {
      return '<article class="card">' +
        '<span class="card-num">' + String(i + 1).padStart(2, "0") + "</span>" +
        "<h3>" + esc(s.name) + "</h3>" +
        "<p>" + esc(s.description) + "</p>" +
        "</article>";
    }).join("");
  }
  function renderServices() {
    var host = $("#service-list");
    if (!host || !SITE.services) return;
    host.innerHTML = SITE.services.map(function (s) {
      return '<article class="card">' +
        (s.duration ? '<span class="service-duration">' + esc(s.duration) + "</span>" : "") +
        "<h3>" + esc(s.name) + "</h3>" +
        "<p>" + esc(s.description) + "</p>" +
        "</article>";
    }).join("");
  }
  function renderValues() {
    var host = $("#value-list");
    if (!host || !SITE.values) return;
    host.innerHTML = SITE.values.map(function (v) {
      return '<article class="value-item"><h3>' + esc(v.title) + "</h3><p>" + esc(v.text) + "</p></article>";
    }).join("");
  }
  function renderTimeline() {
    var host = $("#timeline-list");
    if (!host || !SITE.firstSession) return;
    host.innerHTML = SITE.firstSession.map(function (s, i) {
      return '<li class="timeline-item">' +
        '<span class="timeline-num" aria-hidden="true">' + (i + 1) + "</span>" +
        "<div><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>" +
        "</li>";
    }).join("");
  }
  function renderFees() {
    var host = $("#fee-rows");
    var fees = SITE.fees || {};
    if (host && fees.items) {
      host.innerHTML = fees.items.map(function (it) {
        return "<tr><th>" + esc(it.name) +
          (it.note ? '<span class="fee-note">' + esc(it.note) + "</span>" : "") +
          '</th><td><span class="fee-price">' + esc(it.price) + "</span></td></tr>";
      }).join("");
    }
    var map = {
      "#fees-intro": fees.intro,
      "#fees-insurance-title": fees.insuranceTitle,
      "#fees-insurance": fees.insurance,
      "#fees-sliding-title": fees.slidingScaleTitle,
      "#fees-sliding": fees.slidingScale,
      "#fees-cancel-title": fees.cancellationTitle,
      "#fees-cancel": fees.cancellation,
      "#fees-payment": fees.paymentNote
    };
    Object.keys(map).forEach(function (sel) {
      var n = $(sel);
      if (n && map[sel]) n.textContent = map[sel];
    });
  }
  function renderFaq() {
    var host = $("#faq-list");
    if (!host || !SITE.faq) return;
    host.innerHTML = SITE.faq.map(function (item, i) {
      return '<details class="faq-item"' + (i === 0 ? " open" : "") + ">" +
        "<summary>" + esc(item.q) + "</summary>" +
        '<div class="faq-a"><p>' + esc(item.a) + "</p></div>" +
        "</details>";
    }).join("");
  }
  function renderTraining() {
    var host = $("#training-list");
    if (!host || !SITE.training) return;
    host.innerHTML = SITE.training.map(function (t) {
      return "<li>" + esc(t) + "</li>";
    }).join("");
  }
  function renderBio() {
    var host = $("#bio-long");
    if (!host || !SITE.bioLong) return;
    host.innerHTML = SITE.bioLong.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }
  function renderTestimonials() {
    var section = $("#testimonials");
    var t = SITE.testimonials || {};
    if (!section) return;
    if (t.show === false) { section.classList.add("is-hidden"); return; }
    var grid = $("#quote-grid", section);
    if (grid && t.items) {
      grid.innerHTML = t.items.map(function (item) {
        return "<blockquote class=\"quote\"><p>“" + esc(item.quote) + "”</p>" +
          "<footer>— " + esc(item.attribution || "Placeholder") + "</footer></blockquote>";
      }).join("");
    }
    var ethics = $("#ethics-note", section);
    if (ethics && t.ethicsNote) ethics.textContent = t.ethicsNote;
    var heading = $("[data-bind='testimonials.heading']", section);
    if (heading && t.heading) heading.textContent = t.heading;
  }
  function renderBadges() {
    var host = $("#badge-row");
    if (!host) return;
    var loc = SITE.location || {};
    var tel = SITE.telehealth || {};
    var items = [];
    if (loc.city) items.push({ label: "In person in " + loc.city + (loc.state ? ", " + loc.state : ""), icon: "pin" });
    if (tel.available && tel.states && tel.states.length) {
      items.push({ label: "Telehealth in " + tel.states.join(" & "), icon: "video" });
    }
    (SITE.sessionFormats || []).forEach(function (f) {
      // already covered; skip duplicates
    });
    if (SITE.acceptingClients) items.push({ label: SITE.acceptingLabel || "Accepting new clients", icon: "check" });
    else if (SITE.waitlistLabel) items.push({ label: SITE.waitlistLabel, icon: "check" });
    if (SITE.contact && SITE.contact.hours) items.push({ label: SITE.contact.hours, icon: "clock" });

    var icons = {
      pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>',
      video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="12" height="12" rx="2"/><path d="M15 10.5l6-3v9l-6-3v-3z"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2" stroke-linecap="round"/></svg>'
    };
    host.innerHTML = items.map(function (it) {
      return '<span class="badge">' + (icons[it.icon] || "") + esc(it.label) + "</span>";
    }).join("");
  }
  function renderResource() {
    var section = $("#resource");
    if (!section) return;
    var r = SITE.resource || {};
    if (!r.enabled) { section.classList.add("is-hidden"); return; }
    var link = $("#resource-link", section);
    if (link && r.file) {
      link.href = r.file;
      if (r.label) link.textContent = r.label;
    }
  }
  function renderContactAside() {
    var host = $("#contact-aside");
    if (!host) return;
    var c = SITE.contact || {};
    var loc = SITE.location || {};
    var tel = SITE.telehealth || {};
    var html = "<h2>Visit</h2><dl>";
    html += "<dt>Therapist</dt><dd>" + esc(fullName()) +
      (SITE.pronouns ? " (" + esc(SITE.pronouns) + ")" : "") + "</dd>";
    if (c.email) html += "<dt>Email</dt><dd><a href=\"mailto:" + esc(c.email) + "\">" + esc(c.email) + "</a></dd>";
    if (c.phone) html += "<dt>Phone</dt><dd><a href=\"tel:" + esc(c.phone.replace(/[^\d+]/g, "")) + "\">" + esc(c.phone) + "</a>" +
      (c.phoneNote ? "<br><span class='muted'>" + esc(c.phoneNote) + "</span>" : "") + "</dd>";
    if (c.hours) html += "<dt>Hours</dt><dd>" + esc(c.hours) + "</dd>";
    if (c.responseTime) html += "<dt>Replies</dt><dd>" + esc(c.responseTime) + "</dd>";
    if (loc.showAddress) html += "<dt>Office</dt><dd>" + esc(loc.address || "") + "<br>" + esc(loc.postalCode || "") +
      (loc.addressNote ? "<br><span class='muted'>" + esc(loc.addressNote) + "</span>" : "") + "</dd>";
    if (tel.available) html += "<dt>Telehealth</dt><dd>" + esc(tel.note || ("Available in " + (tel.states || []).join(", "))) + "</dd>";
    html += "</dl>";
    host.innerHTML = html;
  }
  function renderAccepting() {
    $all("[data-accepting]").forEach(function (n) {
      if (SITE.acceptingClients) {
        n.textContent = SITE.acceptingLabel || "Accepting new clients";
        n.classList.remove("is-hidden");
      } else if (SITE.waitlistLabel) {
        n.textContent = SITE.waitlistLabel;
        n.classList.remove("is-hidden");
      } else {
        n.classList.add("is-hidden");
      }
    });
  }

  /* ---------- data-bind text / attributes / images ---------- */
  function getPath(obj, path) {
    return path.split(".").reduce(function (acc, k) {
      return acc == null ? acc : acc[k];
    }, obj);
  }
  function bind() {
    $all("[data-bind]").forEach(function (n) {
      var v = getPath(SITE, n.getAttribute("data-bind"));
      if (v == null || v === "") return;
      if (typeof v === "string" || typeof v === "number") n.textContent = v;
    });
    $all("[data-bind-html]").forEach(function (n) {
      var v = getPath(SITE, n.getAttribute("data-bind-html"));
      if (typeof v === "string") n.innerHTML = esc(v);
    });
    $all("[data-bind-attr]").forEach(function (n) {
      // format: data-bind-attr="href:contact.email|mailto"
      var spec = n.getAttribute("data-bind-attr");
      spec.split(";").forEach(function (part) {
        var bits = part.split(":");
        var attr = bits[0];
        var rest = (bits[1] || "").split("|");
        var path = rest[0];
        var filter = rest[1];
        var v = getPath(SITE, path);
        if (v == null) return;
        if (filter === "mailto") v = "mailto:" + v;
        if (filter === "tel") v = "tel:" + String(v).replace(/[^\d+]/g, "");
        n.setAttribute(attr, v);
      });
    });
    $all("[data-photo]").forEach(function (n) {
      var key = n.getAttribute("data-photo");
      var photo = (SITE.photos || {})[key];
      if (!photo) return;
      if (n.tagName === "IMG") {
        n.src = photo.src;
        n.alt = photo.alt || "";
      } else {
        var img = $("img", n);
        if (img) { img.src = photo.src; img.alt = photo.alt || ""; }
        var cap = $("figcaption, .photo-caption", n);
        if (cap && photo.caption) cap.textContent = photo.caption;
      }
    });
    var fn = $all("[data-fullname]");
    fn.forEach(function (n) { n.textContent = fullName(); });
  }

  /* ---------- SEO: title, meta, JSON-LD (for completeness; static tags also in HTML) ---------- */
  function applySeo() {
    var titleDefault = (SITE.tagline ? SITE.tagline + " · " : "") + (SITE.practiceName || "");
    var pageTitles = {
      "index.html": titleDefault,
      "about.html": "About " + (SITE.therapistName || "") + " · " + (SITE.practiceName || ""),
      "services.html": "Services & specialties · " + (SITE.practiceName || ""),
      "fees.html": "Fees & FAQ · " + (SITE.practiceName || ""),
      "contact.html": "Request a session · " + (SITE.practiceName || ""),
      "thank-you.html": "Thank you · " + (SITE.practiceName || "")
    };
    var file = pageFile();
    if (pageTitles[file]) document.title = pageTitles[file];

    function setMeta(sel, attr, value) {
      var n = $(sel);
      if (n && value) n.setAttribute(attr, value);
    }
    setMeta('meta[name="description"]', "content", SITE.shortDescription);
    setMeta('meta[property="og:title"]', "content", document.title);
    setMeta('meta[property="og:description"]', "content", SITE.shortDescription);
    setMeta('meta[property="og:url"]', "content", siteUrl() + "/" + (file === "index.html" ? "" : file));
    if ((SITE.photos || {}).hero) {
      setMeta('meta[property="og:image"]', "content", siteUrl() + "/" + SITE.photos.hero.src);
    }
    var linkCanon = $('link[rel="canonical"]');
    if (linkCanon) linkCanon.setAttribute("href", siteUrl() + "/" + (file === "index.html" ? "" : file));
    if (SITE.favicon) {
      var fav = $('link[rel="icon"]');
      if (fav) fav.setAttribute("href", SITE.favicon);
    }

    var existing = $("#jsonld");
    var loc = SITE.location || {};
    var contact = SITE.contact || {};
    var tel = SITE.telehealth || {};
    var data = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": SITE.practiceName,
      "description": SITE.shortDescription,
      "url": siteUrl() + "/",
      "image": (SITE.photos && SITE.photos.hero) ? siteUrl() + "/" + SITE.photos.hero.src : undefined,
      "telephone": contact.phone,
      "email": contact.email,
      "priceRange": "$$",
      "areaServed": (tel.states || []).map(function (s) { return { "@type": "State", "name": s }; }),
      "address": loc.showAddress ? {
        "@type": "PostalAddress",
        "streetAddress": loc.address,
        "addressLocality": loc.city,
        "addressRegion": loc.state,
        "postalCode": (loc.postalCode || "").replace(/[^0-9]/g, "") || undefined,
        "addressCountry": "US"
      } : undefined,
      "provider": {
        "@type": "Person",
        "name": SITE.therapistName,
        "jobTitle": SITE.professionalTitle || SITE.credentials,
        "description": SITE.bioShort
      }
    };
    var script = existing || el("script", { type: "application/ld+json", id: "jsonld" });
    script.textContent = JSON.stringify(data);
    if (!existing) document.head.appendChild(script);
  }

  /* ---------- boot ---------- */
  function boot() {
    applyTheme();
    setupQuickExit();
    setupComfort();
    renderHeader();
    renderFooter();
    bind();
    renderAccepting();
    renderBadges();
    renderSpecialties();
    renderServices();
    renderValues();
    renderTimeline();
    renderFees();
    renderFaq();
    renderTraining();
    renderBio();
    renderTestimonials();
    renderResource();
    renderContactAside();
    setupBreathing();
    setupFit();
    setupForm();
    applySeo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
