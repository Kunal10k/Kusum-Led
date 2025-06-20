// ===========================
// 1. Hero Autoplay Slider
// ===========================
let slides = document.querySelectorAll('.hero-slide');
let index = 0;

function showNextSlide() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

setInterval(showNextSlide, 5000);

// ===========================
// 2. Counter Animation on Load
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;

        const update = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    };

    const triggerCounters = () => {
        counters.forEach((counter) => {
            animateCounter(counter);
        });
    };

    triggerCounters();
});

// ===========================
// 3. Testimonials Carousel (Owl Carousel)
// ===========================
$(document).ready(function () {
    $('.testimonial-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: ['◀', '▶'],
        dots: true,
        margin: 20
    });
});

// ===========================
// 4. Background Video Play/Pause Toggle
// ===========================
const video = document.getElementById("bgVideo");
const toggleBtn = document.getElementById("videoToggle");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", function () {
    if (video.paused) {
        video.play();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    } else {
        video.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
});

// ===========================
// 5. GSAP Scroll Animations
// ===========================
gsap.registerPlugin(ScrollTrigger);

// 5.1 Horizontal Scroll
const scrollLength = document.querySelector('.scroller').scrollWidth - window.innerWidth;

gsap.to('.scroller', {
    x: () => -scrollLength,
    ease: "none",
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + scrollLength,
        scrub: true,
        pin: ".scroll-container",
        anticipatePin: 1
    }
});

// 5.2 Sticky Vertical Motion
gsap.to('.sticky-content', {
    y: -500,
    ease: "none",
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + scrollLength,
        scrub: true
    }
});

// 5.3 Service Items Fade-in
gsap.utils.toArray(".service-item").forEach((item, i) => {
    gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// ===========================
// 6. Back to Top Button
// ===========================
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===========================
// 7. Parallax Animation (Who We Are Section)
// ===========================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            animateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function animateParallax() {
    const section = document.querySelector('.who-we-are');
    const left = document.querySelector('.parallax-left img');
    const right = document.querySelector('.parallax-right img');

    if (!section || !left || !right) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;

    if (scrollY + windowH > sectionTop && scrollY < sectionTop + sectionHeight) {
        const relativeY = (scrollY + windowH - sectionTop) / (sectionHeight + windowH);
        const moveY = (relativeY - 0.5) * 250;

        left.style.transform = `translateY(${moveY}px) rotate(-8deg)`;
        right.style.transform = `translateY(${-moveY}px) rotate(8deg)`;
    }
}




const zoomLeft = document.getElementById("zoom-box-left");
const zoomRight = document.getElementById("zoom-box-right");
const sectionLeft = document.getElementById("zoom-section-left");
const sectionRight = document.getElementById("zoom-section-right");

let targetScaleLeft = 0.05;
let targetScaleRight = 0.05;
let currentScaleLeft = 0.05;
let currentScaleRight = 0.05;

function smoothScale(current, target, factor = 0.07) {
    return current + (target - current) * factor;
}

function updateScrollZoom() {
    const winH = window.innerHeight;

    // LEFT ZOOM LOGIC
    const leftRect = sectionLeft.getBoundingClientRect();
    const progressLeft = Math.min(1, Math.max(0, (winH - leftRect.top) / winH));
    targetScaleLeft = Math.pow(progressLeft, 1.2);
    currentScaleLeft = smoothScale(currentScaleLeft, targetScaleLeft);
    zoomLeft.style.transform = `scale(${Math.max(0.05, currentScaleLeft)})`;

    // RIGHT ZOOM LOGIC (only when left is fully zoomed)
    if (currentScaleLeft >= 0.99) {
        const rightRect = sectionRight.getBoundingClientRect();
        const progressRight = Math.min(1, Math.max(0, (winH - rightRect.top) / winH));
        targetScaleRight = Math.pow(progressRight, 1.2);
    } else {
        targetScaleRight = 0.05;
    }

    currentScaleRight = smoothScale(currentScaleRight, targetScaleRight);
    zoomRight.style.transform = `scale(${Math.max(0.05, currentScaleRight)})`;

    requestAnimationFrame(updateScrollZoom);
}

requestAnimationFrame(updateScrollZoom);