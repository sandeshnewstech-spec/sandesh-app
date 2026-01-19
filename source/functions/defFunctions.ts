import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { _isDEV, _isPUBLISH_MODE } from "../utils";
import { allTypesOfPostOBJType, allTypesOfPostItemType, postDetailTopTenNewsType } from "types";
import Clipboard from '@react-native-clipboard/clipboard';

export const _HEIGHT = Dimensions.get('window').height;
export const _WIDTH = Dimensions.get('window').width;

export const Size = (num: number) => RFValue(num, _HEIGHT);

export const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const isUrl = (urlString: string): boolean => {
    try {
        const newUrl = new URL(urlString);
        return (Boolean(newUrl) && String(newUrl)?.includes('http:') || String(newUrl)?.includes('https:')) || isValidUrl(urlString);
    }
    catch (e) {
        return false;
    }
}

export const decimal = (noS: string): number => {
    let val = parseFloat(noS);
    return parseFloat(val.toFixed(2));
};

export function generateUniqueID(uniqueKey: string | number = "") {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number (0-9999)
    const uniqueID = `${String(uniqueKey)}_${timestamp}_${randomNum}`;
    return uniqueID;
}

export const isErr = (e: number) => {
    switch (e) {
        case 400: return true;
        case 404: return true;
        default: return false;
    }
}

export const regex = {
    email: (str: string) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(str),
    phone: (str: string) => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/).test(str),
    seRMV: (str?: string): string => (str ?? "")?.replace(/[\s\r\n]+/g, '').trim(), // space or enter removed,
    forCHAT: (str?: string): string => (str ?? "")?.replace(/(\s|\n){3}$/, '  ').trim(), // space or enter removed,
}

export const isValid = {
    isEmailAddress: function (str: string) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: function (str: string) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: function (str: string) {
        var pattern = /^\d+\.?\d*$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame: function (str1: string, str2: string) {
        return str1 === str2;
    },
    // isValidNumber: ({ max = 999999999, min = 0, text = '' }: { max?: number, min?: number, text: string }) => {
    //     const pattern = new RegExp(`^[0-9]{${min},${max}}$`);
    //     return pattern.test(text);
    // }
};

export function deepClone<T>(arr: T[]): T[] /* | any[] */ {
    return arr.map((item) => {
        if (Array.isArray(item)) {
            return deepClone(item); // Recursively clone nested arrays
        } else if (typeof item === 'object' && item !== null) {
            // return { ...item }; // Shallow clone objects
            return JSON.parse(JSON.stringify(item)); // Deep clone objects
        } else {
            return item; // Non-array, non-object elements can be directly copied
        }
    });
};

export const pLOG = (label = "label", data: any = [], type: 'l' | 'w' | 'e' = 'l') => {
    if (_isPUBLISH_MODE || !_isDEV) return;
    let iDX = 1;
    if (type == 'l') if (Array.isArray(data)) for (const item of data) { console.log(label || "log", "::", iDX, "::", item); iDX++; } else console.log(label || "log", ":::", data);
    if (type == 'w') if (Array.isArray(data)) for (const item of data) { console.warn(label || "warn", "::", iDX, "::", item); iDX++; } else console.warn(label || "warn", ":::", data);
    if (type == 'e') if (Array.isArray(data)) for (const item of data) { console.error(label || "error", "::", iDX, "::", item); iDX++; } else console.error(label || "error", ":::", JSON.stringify(data, null, 2));
}

export const formatDurationFN = (secondsInput: number) => {
    `worklet`
    // Convert input to integer to avoid floating-point issues
    const seconds = Math.floor(secondsInput);

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemaining = seconds % 60;

    // return `${hours > 0 ? `${hours}:` : ''}${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
};

export const updateOBJFN = (state: { [key: string]: any } = {}, updatedState: { [key: string]: any }): { obj: { [key: string]: any }, IDs: Array<string> } => {
    `worklet`
    const tempOBJ: { [key: string]: any } = state;
    const tempIDs: Array<string> = [];
    for (let item of (Array.isArray(updatedState) ? updatedState : Object.values(updatedState))) {
        const ID = item?.id;
        if (!ID) continue;
        tempIDs.push(ID);
        if (state[ID]?.id) {
            const tempItem: { [key: string]: any } = state[ID];
            tempOBJ[ID] = { ...tempItem, ...item };
        } else {
            tempOBJ[ID] = item;
        }
    };
    return { IDs: tempIDs, obj: tempOBJ };
}

export const makeOBJFN = (updatedState: { [key: string]: any } = {}): { obj: { [key: string]: any }, IDs: Array<string> } => {
    `worklet`
    const tempOBJ: { [key: string]: any } = {};
    const tempIDs: Array<string> = [];
    for (let item of Object.values(updatedState)) {
        const ID = item?.id;
        if (!ID) continue;
        tempIDs.push(ID);
        tempOBJ[ID] = item;
    };
    return { IDs: tempIDs, obj: tempOBJ };
}

export const copyToClipboard = (text?: string): boolean => {
    try {
        Clipboard.setString(text || "https://sandesh.com");
        return true;
    } catch (e) {
        return false;
    }
}