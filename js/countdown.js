class CountdownTimer {
  constructor(launchDate = '2026-12-31T00:00:00Z') {
    this.launchDate = new Date(launchDate).getTime();
    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };
    this.init();
  }

  init() {
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.launchDate - now;
    if (distance < 0) {
      Object.values(this.elements).forEach(el => el.textContent = '0');
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.updateDisplay(days, hours, minutes, seconds);
  }

  updateDisplay(days, hours, minutes, seconds) {
    this.animateValue(this.elements.days, days);
    this.animateValue(this.elements.hours, hours);
    this.animateValue(this.elements.minutes, minutes);
    this.animateValue(this.elements.seconds, seconds);
  }

  animateValue(element, value) {
    const formatted = String(value).padStart(2, '0');
    if (element.textContent !== formatted) {
      element.textContent = formatted;
      element.style.animation = 'none';
      setTimeout(() => element.style.animation = 'pulse 0.3s ease-in-out', 10);
    }
  }
}

if (document.getElementById('countdown')) {
  new CountdownTimer('2026-12-31T00:00:00Z');
}