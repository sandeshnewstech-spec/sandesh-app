import ImageXCompo from 'components/XCompos/ImageXCompo';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';
import { pLOG, Size } from 'functions';
import { useThemeX } from 'hooks'
import React from 'react'
import { StyleSheet } from 'react-native'
import useZuStore from 'store/useZuStore';
import { defStyObjType, WebStoryItemType } from 'types';
import { _HEIGHT, _WIDTH, bSpace, } from 'utils';

const HomeWebStoriesItemCompo = ({ url, main_image }: WebStoryItemType) => {
    const { appServices } = useZuStore();
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    pLOG("url", (appServices?.assetURL || "") + "/" + (main_image || ""))
    return (
        <PressableScaleXCompo style={style.mainSty}>
            <ImageXCompo
                img={(appServices?.assetURL || "") + "/" + (main_image || "")}
            />
        </PressableScaleXCompo>
    )
}

export default HomeWebStoriesItemCompo

const styleFN = ({ windowDimention }: defStyObjType) => StyleSheet.create({
    mainSty: {
        height: windowDimention.height * .17,
        aspectRatio: .7,
        marginRight: bSpace / 2,
        borderRadius: Size(14),
        overflow: 'hidden'
    }
})