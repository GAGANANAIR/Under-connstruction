class ParticleSystem {
  constructor(container, count = 50) {
    this.container = container;
    this.particles = [];
    this.count = count;
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < this.count; i++) {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        element: this.createParticleElement()
      };
      this.particles.push(particle);
      this.container.appendChild(particle.element);
    }
  }

  createParticleElement() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    return particle;
  }

  animate = () => {
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.speedY *= -1;
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200) {
        particle.speedX += dx * 0.0001;
        particle.speedY += dy * 0.0001;
      }
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
      particle.element.style.width = particle.size + 'px';
      particle.element.style.height = particle.size + 'px';
      particle.element.style.opacity = particle.opacity;
    });
    requestAnimationFrame(this.animate);
  };

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }
}

if (document.getElementById('particleContainer')) {
  new ParticleSystem(document.getElementById('particleContainer'), window.innerWidth > 768 ? 50 : 25);
}