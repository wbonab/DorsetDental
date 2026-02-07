// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav')) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form Validation (if contact form exists)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const phone = this.querySelector('input[name="phone"]');
        const message = this.querySelector('textarea[name="message"]');
        const privacy = this.querySelector('input[name="privacy"]');
        
        let isValid = true;
        
        // Clear previous error states
        this.querySelectorAll('.error').forEach(el => el.remove());
        this.querySelectorAll('input, textarea').forEach(el => {
            el.style.borderColor = '';
        });
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Please enter your email address');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional but if provided, check format)
        if (phone && phone.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Validate message
        if (message && !message.value.trim()) {
            showError(message, 'Please enter a message');
            isValid = false;
        }
        
        // Validate privacy checkbox
        if (privacy && !privacy.checked) {
            showError(privacy, 'Please accept the privacy policy');
            isValid = false;
        }
        
        if (isValid) {
            // In a real implementation, this would submit to a server
            // For now, show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.cssText = 'background: #d4edda; color: #155724; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; border: 1px solid #c3e6cb;';
            successMessage.textContent = 'Thank you! Your message has been sent. We\'ll be in touch soon.';
            
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Reset form
            this.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}

function showError(field, message) {
    field.style.borderColor = '#c84557';
    const error = document.createElement('div');
    error.className = 'error';
    error.style.cssText = 'color: #c84557; font-size: 0.9rem; margin-top: 0.25rem;';
    error.textContent = message;
    field.parentElement.appendChild(error);
}

// Sticky CTA Bar Show/Hide on Scroll
const stickyCta = document.querySelector('.sticky-cta');
if (stickyCta) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Show after scrolling down 300px
        if (currentScroll > 300) {
            stickyCta.style.display = 'block';
        } else {
            stickyCta.style.display = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// Add loading animation to buttons on click
document.querySelectorAll('.btn').forEach(button => {
    if (button.tagName === 'A' && button.getAttribute('href').startsWith('#')) {
        return; // Skip anchor links
    }
    
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            const originalText = this.textContent;
            
            // If it's a form submit button, let the form validation handle it
            if (this.type !== 'submit') {
                this.textContent = 'Loading...';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('loading');
                }, 2000);
            }
        }
    });
});

// FAQ Accordion (if implemented)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('h3');
    if (question) {
        question.style.cursor = 'pointer';
        question.addEventListener('click', function() {
            const answer = item.querySelector('p');
            if (answer) {
                const isOpen = answer.style.display !== 'none';
                answer.style.display = isOpen ? 'none' : 'block';
                question.style.color = isOpen ? '' : 'var(--primary-dark)';
            }
        });
    }
});

// Lazy Loading for Images (if images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Print Detection
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Console message (Easter egg for developers)
console.log('%c🦷 Bournemouth Dental Implants', 'font-size: 20px; font-weight: bold; color: #1a5f7a;');
console.log('%cNeed web development services? Contact us!', 'font-size: 12px; color: #666;');
