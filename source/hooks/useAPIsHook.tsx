import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { ApiCallType, ApiResType, } from '../types';
import { isErr } from '../functions';
import useZuStore from '../store/useZuStore';
import { useMMKVStore } from '.';
import { API_END_POINTS } from 'utils';

const useAPIsHook = () => {

  const isFocused = useIsFocused();
  const { setToast } = useMMKVStore();
  const { abort, signal } = new AbortController();
  const { } = useZuStore();

  const BASE_URL = "https://mapi.sandesh.com";
  const API_V = "v1";
  const FINAL_BASE_URL = `${BASE_URL}/mobile/api/${API_V}/`;

  const headR = (token?: string, urlencoded?: boolean, multipart?: boolean) => {

    var Header = new Headers();
    // token && Header.append("Authorization", `Bearer ${token}`);
    token && Header.append("Authorization", `${token}`);
    // Header.append("Accept", "application/json");

    if (multipart) Header.append("Content-Type", "multipart/form-data");
    else Header.append("Content-Type", urlencoded ? "application/x-www-form-urlencoded" : "application/json");
    return Header;
  };

  async function fetchREQ({ endPath, body, toText, token, method = 'POST', urlencoded = false, params,
    multipart, apiURI }: ApiCallType): Promise<ApiResType> {

    const url = ((apiURI || "") + (endPath || "")) + (params ? `${'?' + params}` : '');

    try {

      let raw = {
        method: method,
        headers: headR(token, urlencoded, multipart),
        body: urlencoded ? body : JSON.stringify(body),
      };
      if (body) raw["body"] = urlencoded ? JSON.stringify(body) : body;

      let resJSON;

      let res: any = await fetch(url, raw);
      // console.log(`res:::`, Platform.OS, "::", url);

      if (res !== undefined && (res.status === 200 || res.status === 202)) resJSON = toText ? await res?.text() : await res?.json();
      else resJSON = toText ? await res?.text() : await res?.json();
      console.log(`responce:::`, Platform.OS, "::", url, ":::", resJSON);
      // console.log(`resJSON:::`, isIOS, "::", endPath, "::", JSON.stringify(resJSON, null, 5));

      return {
        code: res?.status,
        res: resJSON,
        url: res?.url,
        status: resJSON?.statusCode || 0,
        message: resJSON?.message || "",
        err: isErr(res?.status),
      };

    } catch (err: any) {
      console.log(`Error:: PlatForm-${Platform.OS} :: ${url} ::: `, err);
      setToast({ show: true, msg: String(err) });
      return { code: 404, res: undefined, url: "", status: false, err: true, message: err?.message };
    }
  }

  async function getHomeSecondaryDataAPI() {
    return fetchREQ({
      method: 'GET',
      apiURI: FINAL_BASE_URL,
      endPath: API_END_POINTS.homeSecondary,
    });
  }

  async function getHomeTopMenuAPI() {
    return fetchREQ({
      method: 'GET',
      apiURI: FINAL_BASE_URL,
      endPath: API_END_POINTS.homeTopMenu,
    });
  }

  async function getVideosAPI(pageNo = 1, numberOfItems = 20) {
    return fetchREQ({
      method: 'GET',
      apiURI: FINAL_BASE_URL,
      endPath: API_END_POINTS.videos,
      params: `limit=${numberOfItems}&page=${pageNo}`
    });
  }

  async function getSettingAPI() {
    return fetchREQ({
      method: 'GET',
      apiURI: FINAL_BASE_URL,
      endPath: API_END_POINTS.setting,
    });
  }

  async function getPostDetailsAPI(url: string) {
    return fetchREQ({
      method: 'POST',
      apiURI: FINAL_BASE_URL,
      endPath: API_END_POINTS.setting,
      body: { url: url, platform: Platform.OS }
    });
  }

  async function getHomePageWebStoryAPI() {
    return fetchREQ({
      method: 'GET',
      apiURI: FINAL_BASE_URL,
      endPath: API_END_POINTS.homePageWebStory,
    });
  }

  function abortAPI() { try { abort(); } catch (e) { /* LOG(e, "ERROR :: abortAPI =>>"); */ } }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { runOnJS(abortAPI)(); return false; });
    return () => { abortAPI(); backHandler.remove(); }
  }, []);
  useEffect(() => { if (!isFocused) runOnJS(abortAPI)(); }, [isFocused]);

  return {
    abortAPI, getHomeSecondaryDataAPI, getHomeTopMenuAPI, getVideosAPI,
    getSettingAPI, getPostDetailsAPI, getHomePageWebStoryAPI, BASE_URL
  };

}

export default useAPIsHook