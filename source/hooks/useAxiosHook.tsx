import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isErr } from '../functions';
import useZuStore from '../store/useZuStore';
import { useMMKVStore } from '.';
import { API_END_POINTS } from 'utils';

export type ApiCallType = {
    endPath?: string;
    body?: any | FormData;
    token?: string;
    urlencoded?: boolean;
    isFormData?: boolean;
    multipart?: boolean;
    toText?: boolean;
    method?: 'POST' | 'PUT' | 'GET';
    params?: string;
    apiURI?: string;
}

export type ApiResType = {
    code: number;
    res: any;
    url: string;
    status: boolean;
    err: boolean;
    message: string;
    setProgress?: (i: number) => void;
}

const useAxiosHook = () => {

    const isFocused = useIsFocused();
    const { setToast } = useMMKVStore();
    const abortController = new AbortController();
    const { } = useZuStore();

    const BASE_URL = "https://mapi.sandesh.com";
    const API_V = "v1";
    const FINAL_BASE_URL = `${BASE_URL}/mobile/api/${API_V}/`;

    // Create axios instance with default config
    const axiosInstance = axios.create({
        baseURL: FINAL_BASE_URL,
        timeout: 30000, // 30 seconds
    });

    // Helper function to build headers
    const buildHeaders = (token?: string, urlencoded?: boolean, multipart?: boolean) => {
        const headers: Record<string, string> = {};

        if (token) {
            headers['Authorization'] = token;
        }

        if (multipart) {
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            headers['Content-Type'] = urlencoded
                ? 'application/x-www-form-urlencoded'
                : 'application/json';
        }

        return headers;
    };

    // Main API request function using Axios
    async function axiosREQ({
        endPath,
        body,
        toText,
        token,
        method = 'POST',
        urlencoded = false,
        params,
        multipart,
        apiURI
    }: ApiCallType): Promise<ApiResType> {

        const url = (apiURI || FINAL_BASE_URL) + (endPath || "");

        try {
            const config: AxiosRequestConfig = {
                method: method,
                url: url,
                headers: buildHeaders(token, urlencoded, multipart),
                signal: abortController.signal,
            };

            // Add params if provided
            if (params) {
                config.params = params;
            }

            // Add body if provided
            if (body) {
                if (urlencoded) {
                    // For urlencoded, convert object to URLSearchParams
                    config.data = new URLSearchParams(body as any).toString();
                } else if (multipart) {
                    // For multipart, body should already be FormData
                    config.data = body;
                } else {
                    // For JSON, send as is
                    config.data = body;
                }
            }

            // Make the request
            const response: AxiosResponse = await axiosInstance.request(config);
            // Handle response based on toText flag
            const resData = toText ? JSON.stringify(response?.data) : response?.data;
            return {
                code: response?.status,
                res: resData,
                url: response?.config?.url || url,
                status: resData?.statusCode || response?.status,
                message: resData?.message || "",
                err: isErr(response?.status),
            };

        } catch (err: any) {
            const axiosError = err as AxiosError;
            if (!axios.isCancel(axiosError)) {
                setToast({ show: true, msg: axiosError.message || String(err) });
            }
            return {
                code: axiosError.response?.status || 404,
                res: axiosError.response?.data,
                url: url,
                status: false,
                err: true,
                message: axiosError.message || "Request failed"
            };
        }
    }

    // API Methods
    async function getHomeSecondaryDataAPI() {
        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.homeSecondary,
        });
    }

    async function getHomeTopMenuAPI() {
        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.homeTopMenu,
        });
    }

    async function getVideosAPI(pageNo = 1, numberOfItems = 20) {
        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.videos,
            params: `limit=${numberOfItems}&page=${pageNo}`
        });
    }

    async function getSettingAPI() {
        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.setting,
        });
    }

    async function getPostDetailsAPI(url: string) {
        return axiosREQ({
            method: 'POST',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.setting,
            body: { url: url, platform: Platform.OS }
        });
    }

    async function getHomePageWebStoryAPI() {
        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.homePageWebStory,
        });
    }

    async function getLatestWebStoriesAPI({
        start = 0,
        limit = 50,
        category_name
    }: {
        start: number;
        limit: number;
        category_name?: string
    }) {
        let params = `start=${start}&limit=${limit}`;
        if (category_name) params = params + `&category_name=${category_name}`;

        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: API_END_POINTS.latestWebStories,
            params: params,
        });
    }

    async function getCategoryListAPI({
        start = 0,
        limit = 50,
        category_name
    }: {
        start: number;
        limit: number;
        category_name?: string
    }) {
        return axiosREQ({
            method: 'GET',
            apiURI: FINAL_BASE_URL,
            endPath: `${API_END_POINTS.getCategoryList}/${category_name}`,
            params: `start=${start}&limit=${limit}`,
        });
    }

    // Abort API calls
    function abortAPI() {
        try {
            abortController.abort();
        } catch (e) {
            /* LOG(e, "ERROR :: abortAPI =>"); */
        }
    }

    // Cleanup on unmount and back press
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            runOnJS(abortAPI)();
            return false;
        });
        return () => {
            abortAPI();
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        if (!isFocused) runOnJS(abortAPI)();
    }, [isFocused]);

    return {
        // Core methods
        axiosREQ,
        abortAPI,

        // API methods
        getHomeSecondaryDataAPI,
        getHomeTopMenuAPI,
        getVideosAPI,
        getSettingAPI,
        getPostDetailsAPI,
        getHomePageWebStoryAPI,
        getLatestWebStoriesAPI,
        getCategoryListAPI,

        // Config
        BASE_URL,
        FINAL_BASE_URL,
        axiosInstance, // Export instance for advanced use cases
    };

};

export default useAxiosHook;
