import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useThemeX } from 'hooks';
import useZuStore from 'store/useZuStore';
import FastSquircleView from 'react-native-fast-squircle';
import ImageXCompo from 'components/XCompos/ImageXCompo';
import TextXCompo from 'components/XCompos/TextXCompo';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';
import { defStyObjType, NewsItemType } from 'types';
import { _WIDTH, bSpace } from 'utils';
import { Size } from 'functions/defFunctions';

type P = {
    onPress?: () => void;
    title?: string;
    categoryTitle?: string;
    imageMediaUrl?: string;
    onCategoryPress?: () => void;
};

const ImageCourasoleItemCompo = ({
    title, categoryTitle, imageMediaUrl, onPress = () => { }, onCategoryPress = () => { }
}: P) => {

    const { defStyOBJ, col } = useThemeX();
    const style = styleFN(defStyOBJ);
    const { appServices } = useZuStore();
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <FastSquircleView style={style.item_main} >
                <FastSquircleView style={style.item_image_main} >
                    <ImageXCompo
                        // img={`${appServices?.assetURL}${item?.media}`}
                        imgSource={{ uri: `${appServices?.assetURL}${imageMediaUrl}` }}
                        imgSty={style.item_image} resizeMode="cover"
                    />
                </FastSquircleView>
                <TextXCompo text={title} tSty={style.title} lines={3} />
                {categoryTitle && <View style={style.catagory_and_btn_cover} >
                    <PressableScaleXCompo style={style.categotyCover} >
                        <TextXCompo text={String(categoryTitle || "")} tSty={style.categotyTitle} onPress={onCategoryPress} />
                    </PressableScaleXCompo>
                </View>}
            </FastSquircleView>
        </TouchableOpacity >
    )
}

export default ImageCourasoleItemCompo


const styleFN = ({ font, col }: defStyObjType) => StyleSheet.create({
    item_main: {
        width: _WIDTH - (bSpace),
        marginHorizontal: bSpace / 2,
        padding: bSpace,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: col.SECONDARY,
        marginVertical: bSpace / 2
    },
    item_image_main: {
        height: Size(250),
        width: "100%",
        borderRadius: 20,
        overflow: 'hidden',
    },
    item_image: {
        flex: 1,
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: Size(20),
        color: col.TEXT_COL,
        paddingTop: Size(5),
        lineHeight: Size(30),
    },
    catagory_and_btn_cover: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Size(35),
        alignItems: 'center',
        paddingTop: 5,
    },
    categotyCover: {
        height: "100%",
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: col.OUTLINE03,
        backgroundColor: col.PRIMARY,
        paddingHorizontal: bSpace,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categotyTitle: {
        fontFamily: font.BOLD,
        fontSize: Size(16),
        color: col.WHITE,
    },
    right_arrow_btn: {
        aspectRatio: 1,
        height: "100%",
        borderRadius: 100,
        borderColor: col.PRIMARY
    }

});