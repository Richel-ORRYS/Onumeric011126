
// Loader
window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('loader').classList.add('fade-out');
    }, 500);
});

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

navToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
});

overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Active navigation highlighting
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});


// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(function () {
    updateActiveNav();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Preload images * chargement du loader de l'image en arriere plan en point de geolocalisationema*
const imageUrls = [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
];

imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTA button click effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initAnimations();
    updateActiveNav();
});

// Add structured data for SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ORRYS NUMERIC",
    "description": "Cabinet conseil en IT spécialisé dans le développement web, applications mobiles, cybersécurité et formations",
    "url": "https://www.orrysnumeric.cg",
    "logo": "https://www.orrysnumeric.cg/logo.png",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "OCH, CASE C4-23",
        "addressLocality": "Brazzaville",
        "addressCountry": "CG"
    },
    "telephone": "+242 06-631-83-33",
    "services": [
        "Développement Web",
        "Applications Mobiles",
        "Réseaux & Télécoms",
        "Cybersécurité",
        "Formations IT"
    ]
};

// Add structured data to head
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);


