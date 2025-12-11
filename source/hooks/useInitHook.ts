import { useEffect } from 'react'
import useZuStore from 'store/useZuStore'
import { useAPIs } from 'hooks';
import { appServicesType } from 'types';

const useInitHook = () => {
    const { setIsAppStartFlow, setAppServices, setPosts } = useZuStore();
    const { getSettingAPI } = useAPIs();

    const bulkAPICalling = () => {
        // setPosts({});
        const tempOBJ: appServicesType = {};
        tempOBJ['appLogo'] = "https://s3-symbol-logo.tradingview.com/sandesh-ltd--600.png"

        getSettingAPI().then(({ res }) => {
            if (res?.data) {
                tempOBJ['assetURL'] = res?.data[21]?.value;
            }
        });

        // setIsAppStartFlow(true);
        setAppServices(tempOBJ);
    }

    useEffect(() => {
        bulkAPICalling();
        // setIsAppStartFlow(true);
    }, []);
    return ({})
}

export default useInitHook