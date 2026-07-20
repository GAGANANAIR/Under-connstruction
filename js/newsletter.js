class NewsletterForm {
  constructor(formId = 'newsletterForm') {
    this.form = document.getElementById(formId);
    this.emailInput = document.getElementById('emailInput');
    this.submitBtn = document.getElementById('submitBtn');
    this.formMessage = document.getElementById('formMessage');
    this.signupsDisplay = document.getElementById('totalSignups');
    this.storageKey = 'under-construction-waitlist';
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.loadSignups();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const email = this.emailInput.value.trim();
    if (!email || !this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email', 'error');
      return;
    }
    this.setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    if (this.saveEmail(email)) {
      this.showMessage('✓ Added! Check your email.', 'success');
      this.emailInput.value = '';
      this.loadSignups();
    } else {
      this.showMessage('Email already on waitlist', 'error');
    }
    this.setLoading(false);
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  saveEmail(email) {
    let signups = this.getSignups();
    if (signups.includes(email)) return false;
    signups.push(email);
    localStorage.setItem(this.storageKey, JSON.stringify(signups));
    return true;
  }

  getSignups() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  loadSignups() {
    const total = 1247 + this.getSignups().length;
    this.signupsDisplay.textContent = total.toLocaleString();
  }

  showMessage(text, type) {
    this.formMessage.textContent = text;
    this.formMessage.className = `form-message ${type}`;
    if (type === 'success') {
      setTimeout(() => {
        this.formMessage.textContent = '';
        this.formMessage.className = 'form-message';
      }, 5000);
    }
  }

  setLoading(isLoading) {
    this.submitBtn.classList.toggle('loading', isLoading);
    this.submitBtn.disabled = isLoading;
  }
}

if (document.getElementById('newsletterForm')) {
  new NewsletterForm('newsletterForm');
}