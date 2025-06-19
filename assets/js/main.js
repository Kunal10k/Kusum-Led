const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// ===========================
// 3. GSAP Animations
// ===========================
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);



    // Projects subtitle animation
    gsap.from(".section-subtitle-block", {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".projects-section",
            start: "top 80%",
        },
    });

    // Projects title animation
    gsap.from(".section-title-block", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".projects-section",
            start: "top 80%",
        },
    });

    // Project item staggered animation
    gsap.utils.toArray(".project-item").forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
        });
    });
});



// counter 

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

    // Animate once on load or use IntersectionObserver
    triggerCounters();
});



//testimonials 

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



gsap.registerPlugin(ScrollTrigger);

// Calculate horizontal scroll length
const scrollLength = document.querySelector('.scroller').scrollWidth - window.innerWidth;

// Horizontal scroll for the scroller
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

// Vertical scroll for sticky content (faster movement)
gsap.to('.sticky-content', {
    y: -500, // ← Increase this for faster vertical motion
    ease: "none", // or try "power2.out" for smooth acceleration
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + scrollLength,
        scrub: true
    }
});


gsap.registerPlugin(ScrollTrigger);

// Left Image: Move bottom to top + fade in
gsap.from(".image-left", {
    y: 200, // more vertical movement
    opacity: 0, // fades in
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".who-we-are-section",
        start: "top 80%", // start earlier
        end: "bottom top",
        scrub: true
    }
});

// Right Image: Move top to bottom + fade in
gsap.from(".image-right", {
    y: -200,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".who-we-are-section",
        start: "top 80%",
        end: "bottom top",
        scrub: true
    }
});




gsap.registerPlugin(ScrollTrigger);

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