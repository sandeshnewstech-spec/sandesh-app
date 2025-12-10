// YouTube URL Parameters - Complete TypeScript Types

/**
 * Complete YouTube Player Parameters Type
 * All parameters are optional and have default values
 * 
 * @example
 * const params: YouTubeParamsType = {
 *   autoplay: 1,
 *   controls: 0,
 *   start: 30,
 *   end: 120,
 *   loop: 1,
 *   mute: 1
 * };
 */
export type YouTubeParamsType = {
    /**
     * Auto-start video playback when player loads
     * @default 0
     * @values 0 = disabled, 1 = enabled
     */
    autoplay?: 0 | 1;

    /**
     * Default caption language (ISO 639-1 two-letter code)
     * @example 'en', 'es', 'fr', 'de', 'ja', 'hi', 'ar'
     */
    cc_lang_pref?: string;

    /**
     * Force closed captions to display by default
     * @default 0
     * @values 0 = user preference, 1 = force captions on
     */
    cc_load_policy?: 0 | 1;

    /**
     * Progress bar highlight color
     * @default 'red'
     * @values 'red' | 'white'
     */
    color?: 'red' | 'white';

    /**
     * Display video player controls
     * @default 1
     * @values 0 = hide controls, 1 = show controls
     */
    controls?: 0 | 1;

    /**
     * Disable keyboard controls
     * @default 0
     * @values 0 = keyboard enabled, 1 = keyboard disabled
     * 
     * Keyboard controls:
     * - Spacebar/K: Play/Pause
     * - Arrow Left: -5 seconds
     * - Arrow Right: +5 seconds
     * - Arrow Up: Volume up
     * - Arrow Down: Volume down
     * - F: Fullscreen toggle
     * - J: -10 seconds
     * - L: +10 seconds
     * - M: Mute/Unmute
     * - 0-9: Jump to percentage (0=start, 5=50%, 9=90%)
     */
    disablekb?: 0 | 1;

    /**
     * Enable JavaScript API control via postMessage
     * Required for programmatic control (play, pause, etc.)
     * @default 0
     * @values 0 = disabled, 1 = enabled
     */
    enablejsapi?: 0 | 1;

    /**
     * Stop video at this time (seconds from start of video)
     * @example 120 = stop at 2 minutes
     * @example 90 = stop at 1:30
     */
    end?: number;

    /**
     * Show/hide fullscreen button
     * @default 1
     * @values 0 = hide button, 1 = show button
     */
    fs?: 0 | 1;

    /**
     * Player interface language (ISO 639-1 code or locale)
     * @example 'en', 'fr', 'ja', 'fr-ca', 'es-mx'
     */
    hl?: string;

    /**
     * Video annotations display policy
     * @default 1
     * @values 1 = show annotations, 3 = hide annotations
     */
    iv_load_policy?: 1 | 3;

    /**
     * Content identifier for playlist or user uploads
     * - For playlists: Use playlist ID with 'PL' prefix
     * - For user uploads: Use YouTube username
     * @example 'PLC77007E23FF423C6' (playlist)
     * @example 'googledevelopers' (user uploads)
     */
    list?: string;

    /**
     * Type of content to load with 'list' parameter
     * @values 'playlist' | 'user_uploads'
     */
    listType?: 'playlist' | 'user_uploads';

    /**
     * Loop video playback continuously
     * Note: For single video, must also set playlist parameter to same video ID
     * @default 0
     * @values 0 = no loop, 1 = loop enabled
     * @example { loop: 1, playlist: 'VIDEO_ID' }
     */
    loop?: 0 | 1;

    /**
     * Modest branding - DEPRECATED (no longer functional as of Aug 2023)
     * Player now automatically determines branding treatment
     * @deprecated
     */
    modestbranding?: 0 | 1;

    /**
     * Mute the video by default
     * @default 0
     * @values 0 = unmuted, 1 = muted
     */
    mute?: 0 | 1;

    /**
     * Origin domain for IFrame API security
     * Required when enablejsapi=1 for security
     * @example 'https://example.com'
     * @example 'https://myapp.com'
     */
    origin?: string;

    /**
     * Comma-separated list of video IDs to play after main video
     * First video is the one in URL, then plays playlist
     * @example 'VIDEO_ID_1,VIDEO_ID_2,VIDEO_ID_3'
     */
    playlist?: string;

    /**
     * Control video playback on iOS devices
     * @default 0
     * @values 0 = fullscreen playback, 1 = inline playback
     * 
     * For inline playback on iOS:
     * - Set playsinline=1
     * - WebView must have allowsInlineMediaPlayback=true
     */
    playsinline?: 0 | 1;

    /**
     * Related videos display policy
     * @default 1
     * @values 0 = show related from same channel only, 1 = show all related videos
     * 
     * Note: As of Sept 2018, you cannot fully disable related videos.
     * Setting to 0 only shows videos from the same channel.
     */
    rel?: 0 | 1;

    /**
     * Start video at this time (seconds from beginning)
     * Note: Player seeks to nearest keyframe (usually within ~2 seconds)
     * @example 30 = start at 30 seconds
     * @example 90 = start at 1:30
     * @example 150 = start at 2:30
     */
    start?: number;

    /**
     * Domain URL for YouTube Analytics when embedded in widgets
     * Used to identify actual traffic source vs widget provider
     * @example 'https://example.com'
     */
    widget_referrer?: string;
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * YouTube Video ID type (11 characters)
 * @example 'dQw4w9WgXcQ'
 */
export type YouTubeVideoId = string;

/**
 * YouTube Playlist ID type (starts with 'PL')
 * @example 'PLC77007E23FF423C6'
 */
export type YouTubePlaylistId = string;

/**
 * ISO 639-1 Language Code (2 letters)
 * @example 'en', 'es', 'fr', 'de', 'ja', 'zh', 'ar', 'hi'
 */
export type LanguageCode = string;

/**
 * Full locale string (language-region)
 * @example 'en-US', 'fr-CA', 'es-MX', 'zh-CN'
 */
export type LocaleCode = string;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Build YouTube embed URL with parameters
 * @param videoId - YouTube video ID
 * @param params - Optional player parameters
 * @returns Complete embed URL
 * 
 * @example
 * const url = buildYouTubeUrl('dQw4w9WgXcQ', {
 *   autoplay: 1,
 *   start: 30,
 *   controls: 0
 * });
 * // Returns: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=30&controls=0'
 */
export function buildYouTubeUrl(
    videoId: YouTubeVideoId,
    params?: YouTubeParamsType
): string {
    const baseUrl = `https://www.youtube.com/embed/${parseVideoId(videoId)}`;

    if (!params) return baseUrl;

    const queryParams: string[] = [];

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryParams.push(`${key}=${value}`);
        }
    });

    return queryParams.length > 0
        ? `${baseUrl}?${queryParams.join('&')}`
        : baseUrl;
}

