/**
 * 0aftermath Source-Based Personalization Engine
 * 
 * Logic:
 * 1. Direct/Brand (Default) -> "Agencies are dead."
 * 2. Search/LLM (Intent) -> "AI Automation"
 * 3. Ads (Lead Gen) -> "Roadmap Lead Magnet"
 * 
 * Note: The 'Concept' Configurator is located on a separate page.
 */

(function () {
    const IDS = {
        headline: 'hero-headline',
        subtitle: 'hero-subtitle',
        formTitle: 'form-title',
        formSubtitle: 'form-subtitle'
    };

    // Content Configuration
    // Note: 'brand' content replaces the static HTML default to match the "Agencies are dead" strategy.
    const CONTENT = {
        'brand': { // Default/Direct Traffic
            headline: 'Agencies are dead. <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">We killed them.</span>',
            subtitle: '<strong>0aftermath</strong> is the AI anomaly that replaced the agency model. Automated, predictive, and purely performance-based.',
            formTitle: 'Apply for Beta Access',
            formSubtitle: 'We only work with 5 new partners this month.'
        },
        'service': { // Search / AI Traffic
            headline: 'Scale Your Business with <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI-Driven</span> Marketing Mastery',
            subtitle: 'Leverage advanced machine learning models and predictive analytics to drive measurable ROI for modern businesses.',
            formTitle: 'Get Your Free Marketing Audit',
            formSubtitle: 'Ready to scale? Let our AI analyze your current strategy.'
        },
        'offer': { // Ads / Lead Magnet Traffic
            headline: 'Stop Wasting Budget. <span class="block mt-2">Get the <span class="text-accent">2026 Roadmap</span>.</span>',
            subtitle: 'Download the exact digital marketing roadmap used by 500+ businesses to double their ROI in 90 days.',
            formTitle: 'Download Free Roadmap',
            formSubtitle: 'Enter your details for instant access.'
        }
    };

    /**
     * Detects traffic source based on URL params and Referrer
     */
    function detectSource() {
        const p = new URLSearchParams(window.location.search);
        const ref = (document.referrer || '').toLowerCase();

        // Priority 1: Paid Traffic / Campaigns
        if (p.has('utm_source') || p.get('source') === 'ads' || p.has('campaign')) {
            return 'offer';
        }

        // Priority 2: High Intent (Search / AI)
        if (
            p.get('source') === 'llm' ||
            p.get('ref') === 'ai' ||
            ref.includes('google') ||
            ref.includes('bing') ||
            ref.includes('chatgpt') ||
            ref.includes('claude') ||
            ref.includes('perplexity')
        ) {
            return 'service';
        }

        // Priority 3: Direct / Default
        return 'brand';
    }

    /**
     * Applies content with smooth transition
     */
    function init() {
        const persona = detectSource();
        const data = CONTENT[persona];

        if (!data) return;

        console.log(`[0aftermath] Personalization Active: ${persona}`);

        Object.keys(IDS).forEach(key => {
            const el = document.getElementById(IDS[key]);
            if (el) {
                // Ensure transition is set
                el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '0';

                setTimeout(() => {
                    el.innerHTML = data[key];
                    el.style.opacity = '1';
                }, 600);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
