import { useEffect } from 'react'
import useZuStore from 'store/useZuStore'
import { useAPIs } from 'hooks';
import { appServicesType } from 'types';

const useInitHook = () => {
    const { setIsAppStartFlow, setAppServices, setPosts } = useZuStore();
    const { getSettingAPI, BASE_URL } = useAPIs();

    const bulkAPICalling = async () => {
        // setPosts({});
        const tempOBJ: appServicesType = {};
        tempOBJ['appLogo'] = "https://s3-symbol-logo.tradingview.com/sandesh-ltd--600.png";

        const promise1 = Promise.all([getSettingAPI()])
        promise1.then((allRES) => {
            const resSettings: any = allRES[0]?.res;
            if (resSettings?.data) {
                tempOBJ['assetURL'] = resSettings?.data[21]?.value;
                tempOBJ['liveStreamYoutubeId'] = resSettings?.data[57]?.value;
                tempOBJ['baseURL'] = BASE_URL;
            }
            // setIsAppStartFlow(true);
            setAppServices(tempOBJ);
        })

    }

    useEffect(() => {
        bulkAPICalling();
        // setIsAppStartFlow(true);
    }, []);
    return ({})
}

export default useInitHook