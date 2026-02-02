// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
function animateOnScroll() {
    // Seletores baseados na estrutura real do HTML
    const elementsToAnimate = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide elements and observe them
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}

// Header slide-in animation from left to right
function setupHeaderSlideAnimation() {
    const header = document.querySelector('.about-text');
    
    if (header) {
        // Initially position header off-screen to the left
        header.style.transform = 'translateX(-100%)';
        header.style.transition = 'transform 0.8s ease-out';
        
        // Trigger animation after a short delay
        setTimeout(() => {
            header.style.transform = 'translateX(0)';
        }, 100);
    }
}

// Animação especial para destacar "Intelifisco" na seção sobre nós
function setupInteliFiscoAnimation() {
    const aboutSection = document.querySelector('#sobre-nos');
    
    if (aboutSection) {
        // Encontrar o h2 que contém "Intelifisco"
        const aboutTitle = aboutSection.querySelector('h2');
        
        if (aboutTitle && aboutTitle.textContent.includes('Intelifisco')) {
            // Substituir "Intelifisco" por uma versão com classe especial
            const text = aboutTitle.innerHTML;
            const highlightedText = text.replace(
                /(Intelifisco)/gi, 
                '<span class="highlight-intelifisco">$1</span>'
            );
            aboutTitle.innerHTML = highlightedText;
            
            // Observer para ativar a animação quando a seção aparecer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const inteliFiscoElement = entry.target.querySelector('.highlight-intelifisco');
                        
                        if (inteliFiscoElement) {
                            // Delay de 500ms após a seção aparecer
                            setTimeout(() => {
                                inteliFiscoElement.classList.add('animated');
                            }, 500);
                        }
                        
                        // Unobserve após animar
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(aboutSection);
        }
    }
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    setupInteliFiscoAnimation();
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        if (!this.classList.contains('btn-secondary')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Add parallax effect to hero background
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        heroBackground.style.transform = `translateY(${parallax}px)`;
    }
});

// Utility function to debounce scroll events
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
