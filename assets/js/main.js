  // JavaScript (Autoplay Slider)
  let slides = document.querySelectorAll('.hero-slide');
  let index = 0;

  function showNextSlide() {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
  }

  setInterval(showNextSlide, 5000);

  // ===========================
  // 3. GSAP Animations
  // ===========================




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


  // back to top 

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