// Initialize Lucide Icons
lucide.createIcons();

// Header Scroll Logic
const header = document.getElementById('header');
const logo = document.querySelector('.logo-main');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled', 'bg-white/90', 'shadow-lg');
        header.classList.remove('bg-transparent');
    } else {
        header.classList.remove('scrolled', 'bg-white/90', 'shadow-lg');
        header.classList.add('bg-transparent');
    }
});

// Advanced Reveal Animations (Intersection Observer)
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Mobile Menu Toggle (Simple implementation)
const mobileMenuBtn = document.querySelector('header button');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // You could add a full mobile menu overlay here
        alert('Mobile menu feature coming soon - all links available in desktop view.');
    });
}

// Form Submission Feedback
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function (e) {
        const isLeadMagnet = this.id === 'lead-magnet-form';

        // Handle Lead Magnet Redirection
        if (isLeadMagnet) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                btn.innerHTML = `
                    <div class="flex items-center justify-center gap-2">
                        <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Generating Map...
                    </div>
                `;
                btn.disabled = true;
            }

            // Redirect after simulating a brief generation process
            setTimeout(() => {
                window.location.href = 'roadmap.html';
            }, 1200);
            return;
        }

        // Generic Form Handling (Contact Form)
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <span class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                </div>
            `;
            btn.disabled = true;
        }
    });
});

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    // Set initial state - all answers hidden
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other FAQs (optional: remove this block for multi-open behavior)
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                otherAnswer.style.maxHeight = '0';
                otherItem.classList.remove('active');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current FAQ
        if (isOpen) {
            answer.style.maxHeight = '0';
            item.classList.remove('active');
            if (icon) icon.style.transform = 'rotate(0deg)';
            question.setAttribute('aria-expanded', 'false');
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            item.classList.add('active');
            if (icon) icon.style.transform = 'rotate(180deg)';
            question.setAttribute('aria-expanded', 'true');
        }
    });

    // Set initial ARIA attributes
    question.setAttribute('aria-expanded', 'false');
});
