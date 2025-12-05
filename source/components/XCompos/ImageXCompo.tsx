import React, { useCallback, useState } from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { DEF1S_IMG } from '../../assets/images';
import { ImageBackground, ImageStyle, StyleProp } from 'react-native';
import { isValidUrl, regex } from '../../functions';

interface Props extends FastImageProps {
    img: string | any;
    imgSource?: any;
    imgSty?: ImageStyle | StyleProp<any>;
    defIMG?: any;
    noDefImg?: boolean;
    imgProps?: FastImageProps;
    sharedTransitionTag?: string;
}

const ImageXCompo = ({ imgSource, sharedTransitionTag, img, noDefImg, defIMG = DEF1S_IMG, imgSty, ...imgProps }: Props) => {

    const placeholder_image_base64 = undefined, placeholder_image = undefined;
    const imgUriSource = img && typeof img === 'string' ? img : "";

    const [shERR, setShERR] = useState<boolean | null>(null);
    const [imgERR, setImgERR] = useState<boolean | null>(null);

    const Image = useCallback(() => {
        return (<FastImage
            source={imgSource ? imgSource : { uri: img, cache: 'immutable' }}
            style={{
                width: "100%", height: "100%",
                // backgroundColor: (imgERR == null || imgERR == true) ? undefined : col.WHITE,
                ...imgSty,
            }}
            onError={() => { setImgERR(true); }}
            onLoadEnd={() => { !imgERR && setImgERR(false); }}
            {...imgProps}
        />);
    }, [imgUriSource, img, imgERR, shERR, placeholder_image_base64, imgSource,
        placeholder_image, imgProps, imgSty]);

    return (<ImageBackground
        source={(noDefImg || placeholder_image_base64 || placeholder_image) ? undefined : defIMG}
        style={{ width: "100%", height: "100%", ...imgSty }}>
        {((regex.seRMV(placeholder_image_base64 || placeholder_image || "")?.length > 0) && !(!!shERR))
            ? (<ImageBackground
                resizeMode='contain'
                source={{
                    cache: 'force-cache',
                    uri: imgERR == false ? undefined : (placeholder_image_base64 || placeholder_image || ""),
                }}
                onError={() => { setShERR(true); }}
                onLoadEnd={() => { !shERR && setShERR(false); }}
                style={{
                    width: "100%", height: "100%",
                    // backgroundColor: (shERR == null || shERR) ? undefined : 'white',
                    ...imgSty
                }}>
                {(isValidUrl(imgUriSource) || imgSource) && Image()}
            </ImageBackground>)
            : ((isValidUrl(imgUriSource) || imgSource) && Image())
        }
    </ImageBackground>);
}

export default React.memo(ImageXCompo);