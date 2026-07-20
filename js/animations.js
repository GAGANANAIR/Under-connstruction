class AnimationController {
  constructor() {
    this.observeElements();
    this.setupScrollAnimations();
  }

  observeElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'fadeInUp 0.6s ease-out';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.feature-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animation = `fadeInUp 0.6s ease-out ${i * 0.1}s both`;
      observer.observe(card);
    });
  }

  setupScrollAnimations() {
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const bar = document.querySelector('.progress-bar');
      if (bar) bar.style.width = scrollPercent + '%';
    });
  }
}

class SmoothScroll {
  constructor() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new SmoothScroll();
  });
} else {
  new AnimationController();
  new SmoothScroll();
}