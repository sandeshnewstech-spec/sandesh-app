import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { ApiCallType, ApiResType, } from '../types';
import { isErr } from '../functions';
import useZuStore from '../store/useZuStore';
import { isIOS } from '../utils';

const useAPIsHook = () => {

  const isFocused = useIsFocused();
  const { abort, signal } = new AbortController();
  const { } = useZuStore();

  const headR = (token?: string, urlencoded?: boolean, multipart?: boolean, shopifyXToken?: string) => {

    var Header = new Headers();
    token && Header.append("Authorization", `Bearer ${token}`);
    // Header.append("Accept", "application/json");

    if (multipart) Header.append("Content-Type", "multipart/form-data");
    else Header.append("Content-Type", urlencoded ? "application/x-www-form-urlencoded" : "application/json");

    if (shopifyXToken) {
      Header.append("Content-Type", "application/json");
      Header.append("Accept-Language", "en");
      Header.append("X-Shopify-Storefront-Access-Token", shopifyXToken);
    }
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
    multipart, apiURI, shopifyXToken }: ApiCallType): Promise<ApiResType> {

    const url = ((apiURI || "") + (endPath || "")) + (params ? `${'?' + params}` : '');

    try {

      let raw = {
        method, signal,
        headers: headR(token, urlencoded, multipart, shopifyXToken),
        body: urlencoded ? body : JSON.stringify(body),
      };
      if (body) raw["body"] = urlencoded ? JSON.stringify(body) : body;

      let resJSON;

      // console.log(`headR:::`, isIOS, "::", raw?.headers);
      // console.log(`resBODY:::`, isIOS, "::", endPath, "::", "body::", JSON.stringify(body, null, 5), "\n", "params::", params);

      // console.log("uri::", url);

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
      console.log(`Error:: ${isIOS} :: ${url} ::: `, err);
      return { code: 404, res: undefined, url: "", status: false, err: true, message: err?.message };
    }
  }

  // async function fetchREQ({
  //   body, token, method = 'POST', headers,
  //   endPoint, params, multipart, cBaseURI,
  //   isFormData, urlencoded,
  //   toTEXT = false, toJSON = true, isAdminAPI = false,
  // }: ApiCallType): Promise<ApiResType> {
  //   try {
  //     let raw: { [key: string]: any } = { method: method };
  //     if (headers) raw['headers'] = headRR(headers);
  //     if (body) raw['body'] = body;

  //     const url = (cBaseURI ? cBaseURI : (_store_api_url)) + (endPoint ? endPoint : "") + (params ? `${'?' + params}` : '');

  //     console.log("raw[header]::", raw?.headers);
  //     // console.log("raw::", JSON.stringify(raw, null, 2));
  //     // console.log("url::", JSON.stringify(url, null, 2),
  //     //   "\n cBaseURI::", cBaseURI,
  //     //   "\n endPoint::", endPoint,
  //     //   "\n isAdminAPI::", isAdminAPI,
  //     // );

  //     let res: any = await fetch(url, raw);
  //     // console.log("fetchREQ::", "url::", JSON.stringify(url, null, 2), "raw::", JSON.stringify(url, null, 2));
  //     // console.log("fetchREQ::", JSON.stringify(res, null, 2));
  //     // console.log("toText()::", JSON.stringify(await res.text(), null, 2));
  //     let resTJ = toTEXT ? await res?.text() : (toJSON ? await res?.json() : res);

  //     return {
  //       url: res?.url,
  //       apiStatusCode: res?.status,
  //       err: res?.status === 200 ? false : true,
  //       res: resTJ, // converted or simple api response
  //       message: resTJ?.message || "", // if api return any message
  //     };
  //   } catch (err: any) {
  //     console.log(`Error:: ${isIOS} :: ${endPoint} ::: `, err);
  //     return { apiStatusCode: 404, res: undefined, url: endPoint ?? "", err: true, message: err?.message };
  //   }
  // }

  // async function docUploadInKSServerAPI(uploadingImages: Array<string> = [], deleteImages: Array<string> = []) {
  //   return fetchREQ({
  //     apiURI: ksBucketURL, urlencoded: true,
  //     body: { uploadingImages, deleteImages },
  //   });
  // }

  function abortAPI() { try { abort(); } catch (e) { /* LOG(e, "ERROR :: abortAPI =>>"); */ } }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { runOnJS(abortAPI)(); return false; });
    return () => { abortAPI(); backHandler.remove(); }
  }, []);
  useEffect(() => { if (!isFocused) runOnJS(abortAPI)(); }, [isFocused]);

  return {
    abortAPI,
  };

}

export default useAPIsHook