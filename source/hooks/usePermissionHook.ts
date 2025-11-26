import { PermissionResultType, permissionsType, checkPermissionType } from '../Types';
import { Alert, Platform } from 'react-native';
import {
    RESULTS, check, request, Rationale, requestNotifications, openSettings
} from 'react-native-permissions';
import useString from '../language';

interface P { }

const usePermissionHook = ({ }: P) => {

    const _str = useString();
    const isAndroid = Platform.OS === 'android' ? true : false;

    type alertType = { title: string; message: string; };
    type alertOptionType = { U?: alertType; D?: alertType; L?: alertType; B?: alertType; };
    type checkingType = { result: PermissionResultType; } & checkPermissionType & alertOptionType;

    const Checking = ({ result, checkDENIED = true, checkLIMITED = true, checkUNAVAILABLE = true, B, D, L, U, }: checkingType): boolean => {

        switch (result) {
            case RESULTS.UNAVAILABLE: {
                if (!checkUNAVAILABLE) return true;
                Alert.alert(U?.title || "", U?.message || _str.PERMISSIONS_UNAVAILABLE_MSG, [{ text: _str.OKAY, style: 'cancel' }]);
                return true;
            }
            case RESULTS.DENIED: {
                if (!checkDENIED) return true;
                Alert.alert(D?.title || "", D?.message || _str.PERMISSIONS_DENIED_MSG,
                    [{ text: _str.OKAY, style: 'cancel' }, { text: _str.OPEN_SETTING, style: 'default', onPress: () => openSettings() },]);
                return false;
            }
            case RESULTS.LIMITED: {
                if (!checkLIMITED) return true;
                Alert.alert(L?.title || "", L?.message || _str.PERMISSIONS_LIMITED_MSG,
                    [{ text: _str.OKAY, style: 'cancel' }, { text: _str.OPEN_SETTING, style: 'default', onPress: () => openSettings() },]);
                return false;
            }
            case RESULTS.BLOCKED: {
                Alert.alert(B?.title || "", B?.message || _str.PERMISSIONS_BLOCKED_MSG,
                    [{ text: _str.OKAY, style: 'cancel' }, { text: _str.OPEN_SETTING, style: 'default', onPress: () => openSettings() },]);
                return false;
            }
            case RESULTS.GRANTED: return true;
            default: return false;
        }
    }

    const sCheck = (obj: permissionsType & alertOptionType): Promise<boolean> => {
        const { i, a } = obj;
        const permission = isAndroid ? a : i;
        console.log("PermissionType::", Platform.OS, permission);
        if (permission) {
            return new Promise((resolve, reject) => {
                check(permission)
                    .then((result) => {
                        resolve(Checking({ result, ...obj }));
                    }).catch((error) => { reject(false) });
            });
        }
        return new Promise(() => false);
    }

    const sRequest = (obj: permissionsType & alertOptionType): Promise<boolean> => {
        const { i, a, rationale } = obj
        const permission = isAndroid ? a : i;
        const Rationale: Rationale = {
            title: rationale?.title ?? "",
            message: rationale?.message ?? "",
            buttonPositive: rationale?.buttonPositive ?? "",
            buttonNegative: rationale?.buttonNegative ?? "",
        };
        if (permission) {
            return new Promise((resolve, reject) => {
                request(permission, (rationale?.message || rationale?.title) ? Rationale : undefined)
                    .then((result) => resolve(Checking({ result, ...obj })))
                    .catch(() => reject(false));
            });
        } else {
            return new Promise(() => false);
        }
    }

    async function checkNoticationPermission(obj?: alertOptionType) {
        return requestNotifications(['alert', 'sound', 'badge']).then(({ status, settings }) => {
            return Checking({ result: status, ...obj });
        });
    }

    return ({ sRequest, sCheck, checkNoticationPermission });
}

export default usePermissionHook