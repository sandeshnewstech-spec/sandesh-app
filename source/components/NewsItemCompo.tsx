import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType, NewsItemType } from 'types';
import FastSquircleView from 'react-native-fast-squircle';
import TextXCompo from './XCompos/TextXCompo';
import { _HEIGHT, bSpace } from 'utils';
import { Size } from 'functions';
import ImageXCompo from './XCompos/ImageXCompo';
import useZuStore from 'store/useZuStore';

type P = {

} & NewsItemType;

const NewsItemCompo = ({ title, media }: P) => {
    const { appServices } = useZuStore();
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);

    return (
        <FastSquircleView style={style.main}>
            <View style={style.cover} >
                <View style={style.textCover} >
                    <TextXCompo text={title} lines={4} tSty={style.title} />
                </View>
                <View style={style.imageCover} >
                    <FastSquircleView style={style.image} >
                        <ImageXCompo
                            imgSource={{ uri: `${appServices?.assetURL}${media}` }}
                            img={"https://resize-img.sandesh.com/assets.sandesh.com/images/2026/01/12/KKcFklNkgOIgvN4J76e85aBGq0V4IMz9oIU7x7sW.webp?resize=800,450"}
                            resizeMode='cover' />
                    </FastSquircleView>
                </View>
            </View>
        </FastSquircleView>);
}

export default (NewsItemCompo);

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({
    main: {
        borderRadius: 10,
        height: _HEIGHT * .155,
        flex: 1,
        backgroundColor: col.SECONDARY,
        marginVertical: bSpace / 2,
        marginHorizontal: bSpace / 2,
        paddingHorizontal: bSpace / 2
    },
    cover: {
        flex: 1,
        height: "100%",
        flexDirection: 'row',
        // paddingHorizontal: bSpace,
    },
    title: {
        fontFamily: font.BOLD,
        fontSize: Size(17),
        color: col.WHITE,
        lineHeight: Size(25),
    },
    textCover: {
        flex: 1,
        padding: bSpace / 2,
    },
    imageCover: {
        paddingVertical: bSpace / 2,
    },
    image: {
        height: "100%",
        aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden'
    }
});