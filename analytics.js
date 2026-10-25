(() => {
  const measurementId = 'G-8ML5JB8Y6K';
  const productionHosts = ['couplestudio.online', 'www.couplestudio.online'];

  // Local development and Pages previews must not inflate production reports.
  if (!productionHosts.includes(window.location.hostname)) {
    window.coupleAnalytics = { track() {} };
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  const cleanUrl = (value) => {
    try {
      const url = new URL(value);
      return url.origin + url.pathname;
    } catch {
      return '';
    }
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    // Exclude query strings and fragments from automatically reported URLs.
    page_location: cleanUrl(window.location.href),
    page_referrer: cleanUrl(document.referrer),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  window.coupleAnalytics = {
    track(eventName, parameters = {}) {
      try {
        window.gtag('event', eventName, { ...parameters, send_to: measurementId });
      } catch {
        // Analytics failures must not interrupt the studio workflow.
      }
    },
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
})();
