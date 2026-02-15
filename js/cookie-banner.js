/**
 * Cookie Consent Banner Logic
 * Handles display of banner, saving consent to localStorage,
 * and initializing PostHog/GTM based on consent.
 */

(function () {
    const CONSENT_KEY = 'cookie_consent_status';

    function initBanner() {
        // specific check for if the user has already consented
        if (localStorage.getItem(CONSENT_KEY)) {
            // If already decided, apply logic immediately
            applyConsent(localStorage.getItem(CONSENT_KEY));
            return;
        }

        // Create Banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 bg-white p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[100] transform transition-transform duration-300 translate-y-full';
        banner.innerHTML = `
            <div class="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-600">
                    <p class="font-bold text-gray-900 mb-1">We value your privacy</p>
                    <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
                </div>
                <div class="flex gap-3 shrink-0">
                    <button id="cookie-reject" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        Reject All
                    </button>
                    <button id="cookie-accept" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">
                        Accept All
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Animate in
        setTimeout(() => {
            banner.classList.remove('translate-y-full');
        }, 100);

        // Event Listeners
        document.getElementById('cookie-accept').addEventListener('click', () => {
            setConsent('granted');
            hideBanner(banner);
        });

        document.getElementById('cookie-reject').addEventListener('click', () => {
            setConsent('denied');
            hideBanner(banner);
        });
    }

    function hideBanner(banner) {
        banner.classList.add('translate-y-full');
        setTimeout(() => {
            banner.remove();
        }, 300);
    }

    function setConsent(status) {
        localStorage.setItem(CONSENT_KEY, status);
        applyConsent(status);
    }

    function applyConsent(status) {
        if (status === 'granted') {
            console.log('Cookie Consent: GRANTED');

            // Re-enable PostHog capturing if it was loaded
            if (window.posthog) {
                window.posthog.opt_in_capturing();
            }

            // GTM Consent Update
            if (window.gtag) {
                gtag('consent', 'update', {
                    'ad_storage': 'granted',
                    'analytics_storage': 'granted'
                });
            }
        } else {
            console.log('Cookie Consent: DENIED');

            // Disable PostHog capturing
            if (window.posthog) {
                window.posthog.opt_out_capturing();
            }

            // GTM Consent Update
            if (window.gtag) {
                gtag('consent', 'update', {
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied'
                });
            }
        }
    }

    // Default GTM Consent (Denied by default until accepted)
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    // Don't overwrite if already set, but ensure defaults
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied'
    });

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBanner);
    } else {
        initBanner();
    }
})();