/**
 * Build YouTube nocookie embed URL (privacy-enhanced mode)
 * No cookies stored until user plays video
 * @param videoId - YouTube video ID
 * @param params - Optional player parameters
 * @returns Privacy-enhanced embed URL
 * 
 * @example
 * const url = buildYouTubeNoCookieUrl('dQw4w9WgXcQ', { autoplay: 1 });
 * // Returns: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1'
 */
export function buildYouTubeNoCookieUrl(
    videoId: YouTubeVideoId,
    params?: YouTubeParamsType
): string {
    const url = buildYouTubeUrl(videoId, params);
    return url.replace('youtube.com', 'youtube-nocookie.com');
}

/**
 * Parse YouTube URL to extract video ID
 * @param url - YouTube URL (any format)
 * @returns Video ID or null if not found
 * 
 * @example
 * parseVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
 * // Returns: 'dQw4w9WgXcQ'
 * 
 * parseVideoId('https://youtu.be/dQw4w9WgXcQ');
 * // Returns: 'dQw4w9WgXcQ'
 */
export function parseVideoId(url: string): YouTubeVideoId {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }

    return "";
}

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Common preset configurations for different use cases
 */
export const YouTubePresets = {
    /**
     * Minimal player - No controls, no branding
     */
    minimal: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
    } as YouTubeParamsType,

    /**
     * Autoplay with mute (mobile-friendly)
     */
    autoplayMuted: {
        autoplay: 1,
        mute: 1,
        controls: 1,
    } as YouTubeParamsType,

    /**
     * Loop single video continuously
     */
    loop: (videoId: string) => ({
        loop: 1,
        playlist: videoId,
    } as YouTubeParamsType),

    /**
     * Privacy-enhanced (no cookies until play)
     * Use with buildYouTubeNoCookieUrl
     */
    privacy: {
        rel: 0,
        modestbranding: 1,
    } as YouTubeParamsType,

    /**
     * Background video (no controls, muted, looped)
     */
    background: (videoId: string) => ({
        autoplay: 1,
        mute: 1,
        controls: 0,
        loop: 1,
        playlist: videoId,
        fs: 0,
        iv_load_policy: 3,
    } as YouTubeParamsType),

    /**
     * React Native / Mobile optimized
     */
    mobile: {
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
    } as YouTubeParamsType,
} as const;

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if value is a valid YouTube video ID
 */
export function isValidVideoId(value: string): value is YouTubeVideoId {
    return /^[a-zA-Z0-9_-]{11}$/.test(value);
}

/**
 * Check if value is a valid playlist ID
 */
export function isValidPlaylistId(value: string): value is YouTubePlaylistId {
    return /^PL[a-zA-Z0-9_-]+$/.test(value);
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
// Example 1: Basic usage
const params: YouTubeParamsType = {
  autoplay: 1,
  start: 30,
  end: 120,
  controls: 0,
};

const url = buildYouTubeUrl('dQw4w9WgXcQ', params);
console.log(url);
// Output: https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=30&end=120&controls=0

// Example 2: Using presets
const backgroundUrl = buildYouTubeUrl(
  'dQw4w9WgXcQ',
  YouTubePresets.background('dQw4w9WgXcQ')
);

// Example 3: Privacy-enhanced mode
const privacyUrl = buildYouTubeNoCookieUrl('dQw4w9WgXcQ', {
  autoplay: 1,
  rel: 0,
});

// Example 4: React Native
const mobileParams: YouTubeParamsType = {
  ...YouTubePresets.mobile,
  autoplay: 1,
  controls: 1,
};

// Example 5: Parse video ID from URL
const videoId = parseVideoId('https://youtu.be/dQw4w9WgXcQ');
if (videoId) {
  const url = buildYouTubeUrl(videoId, { autoplay: 1 });
}
*/

export default YouTubeParamsType;