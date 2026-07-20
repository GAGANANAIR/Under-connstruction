class UnderConstructionApp {
  constructor() {
    this.setupPreferences();
    this.initializeApp();
  }

  setupPreferences() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }

  initializeApp() {
    this.setupEventListeners();
    this.trackPageView();
  }

  setupEventListeners() {
    document.addEventListener('visibilitychange', () => {
      console.log(document.hidden ? 'Page hidden' : 'Page visible');
    });
    window.addEventListener('online', () => this.showNotification('Back online'));
    window.addEventListener('offline', () => this.showNotification('No connection'));
  }

  trackPageView() {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        'page_path': window.location.pathname,
        'page_title': document.title
      });
    }
  }

  showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Under Construction', { body: message, icon: 'assets/favicon.svg' });
    }
  }
}

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new UnderConstructionApp());
} else {
  new UnderConstructionApp();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {
    console.log('SW registration failed');
  });
}