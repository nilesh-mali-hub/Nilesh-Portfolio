import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // 1. Fetch settings to see if Google Analytics Measurement ID is configured
    fetch('/api/settings')
      .then(res => res.json())
      .then(settings => {
        const gaId = settings?.gaMeasurementId;
        if (gaId && typeof gaId === 'string' && gaId.trim().startsWith('G-')) {
          // Initialize GA dynamic script injection
          if (!window.dataLayer) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag() {
              if (window.dataLayer) {
                window.dataLayer.push(arguments);
              }
            };
            window.gtag('js', new Date());
          }

          if (!document.getElementById('google-analytics-script')) {
            const script = document.createElement('script');
            script.id = 'google-analytics-script';
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(script);
          }

          // Track page view in GA
          window.gtag('config', gaId, {
            page_path: location.pathname + location.search,
          });
        }
      })
      .catch(err => console.error('Error in Google Analytics setup:', err));

    // 2. Perform internal logging for visitor insights (keyword & traffic sources)
    const searchParams = new URLSearchParams(location.search);
    const utmSource = searchParams.get('utm_source') || '';
    const utmMedium = searchParams.get('utm_medium') || '';
    const utmCampaign = searchParams.get('utm_campaign') || '';
    const utmTerm = searchParams.get('utm_term') || searchParams.get('q') || ''; // standard query parameter for keywords

    let deviceType = 'desktop';
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      deviceType = 'mobile';
    } else if (/Tablet|iPad/i.test(navigator.userAgent)) {
      deviceType = 'tablet';
    }

    const payload = {
      path: location.pathname,
      referrer: document.referrer || 'Direct',
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      device: deviceType,
      userAgent: navigator.userAgent
    };

    // Post to local analytics server logger silently
    fetch('/api/analytics/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => console.error('Internal analytics log error:', err));

  }, [location]);

  return null; // This component operates as a background observer side-effect
}
