import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import WebView, { } from 'react-native-webview';
import { CUSTOM_USER_AGENT, isIOS } from 'utils';
import { useThemeX, useWebCache } from 'hooks';
import { OnShouldStartLoadWithRequest, WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';

interface WebViewXCompoProps {
  url: string;
  onLoadComplete?: () => void;
  cacheExpiry?: number; // in milliseconds, default 1 hour
  storageId?: string; // custom storage ID for isolated caching
  originWhitelist?: string[];
  setLoading?: (i: boolean) => void;
  cacheEnabled?: boolean;
  headers?: Object;
  onShouldStartLoadWithRequest?: OnShouldStartLoadWithRequest;
}

const WebViewXCompo: React.FC<WebViewXCompoProps> = ({
  url, onLoadComplete, cacheExpiry = 3600000, storageId = '@webviewxcompo',
  originWhitelist, setLoading = () => { }, cacheEnabled = true, headers,
  onShouldStartLoadWithRequest
}) => {

  const {
    cachedContent, cacheHit, loadTime, cacheStats, handleMessage,
    updateCacheStats, } = useWebCache({
      url, cacheExpiry, storageId, cacheEnabled,
    });

  const { col } = useThemeX();
  const webViewRef = useRef<WebView>(null);
  //   try {
  //     const allKeys = storage.getAllKeys();
  //     const cacheKeys = allKeys.filter(key => key.includes('_cache_'));

  //     let totalSize = 0;
  //     cacheKeys.forEach(key => {
  //       const data = storage.getString(key);
  //       if (data) {
  //         totalSize += data.length;
  //       }
  //     });

  //     setCacheStats({
  //       count: cacheKeys.length,
  //       size: `${(totalSize / 1024 / 1024).toFixed(2)} MB`
  //     });
  //   } catch (error) {
  //     console.error('Stats error:', error);
  //   }
  // }, []);

  const handleLoadEnd = useCallback(() => {
    setLoadingHere(false);
    onLoadComplete?.();
    updateCacheStats();
  }, [onLoadComplete, updateCacheStats]);

  const handleLoadStart = useCallback(() => {
    if (!cacheHit) {
      setLoadingHere(true);
    }
  }, [cacheHit]);

  const setLoadingHere = (change: boolean) => {
    setLoading(change);
  }

  return (<View style={styles.container}>
    <WebView
      ref={webViewRef}
      source={
        cachedContent
          ? { html: cachedContent, baseUrl: url, headers }
          : { uri: url, headers }
      }
      containerStyle={{ backgroundColor: col.TRANSPARENT }}
      style={[{ flex: 1, backgroundColor: col.TRANSPARENT }]}
      onMessage={handleMessage}
      onLoadEnd={handleLoadEnd}
      onLoadStart={handleLoadStart}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      // injectedJavaScript={turboBoostScript}
      // ============ MAXIMUM PERFORMANCE CONFIG ============
      cacheEnabled={cacheEnabled}
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      domStorageEnabled={true}
      javaScriptEnabled={true}
      allowsBackForwardNavigationGestures={true}
      // decelerationRate="normal" // this is cresh issue
      incognito={false}
      thirdPartyCookiesEnabled={true}
      sharedCookiesEnabled={true}
      startInLoadingState={false}
      androidLayerType="hardware"
      // androidHardwareAccelerationDisabled={false}
      renderToHardwareTextureAndroid
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      mixedContentMode="always"
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      scalesPageToFit={true}
      {...(isIOS && {
        allowsLinkPreview: true,
        dataDetectorTypes: 'none', // Faster rendering
      })}
      originWhitelist={originWhitelist}
      userAgent={CUSTOM_USER_AGENT}
    />

    {/* Cache Hit Indicator */}
    {cacheHit && (
      <View style={styles.cacheIndicator}>
        <Text style={styles.cacheText}>⚡ MMKV</Text>
        <Text style={styles.cacheSubtext}>
          {loadTime > 1000
            ? `${(loadTime / 1000).toFixed(1)}s original`
            : `${loadTime.toFixed(0)}ms original`}
        </Text>
      </View>
    )}

    {/* Cache Stats Badge */}
    {cacheStats.count > 0 && (
      <View style={styles.statsIndicator}>
        <Text style={styles.statsText}>
          📦 {cacheStats.count} pages • {cacheStats.size}
        </Text>
      </View>
    )}
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cacheIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#00ff00',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 8,
  },
  cacheText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cacheSubtext: {
    color: '#000',
    fontSize: 9,
    marginTop: 2,
    opacity: 0.7,
    fontWeight: '600',
  },
  statsIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#00ff0040',
  },
  statsText: {
    color: '#00ff00',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default WebViewXCompo;

// Ultra-aggressive performance injection script
const turboBoostScript = `
    (function() {
      const startTime = performance.now();
      
      // ============ FETCH CACHE INTERCEPTOR ============
      const fetchCache = new Map();
      const originalFetch = window.fetch;
      
      window.fetch = function(...args) {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url;
        const cacheKey = url.split('?')[0]; // Cache without query params
        
        if (fetchCache.has(cacheKey)) {
          console.log('⚡ Fetch cache hit:', cacheKey);
          return Promise.resolve(new Response(fetchCache.get(cacheKey)));
        }
        
        return originalFetch.apply(this, args).then(response => {
          if (response.ok) {
            const clone = response.clone();
            clone.text().then(text => {
              fetchCache.set(cacheKey, text);
            });
          }
          return response;
        }).catch(err => {
          console.error('Fetch error:', err);
          return Promise.reject(err);
        });
      };

      // ============ INTERSECTION OBSERVER FOR LAZY LOADING ============
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, { 
        rootMargin: '150px',
        threshold: 0.01 
      });

      // ============ DOM OPTIMIZATION ============
      const optimizeDOM = () => {
        // Lazy load images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.src && !img.complete && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E';
            imageObserver.observe(img);
          }
          // Add lazy loading attribute
          if (!img.loading) {
            img.loading = 'lazy';
          }
        });

        // Defer scripts
        document.querySelectorAll('script[src]:not([async]):not([defer])').forEach(script => {
          script.defer = true;
        });

        // Remove hidden content
        document.querySelectorAll('[style*="display: none"], [style*="display:none"], [hidden]').forEach(el => {
          el.remove();
        });

        // Remove tracking scripts and ads (optional aggressive optimization)
        document.querySelectorAll('[class*="ad-"], [id*="ad-"], [class*="advertisement"]').forEach(el => {
          el.remove();
        });
      };

      // ============ CSS OPTIMIZATION ============
      const optimizeCSS = () => {
        try {
          const sheets = Array.from(document.styleSheets);
          sheets.forEach(sheet => {
            try {
              // Temporarily disable non-critical stylesheets
              if (sheet.href && (
                sheet.href.includes('font') || 
                sheet.href.includes('icon') ||
                sheet.href.includes('animation')
              )) {
                sheet.disabled = true;
                setTimeout(() => { sheet.disabled = false; }, 200);
              }
            } catch(e) {
              // Cross-origin stylesheets may throw errors
            }
          });
        } catch(e) {}
      };

      // ============ RESOURCE PRECONNECTION ============
      const preconnectDomains = () => {
        const domains = new Set();
        const selectors = '[src], [href]';
        
        document.querySelectorAll(selectors).forEach(el => {
          try {
            const urlString = el.src || el.href;
            if (urlString) {
              const urlObj = new URL(urlString);
              if (urlObj.hostname !== window.location.hostname) {
                domains.add(urlObj.origin);
              }
            }
          } catch(e) {}
        });

        domains.forEach(domain => {
          if (document.querySelector(\`link[href="\${domain}"]\`)) return;
          
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });
      };

      // ============ HTML COMPRESSION ============
      const compressHTML = (html) => {
        return html
          .replace(/\\s{2,}/g, ' ')
          .replace(/<!--[\\s\\S]*?-->/g, '')
          .replace(/\\s*=\\s*/g, '=')
          .replace(/>\\s+</g, '><')
          .trim();
      };

      // ============ RESOURCE MONITORING ============
      const getResourceStats = () => {
        const resources = performance.getEntriesByType('resource');
        const total = resources.length;
        const slow = resources.filter(r => r.duration > 1000).length;
        const fast = resources.filter(r => r.duration < 100).length;
        
        return { total, slow, fast };
      };

      // ============ EXECUTE ON DOM READY ============
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          optimizeDOM();
          optimizeCSS();
          preconnectDomains();
        });
      } else {
        optimizeDOM();
        optimizeCSS();
        preconnectDomains();
      }

      // ============ SEND CACHE DATA ON LOAD ============
      window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        const stats = getResourceStats();
        const compressedHTML = compressHTML(document.documentElement.outerHTML);
        
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'cacheReady',
          url: window.location.href,
          html: compressedHTML,
          loadTime: loadTime,
          resourceCount: stats.total,
          slowResources: stats.slow,
          fastResources: stats.fast,
          timestamp: Date.now()
        }));

        console.log(\`⚡ Page loaded: \${loadTime.toFixed(2)}ms | Resources: \${stats.total} (\${stats.fast} fast, \${stats.slow} slow)\`);
      });

      // ============ PERIODIC CACHE CLEANUP ============
      setInterval(() => {
        if (fetchCache.size > 300) {
          const toRemove = Array.from(fetchCache.keys()).slice(0, 100);
          toRemove.forEach(key => fetchCache.delete(key));
          console.log(\`🧹 Cleaned \${toRemove.length} cache entries\`);
        }
      }, 60000);

      // ============ PREFETCH VISIBLE LINKS ============
      const prefetchLinks = () => {
        const visibleLinks = Array.from(document.querySelectorAll('a[href]'))
          .filter(link => {
            const rect = link.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight;
          })
          .slice(0, 5); // Prefetch only first 5 visible links

        visibleLinks.forEach(link => {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = link.href;
          document.head.appendChild(prefetchLink);
        });
      };

      // Prefetch after initial load
      setTimeout(prefetchLinks, 1000);

    })();
    true;
  `;