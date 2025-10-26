// ==========================================================================
// Smooth Scroll & Navigation Enhancement
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Smooth Scroll for Anchor Links
    // ==========================================================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if href is just "#" or if target exists
            if (href === '#' || !document.querySelector(href)) {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // ==========================================================================
    // Navigation Background on Scroll
    // ==========================================================================
    
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ==========================================================================
    // Intersection Observer for Fade-in Animations
    // ==========================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInElements = document.querySelectorAll(
        '.symptom-card, .journey-step, .included-item, .testimonial-card, .science-item, .checklist-item'
    );
    
    // Add initial state
    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // ==========================================================================
    // Email Link Enhancement (Track Clicks)
    // ==========================================================================
    
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large, .nav-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Analytics event tracking (if you add Google Analytics later)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': this.textContent.trim()
                });
            }
        });
    });
    
    // ==========================================================================
    // External Links - Open in New Tab
    // ==========================================================================
    
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Only add if not already set
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ==========================================================================
    // Lazy Loading Enhancement for Future Images
    // ==========================================================================
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ==========================================================================
    // Accessibility: Skip to Main Content
    // ==========================================================================
    
    // Add skip link for keyboard navigation (if needed in future)
    const body = document.body;
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #1a1a1a;
        color: white;
        padding: 8px;
        z-index: 10000;
        text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    body.insertBefore(skipLink, body.firstChild);
    
    // Add id to first section if it doesn't exist
    const firstSection = document.querySelector('.hero');
    if (firstSection && !firstSection.id) {
        firstSection.id = 'main-content';
    }
    
    // ==========================================================================
    // Performance: Preload Critical Resources
    // ==========================================================================
    
    // Preload the Inter font if not already preloaded
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    
    // ==========================================================================
    // Console Message (Optional - Remove in Production)
    // ==========================================================================
    
    console.log('%c🌿 EIR Institute ', 'font-size: 20px; font-weight: bold; color: #1a1a1a;');
    console.log('%cWebsite by Kilo Code', 'font-size: 12px; color: #7a7a7a;');
    
});

// ==========================================================================
// Reduced Motion Preference Detection
// ==========================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable all animations if user prefers reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ==========================================================================
// Error Handling
// ==========================================================================

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    // In production, you might want to send this to an error tracking service
});