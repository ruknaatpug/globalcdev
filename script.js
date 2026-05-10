// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
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
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#4a4a4a';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = '#4a4a4a';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .about-text, .about-graphic, .contact-item, .contact-form');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Hero icons animation
document.addEventListener('DOMContentLoaded', () => {
    const heroIcons = document.querySelectorAll('.hero-graphic i');
    
    heroIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animation = 'float 3s ease-in-out infinite';
            icon.style.animationDelay = `${index * 0.5}s`;
        }, index * 200);
    });
});

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .service-card {
        animation: slideInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Stagger animation for service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Contact form handling with Web3Forms
// ✅ Simple Contact Form Success Message (No Backend)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // stop page reload

            const submitBtn = this.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;

            // Button loading effect
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Fake delay (for realism)
            setTimeout(() => {
                // Show success message
                successMessage.style.display = 'block';

                // Reset form
                form.reset();

                // Scroll to message
                successMessage.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Hide after 5 sec
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

            }, 1000); // 1 second delay
        });
    }
});

// Dropdown menu hover behavior with delay
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    let hoverTimeout;

    if (dropdown && dropdownMenu) {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            dropdownMenu.style.display = 'grid';
            setTimeout(() => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
            }, 10);
        });

        dropdown.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 300);
            }, 100);
        });

        dropdownMenu.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
        });

        dropdownMenu.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 300);
            }, 100);
        });

        // Close dropdown when clicking on any link inside it
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                setTimeout(() => {
                    dropdownMenu.style.display = 'none';
                }, 300);
            }
        });
    }
});

// Tech stack items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            techItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.6';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            techItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
});

// Add scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Create scroll-to-top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #F96E00;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(249, 110, 0, 0.3);
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGraphic = document.querySelector('.hero-graphic');
    
    if (heroGraphic) {
        heroGraphic.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        
        // Skip animation for non-numeric stats like "24/7"
        if (originalText === '24/7') {
            return;
        }
        
        const target = parseInt(originalText.replace(/\D/g, ''));
        const suffix = originalText.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
