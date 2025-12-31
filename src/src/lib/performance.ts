// Performance monitoring utilities

// Report Web Vitals to analytics
export function reportWebVitals(metric: any) {
  // Send to analytics service
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value);
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImage(img: HTMLImageElement) {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement;
          const src = image.dataset.src;
          
          if (src) {
            image.src = src;
            image.classList.add('loaded');
            imageObserver.unobserve(image);
          }
        }
      });
    });

    imageObserver.observe(img);
  } else {
    // Fallback for browsers without Intersection Observer
    const src = img.dataset.src;
    if (src) img.src = src;
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload fonts
  const fontUrls = [
    '/fonts/SpaceGrotesk-Bold.woff2',
    '/fonts/Inter-Regular.woff2',
  ];

  fontUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Defer non-critical scripts
export function deferScript(src: string, callback?: () => void) {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  
  if (callback) {
    script.onload = callback;
  }
  
  document.body.appendChild(script);
}

// Measure page load time
export function measurePageLoad() {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log('Performance Metrics:', {
        pageLoadTime: `${pageLoadTime}ms`,
        connectTime: `${connectTime}ms`,
        renderTime: `${renderTime}ms`,
      });

      // Track to analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: 'load',
          value: pageLoadTime,
          event_category: 'Page Load',
        });
      }
    }, 0);
  });
}

// Cache API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function cachedFetch(url: string, options?: RequestInit) {
  const cacheKey = `${url}_${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(url, options);
  const data = await response.json();

  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

// Clear old cache entries
export function clearOldCache() {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}

// Prefetch links on hover
export function setupLinkPrefetch() {
  if (typeof window === 'undefined') return;

  const links = document.querySelectorAll('a[href^="/"]');
  
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    });
  });
}

// Optimize images (convert to WebP if supported)
export function getOptimizedImageUrl(src: string, width?: number): string {
  if (!src) return '';
  
  // If already using figma:asset or external URL, return as-is
  if (src.startsWith('figma:') || src.startsWith('http')) {
    return src;
  }

  const supportsWebP = typeof window !== 'undefined' 
    && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  if (supportsWebP && !src.endsWith('.svg')) {
    const extension = src.split('.').pop();
    const basePath = src.replace(`.${extension}`, '');
    return `${basePath}.webp${width ? `?w=${width}` : ''}`;
  }

  return src;
}

// Intersection Observer for animations
export function observeAnimations() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}
