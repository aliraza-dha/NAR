// Initialize 3D Scene
let scene, camera, renderer, controls;
let gears = [];

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a2463, 1, 1000);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    // Create industrial gears
    createGears();
    
    // Hide loader
    setTimeout(() => {
        document.getElementById('model-loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('model-loader').style.display = 'none';
        }, 500);
    }, 2000);
    
    // Start animation
    animate();
}

function createGears() {
    const gearGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 16);
    const gearMaterial = new THREE.MeshPhongMaterial({
        color: 0x3b82f6,
        shininess: 100,
        specular: 0xffffff
    });
    
    // Create multiple gears
    for (let i = 0; i < 5; i++) {
        const gear = new THREE.Mesh(gearGeometry, gearMaterial);
        gear.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 30
        );
        gear.rotation.x = Math.random() * Math.PI;
        gear.rotation.y = Math.random() * Math.PI;
        gear.userData = { speed: Math.random() * 0.02 + 0.01 };
        scene.add(gear);
        gears.push(gear);
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate gears
    gears.forEach(gear => {
        gear.rotation.y += gear.userData.speed;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }
});

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('Thank you for your message! We will contact you soon.');
                    e.target.reset();
                } else {
                    alert('Sorry, there was an error sending your message. Please try again.');
                }
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again.');
            }
        });
    }
});

// Scroll functions
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
}

function scrollToServices() {
    const servicesSection = document.querySelector('#services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 16);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
});