import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


const _HEIGHT = Dimensions.get('window').height;
const _WIDTH = Dimensions.get('window').width;

const Size = (num: number) => RFValue(num, _HEIGHT);

const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

const isUrl = (urlString: string): boolean => {
    try {
        const newUrl = new URL(urlString);
        return (Boolean(newUrl) && String(newUrl)?.includes('http:') || String(newUrl)?.includes('https:')) || isValidUrl(urlString);
    }
    catch (e) {
        return false;
    }
}

const decimal = (noS: string): number => {
    let val = parseFloat(noS);
    return parseFloat(val.toFixed(2));
};

function generateUniqueID(uniqueKey: string | number = "") {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number (0-9999)
    const uniqueID = `${String(uniqueKey)}_${timestamp}_${randomNum}`;
    return uniqueID;
}

const isErr = (e: number) => {
    switch (e) {
        case 400: return true;
        case 404: return true;
        default: return false;
    }
}

const regex = {
    email: (str: string) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(str),
    phone: (str: string) => (/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/).test(str),
    seRMV: (str?: string): string => (str ?? "")?.replace(/[\s\r\n]+/g, '').trim(), // space or enter removed,
    forCHAT: (str?: string): string => (str ?? "")?.replace(/(\s|\n){3}$/, '  ').trim(), // space or enter removed,
}

const isValid = {
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
    isValidNumber: ({ max = 999999999, min = 0, text = '' }: { max?: number, min?: number, text: string }) => {
        const pattern = new RegExp(`^[0-9]{${min},${max}}$`);
        return pattern.test(text);
    }
};

function deepClone<T>(arr: T[]): T[] /* | any[] */ {
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




export {
    Size, _HEIGHT, _WIDTH, decimal, generateUniqueID, isUrl, deepClone, isValid,
    isErr, regex, isValidUrl
}