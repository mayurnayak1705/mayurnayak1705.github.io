// Portfolio JavaScript - Fixed Navigation and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initTypingAnimation();
    initProgressBar();
    initMobileMenu();
    initCardAnimations();
    initParticleSystem();
    initScrollAnimations();
});

// Fixed Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    let lastScrollY = window.scrollY;

    // Update active navigation link based on current section
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('nav__link--active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('nav__link--active');
                }
            }
        });
    }

    // Hide/show navigation on scroll
    function handleNavScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
            nav.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
        updateActiveNavigation();
    }

    window.addEventListener('scroll', handleNavScroll);
    updateActiveNavigation();
}

// Fixed smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle "Explore My Work" button
    const exploreButton = document.querySelector('.hero__btn[href="#projects"]');
    if (exploreButton) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = projectsSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Ensure external GitHub links work properly
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the browser handle external links naturally
            console.log('Opening GitHub link:', this.href);
        });
    });
}

// Progress bar functionality
function initProgressBar() {
    const progressBar = document.querySelector('.nav__progress');

    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
        
        if (progressBar) {
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        }
    }

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar(); // Initialize
}

// Fixed typing animation for hero name
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const originalText = 'Mayur Nayak';
    let displayText = '';
    let currentIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting && currentIndex < originalText.length) {
            displayText += originalText[currentIndex];
            currentIndex++;
            typingElement.textContent = displayText;
            setTimeout(typeWriter, 150);
        } else if (isDeleting && currentIndex > 0) {
            displayText = displayText.slice(0, -1);
            currentIndex--;
            typingElement.textContent = displayText;
            setTimeout(typeWriter, 100);
        } else if (!isDeleting && currentIndex === originalText.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
        } else if (isDeleting && currentIndex === 0) {
            setTimeout(() => {
                isDeleting = false;
                typeWriter();
            }, 1000);
        }
    }

    // Start typing animation after a delay
    setTimeout(() => {
        typeWriter();
    }, 1500);
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('nav__toggle--active');
            navMenu.classList.toggle('nav__menu--active');
            
            // Toggle hamburger animation
            const spans = this.querySelectorAll('span');
            const isActive = this.classList.contains('nav__toggle--active');
            
            spans.forEach((span, index) => {
                if (isActive) {
                    switch(index) {
                        case 0:
                            span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                            break;
                        case 1:
                            span.style.opacity = '0';
                            break;
                        case 2:
                            span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                            break;
                    }
                } else {
                    span.style.transform = '';
                    span.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking a link
        const mobileNavLinks = document.querySelectorAll('.nav__link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('nav__toggle--active');
                navMenu.classList.remove('nav__menu--active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Enhanced card interactions and hover effects
function initCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        // Enhanced hover effects with 3D transform
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.4)';
            this.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            
            // Animate tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.3)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
            
            // Reset tech tags
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            });
        });

        // Add magnetic effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-15px) 
                scale(1.02)
            `;
        });
    });

    // Animate project links
    const projectLinks = document.querySelectorAll('.project-card__link');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.backgroundColor = '';
        });
    });
}

// Enhanced particle system
function initParticleSystem() {
    const particlesContainer = document.querySelector('.background-animation');
    if (!particlesContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 20;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -10px;
            border-radius: 50%;
            animation: floatUp ${animationDuration}s linear ${delay}s infinite;
            opacity: 0.6;
            pointer-events: none;
        `;
        
        // Random colors
        const colors = ['#3b82f6', '#8b5cf6', '#06d6a0', '#f59e0b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (animationDuration + delay) * 1000);
    }

    // Add floating animation keyframes
    if (!document.querySelector('#particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create particles continuously
    setInterval(createParticle, 2000);
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate children with delay
                const children = entry.target.querySelectorAll('.project-card, .tech-tag');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .project-card, .coming-soon-card');
    elementsToAnimate.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    // Trigger initial hero animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero__content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
        
        // Animate hero elements sequentially
        const heroElements = document.querySelectorAll('.hero__avatar, .hero__name, .hero__location, .hero__tagline, .hero__description, .hero__cta');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 300);
});

// Add CSS for initial hero state
const heroStyles = document.createElement('style');
heroStyles.textContent = `
    .hero__content {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .hero__avatar, .hero__name, .hero__location, .hero__tagline, .hero__description, .hero__cta {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .nav__menu--active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        padding: 1rem;
        gap: 0.5rem;
    }
`;
document.head.appendChild(heroStyles);

// Debug logging for troubleshooting
console.log('Portfolio JavaScript loaded successfully');
console.log('Navigation links found:', document.querySelectorAll('.nav__link').length);
console.log('GitHub links found:', document.querySelectorAll('a[href*="github.com"]').length);
console.log('Project cards found:', document.querySelectorAll('.project-card').length);