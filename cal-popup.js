/**
 * 0aftermath — Cal.com Strategy Call Popup
 * ─────────────────────────────────────────
 * - Appears after 60 seconds of page stay (silent timer, no UI countdown)
 * - Slides in from the bottom-left corner
 * - Uses Cal.com's official embed (data-cal-link) — no loading bug
 * - Remembers if the user closed it (sessionStorage) so it won't re-appear
 * - Zero impact on existing page styles or structure
 */
(function () {
    'use strict';

    // ── Guard: don't show again if already dismissed this session ──────────
    if (sessionStorage.getItem('cal_popup_dismissed') === '1') return;

    // ── Inject Styles ──────────────────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent = [
        '#oa-cal-popup {',
        '  position: fixed;',
        '  bottom: 1.75rem;',
        '  left: 1.75rem;',
        '  z-index: 99999;',
        '  width: 300px;',
        '  max-width: calc(100vw - 3.5rem);',
        '  transform: translateY(calc(100% + 2rem));',
        '  opacity: 0;',
        '  transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease;',
        '  pointer-events: none;',
        '  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;',
        '}',
        '#oa-cal-popup.oa-visible {',
        '  transform: translateY(0);',
        '  opacity: 1;',
        '  pointer-events: auto;',
        '}',
        '#oa-cal-popup .oa-card {',
        '  background: #ffffff;',
        '  border-radius: 1.25rem;',
        '  padding: 1.375rem 1.375rem 1.25rem;',
        '  box-shadow: 0 20px 40px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);',
        '  position: relative;',
        '}',
        '#oa-cal-popup .oa-close {',
        '  position: absolute;',
        '  top: 0.625rem;',
        '  right: 0.625rem;',
        '  width: 1.75rem;',
        '  height: 1.75rem;',
        '  border-radius: 50%;',
        '  border: none;',
        '  background: #F3F4F6;',
        '  color: #6B7280;',
        '  cursor: pointer;',
        '  display: flex;',
        '  align-items: center;',
        '  justify-content: center;',
        '  font-size: 1rem;',
        '  line-height: 1;',
        '  transition: background 0.2s, color 0.2s;',
        '  padding: 0;',
        '}',
        '#oa-cal-popup .oa-close:hover {',
        '  background: #E5E7EB;',
        '  color: #111827;',
        '}',
        '#oa-cal-popup .oa-header {',
        '  display: flex;',
        '  align-items: center;',
        '  gap: 0.75rem;',
        '  margin-bottom: 0.75rem;',
        '}',
        '#oa-cal-popup .oa-avatar {',
        '  width: 2.75rem;',
        '  height: 2.75rem;',
        '  border-radius: 0.75rem;',
        '  background: linear-gradient(135deg, #4F46E5, #06B6D4);',
        '  display: flex;',
        '  align-items: center;',
        '  justify-content: center;',
        '  color: #fff;',
        '  font-weight: 700;',
        '  font-size: 0.875rem;',
        '  flex-shrink: 0;',
        '  letter-spacing: 0.02em;',
        '}',
        '#oa-cal-popup .oa-title {',
        '  margin: 0 0 0.125rem;',
        '  font-size: 0.9375rem;',
        '  font-weight: 700;',
        '  color: #111827;',
        '  line-height: 1.3;',
        '}',
        '#oa-cal-popup .oa-sub {',
        '  margin: 0;',
        '  font-size: 0.8rem;',
        '  color: #6B7280;',
        '  line-height: 1.4;',
        '}',
        '#oa-cal-popup .oa-body {',
        '  font-size: 0.8125rem;',
        '  color: #4B5563;',
        '  line-height: 1.55;',
        '  margin: 0 0 1rem;',
        '}',
        '#oa-cal-popup .oa-divider {',
        '  height: 1px;',
        '  background: #F3F4F6;',
        '  margin: 0.75rem 0;',
        '}',
        '#oa-cal-popup .oa-actions {',
        '  display: flex;',
        '  flex-direction: column;',
        '  gap: 0.5rem;',
        '}',
        '#oa-cal-popup .oa-btn-primary {',
        '  display: block;',
        '  width: 100%;',
        '  padding: 0.7rem 1rem;',
        '  border-radius: 0.7rem;',
        '  border: none;',
        '  background: linear-gradient(135deg, #4F46E5, #4338CA);',
        '  color: #fff;',
        '  font-weight: 600;',
        '  font-size: 0.875rem;',
        '  cursor: pointer;',
        '  text-align: center;',
        '  text-decoration: none;',
        '  transition: transform 0.2s, box-shadow 0.2s;',
        '  box-shadow: 0 4px 12px rgba(79,70,229,0.3);',
        '}',
        '#oa-cal-popup .oa-btn-primary:hover {',
        '  transform: translateY(-1px);',
        '  box-shadow: 0 8px 20px rgba(79,70,229,0.35);',
        '}',
        '#oa-cal-popup .oa-btn-secondary {',
        '  display: block;',
        '  width: 100%;',
        '  padding: 0.6rem 1rem;',
        '  border-radius: 0.7rem;',
        '  border: 1.5px solid #E5E7EB;',
        '  background: transparent;',
        '  color: #4B5563;',
        '  font-weight: 500;',
        '  font-size: 0.8125rem;',
        '  cursor: pointer;',
        '  text-align: center;',
        '  text-decoration: none;',
        '  transition: border-color 0.2s, color 0.2s;',
        '}',
        '#oa-cal-popup .oa-btn-secondary:hover {',
        '  border-color: #4F46E5;',
        '  color: #4F46E5;',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    // ── Inject HTML ────────────────────────────────────────────────────────
    var popup = document.createElement('div');
    popup.id = 'oa-cal-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', 'Book a Strategy Call');
    popup.innerHTML = [
        '<div class="oa-card">',
        '  <button class="oa-close" id="oa-cal-close" aria-label="Close">&#215;</button>',
        '  <div class="oa-header">',
        '    <div class="oa-avatar">0A</div>',
        '    <div>',
        '      <p class="oa-title">Ready to scale?</p>',
        '      <p class="oa-sub">Let\'s audit your marketing — free.</p>',
        '    </div>',
        '  </div>',
        '  <div class="oa-divider"></div>',
        '  <p class="oa-body">Book a quick strategy call and we\'ll identify exactly where your marketing is leaking money.</p>',
        '  <div class="oa-actions">',
        '    <a href="https://cal.com/0aftermath/30min" target="_blank" rel="noopener" class="oa-btn-primary" id="oa-cal-30min">',
        '      Book 30-Min Strategy Call',
        '    </a>',
        '    <a href="https://cal.com/0aftermath/15min" target="_blank" rel="noopener" class="oa-btn-secondary" id="oa-cal-15min">',
        '      Quick 15-Min Intro Call',
        '    </a>',
        '  </div>',
        '</div>'
    ].join('\n');
    document.body.appendChild(popup);

    // ── Dismiss Logic ──────────────────────────────────────────────────────
    function dismissPopup() {
        popup.classList.remove('oa-visible');
        sessionStorage.setItem('cal_popup_dismissed', '1');
    }

    document.getElementById('oa-cal-close').addEventListener('click', dismissPopup);

    // ── Show on page fully loaded ──────────────────────────────────────────
    window.addEventListener('load', function () {
        if (sessionStorage.getItem('cal_popup_dismissed') === '1') return;
        popup.classList.add('oa-visible');
    });

})();
