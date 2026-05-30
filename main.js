// ===== AWAR Website — Main JavaScript =====

(function () {
  'use strict';

  // ===== Navigation =====
  const nav = document.getElementById('nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Sticky nav background on scroll
  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // Mobile nav toggle
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile nav on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== Scroll Reveal (Intersection Observer) =====
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===== Counter Animation =====
  var statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1500;
    var start = 0;
    var startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutCubic(progress);
      var current = Math.round(easedProgress * target);

      if (target >= 1000) {
        el.textContent = prefix + current.toLocaleString();
      } else {
        el.textContent = prefix + current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      var target = el.getAttribute('data-target');
      var prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + parseInt(target, 10).toLocaleString();
    });
  }

  // ===== Hero Figure Animation =====
  var heroContainer = document.getElementById('heroFigures');

  if (heroContainer) {
    var figureCount = 40;
    var figures = [];

    for (var i = 0; i < figureCount; i++) {
      var fig = document.createElement('div');
      fig.className = 'hero-figure';

      var x = 5 + Math.random() * 90;
      var y = 10 + Math.random() * 80;
      var randomRotation = -75 + Math.random() * 150;
      var scale = 0.6 + Math.random() * 0.6;

      fig.style.left = x + '%';
      fig.style.top = y + '%';
      fig.style.transform = 'rotateY(' + randomRotation + 'deg) scale(' + scale + ')';

      fig.innerHTML = '<div class="hero-figure-head"></div><div class="hero-figure-body"></div>';

      heroContainer.appendChild(fig);
      figures.push({
        el: fig,
        x: x,
        y: y,
        randomRotation: randomRotation,
        scale: scale
      });
    }

    // After a short delay, align them (transition to coordinated)
    setTimeout(function () {
      figures.forEach(function (f) {
        f.el.style.transform = 'rotateY(0deg) scale(' + f.scale + ')';
      });
    }, 500);

    // Toggle between coordinated and random every 6 seconds
    var isCoordinated = true;
    setInterval(function () {
      isCoordinated = !isCoordinated;
      figures.forEach(function (f) {
        if (isCoordinated) {
          f.el.style.transform = 'rotateY(0deg) scale(' + f.scale + ')';
        } else {
          f.el.style.transform = 'rotateY(' + f.randomRotation + 'deg) scale(' + f.scale + ')';
        }
      });
    }, 6000);
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        var offset = nav.offsetHeight + 20;
        var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
