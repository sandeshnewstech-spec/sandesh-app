import { useState, useCallback, useEffect, useRef } from 'react';
import { createMMKV } from 'react-native-mmkv';
import { WebViewMessageEvent } from 'react-native-webview';

interface CacheData {
  html: string;
  timestamp: number;
  loadTime: number;
  resourceCount: number;
  url: string;
}

interface CacheStats {
  count: number;
  size: string;
}

interface UseWebViewCacheProps {
  url: string;
  cacheExpiry?: number; // in milliseconds, default 1 hour
  storageId?: string;
  cacheEnabled?: boolean;
}

interface UseWebViewCacheReturn {
  cachedContent: string | null;
  cacheHit: boolean;
  loadTime: number;
  cacheStats: CacheStats;
  handleMessage: (event: WebViewMessageEvent) => void;
  clearCache: () => number;
  getCacheInfo: () => any;
  updateCacheStats: () => any;
}

// Initialize MMKV storage
const storage = createMMKV({
  id: 'webview-turbo-cache',
});

const useWebCacheHook = ({
  url, cacheEnabled = true,
  cacheExpiry = 3600000 * 24, // 1 hour default
  storageId = '@webviewxcompo',
}: UseWebViewCacheProps): UseWebViewCacheReturn => {
  const [cachedContent, setCachedContent] = useState<string | null>(null);
  const [cacheHit, setCacheHit] = useState(false);
  const [loadTime, setLoadTime] = useState<number>(0);
  const [cacheStats, setCacheStats] = useState<CacheStats>({ count: 0, size: '0 MB' });

  // Generate cache key from URL
  const getCacheKey = useCallback((url: string): string => {
    const normalized = url?.replace(/[^a-zA-Z0-9]/g, '_');
    return `${storageId}_cache_${normalized}`;
  }, [storageId]);

  // Load from MMKV cache
  const loadFromCache = useCallback(() => {

    // Skip if cache is disabled
    if (!cacheEnabled) { return; }

    try {
      const cacheKey = getCacheKey(url);
      const cachedDataString = storage?.getString(cacheKey);

      if (cachedDataString) {
        const parsed: CacheData = JSON.parse(cachedDataString);
        const age = Date.now() - parsed.timestamp;

        // Use cache if within expiry time
        if (age < cacheExpiry) {
          setCachedContent(parsed.html);
          setCacheHit(true);
          setLoadTime(parsed.loadTime);

          console.log(`⚡ CACHE HIT! Loaded in <1ms (Original: ${parsed.loadTime.toFixed(2)}ms)`);
          console.log(`📦 Cache age: ${(age / 1000 / 60).toFixed(1)} minutes`);

          return true;
        } else {
          // Cache expired, delete it
          storage?.remove(cacheKey);
          console.log('🗑️ Cache expired and deleted');
        }
      }
    } catch (error) {
      console.error('❌ Cache load error:', error);
    }
    return false;
  }, [url, cacheExpiry, getCacheKey, cacheEnabled]);

  // Update cache statistics
  const updateCacheStats = useCallback(() => {
    try {
      const allKeys = storage?.getAllKeys();
      const cacheKeys = allKeys?.filter(key => key.includes('_cache_'));

      let totalSize = 0;
      cacheKeys?.forEach(key => {
        const data = storage?.getString(key);
        if (data) {
          totalSize += data?.length;
        }
      });

      setCacheStats({
        count: cacheKeys?.length,
        size: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
      });
    } catch (error) {
      console.error('Stats error:', error);
    }
  }, []);

  // Handle WebView messages
  const handleMessage = useCallback((event: WebViewMessageEvent) => {

    // Skip if cache is disabled
    if (!cacheEnabled) { return; }

    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data?.type === 'cacheReady') {
        const cacheData: CacheData = {
          html: data?.html,
          timestamp: data?.timestamp,
          loadTime: data?.loadTime,
          resourceCount: data?.resourceCount,
          url: data?.url,
        };

        const cacheKey = getCacheKey(data?.url);
        storage?.set(cacheKey, JSON.stringify(cacheData));

        console.log(`✅ Cached to MMKV: ${data?.url}`);
        console.log(`📊 Load Time: ${data?.loadTime.toFixed(2)}ms`);
        console.log(`📦 Resources: ${data?.resourceCount} (${data?.fastResources} fast, ${data?.slowResources} slow)`);

        updateCacheStats();
      }
    } catch (error) {
      console.error('❌ Message handling error:', error);
    }
  }, [getCacheKey, updateCacheStats, cacheEnabled]);

  // Clear all cached pages
  const clearCache = useCallback((): number => {
    try {
      const allKeys = storage?.getAllKeys();
      const cacheKeys = allKeys?.filter(key => key.includes(`${storageId}_cache_`));

      cacheKeys?.forEach(key => storage?.remove(key));

      console.log(`🗑️ Cleared ${cacheKeys?.length} cached pages`);
      updateCacheStats();
      return cacheKeys?.length;
    } catch (error) {
      console.error('Error clearing cache:', error);
      return 0;
    }
  }, [storageId, updateCacheStats]);

  // Get detailed cache information
  const getCacheInfo = useCallback(() => {
    try {
      const allKeys = storage?.getAllKeys();
      const cacheKeys = allKeys?.filter(key => key.includes(`${storageId}_cache_`));

      let totalSize = 0;
      const cacheDetails: Array<{ url: string; size: number; age: number }> = [];

      cacheKeys?.forEach(key => {
        const data = storage?.getString(key);
        if (data) {
          const size = data?.length;
          totalSize += size;

          try {
            const parsed: CacheData = JSON.parse(data);
            cacheDetails.push({
              url: parsed.url,
              size: size,
              age: Date.now() - parsed.timestamp,
            });
          } catch (e) { }
        }
      });

      return {
        count: cacheKeys?.length,
        totalSizeBytes: totalSize,
        totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
        averageSizeKB: cacheKeys?.length > 0 ? (totalSize / cacheKeys?.length / 1024).toFixed(2) : '0',
        details: cacheDetails,
      };
    } catch (error) {
      console.error('Error getting cache info:', error);
      return { count: 0, totalSizeBytes: 0, totalSizeMB: '0', averageSizeKB: '0', details: [] };
    }
  }, [storageId]);

  // Load cache on mount and when URL changes
  useEffect(() => {
    loadFromCache();
    updateCacheStats();
  }, [url, loadFromCache, updateCacheStats]);

  return {
    cachedContent,
    cacheHit,
    loadTime,
    cacheStats,
    handleMessage,
    clearCache,
    getCacheInfo,
    updateCacheStats
  };
};

export default useWebCacheHook

// Utility function to recrypt cache
export const recryptCache = (newKey?: string): void => {
  try {
    storage?.recrypt(newKey);
    console.log(newKey ? '🔐 Cache encrypted' : '🔓 Encryption removed');
  } catch (error) {
    console.error('Recrypt error:', error);
  }
};