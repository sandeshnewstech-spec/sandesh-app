import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { ApiCallType, ApiResType, } from '../types';
import { isErr } from '../functions';
import useZuStore from '../store/useZuStore';
import { useMMKVStore } from '.';

const useAPIsHook = () => {

  const isFocused = useIsFocused();
  const { setToast } = useMMKVStore();
  const { abort, signal } = new AbortController();
  const { } = useZuStore();

  const headR = (token?: string, urlencoded?: boolean, multipart?: boolean) => {

    var Header = new Headers();
    // token && Header.append("Authorization", `Bearer ${token}`);
    token && Header.append("Authorization", `${token}`);
    // Header.append("Accept", "application/json");

    if (multipart) Header.append("Content-Type", "multipart/form-data");
    else Header.append("Content-Type", urlencoded ? "application/x-www-form-urlencoded" : "application/json");
    return Header;
  };

  /**
   * @param props.endPath for api end path
   * @param props.body for parms to send to the server
   * @param props.isFormData check params is passed or not
   * @param props.toText for get return responce on toText() 
   * @param props.token for token passed
   * @param props.method for api method like POST or PUT or PATCH or DELETE or PATCH
   * Todo return response is based on api response
   * Todo return response is as a Object.
   */
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
      // console.log(`res:::`, isIOS, "::", endPath, "::", await res?.text(), JSON.stringify(res, null, 5));

      if (res !== undefined && (res.status === 200 || res.status === 202)) resJSON = toText ? await res?.text() : await res?.json();
      else resJSON = toText ? await res?.text() : await res?.json();
      // console.log(`res:::`, isIOS, "::", endPath, "::", JSON.stringify(res, null, 5));
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

  // async function getVideoListAPI(pageNO = 1) {
  //   return fetchREQ({
  //     apiURI: `https://api.pexels.com/videos/search?query=nature&per_page=${pageNO}`,
  //     method: 'GET',
  //     token: "jb14cKNctP4fR0c9SbI696b2nel6Mlj700RQJNQBbcfemp7xzCZIPbTa",
  //   });
  // }

  function abortAPI() { try { abort(); } catch (e) { /* LOG(e, "ERROR :: abortAPI =>>"); */ } }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { runOnJS(abortAPI)(); return false; });
    return () => { abortAPI(); backHandler.remove(); }
  }, []);
  useEffect(() => { if (!isFocused) runOnJS(abortAPI)(); }, [isFocused]);

  return {
    abortAPI
  };

}

export default useAPIsHook