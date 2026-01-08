import { useNavigation } from '@react-navigation/native';
import ImageXCompo from 'components/XCompos/ImageXCompo';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';
import TextXCompo from 'components/XCompos/TextXCompo';
import { Size } from 'functions';
import { useThemeX } from 'hooks'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import useZuStore from 'store/useZuStore';
import { defStyObjType, WebStoryItemType } from 'types';
import { _HEIGHT, bSpace, } from 'utils';

const HomeWebStoriesItemCompo = (item: WebStoryItemType) => {
    const { main_image, title } = item;
    const navigation: any = useNavigation();
    const { appServices } = useZuStore();
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    return (<PressableScaleXCompo onPress={() => navigation.navigate("WebStoryViewScreen", { item })} >
        <View style={style.mainSty} >
            <View style={style.inner_mainSty}>
                <ImageXCompo img={(appServices?.assetURL || "") + (main_image || "")} />
                <View style={style.title_csty} >
                    <TextXCompo text={title} lines={2} tSty={style.title_txsty} />
                </View>
            </View>
        </View>
    </PressableScaleXCompo>);
}

export default HomeWebStoriesItemCompo

const styleFN = ({ windowDimention, font, col }: defStyObjType) => StyleSheet.create({
    mainSty: {
        height: _HEIGHT * .10,
        aspectRatio: 1,
        marginRight: bSpace / 2,
        borderRadius: 1000,
        borderWidth: 2.3,
        borderColor: col.PRIMARY,
        overflow: 'hidden',
    },
    inner_mainSty: {
        flex: 1,
        margin: Size(3),
        borderRadius: 1000,
        overflow: 'hidden'
    },
    title_csty: {
        padding: bSpace / 2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: (bSpace / 2) + 3,
        backgroundColor: col.BLACK05,
        borderRadius: 1000,
    },
    title_txsty: {
        color: col.WHITE,
        fontSize: Size(15),
        fontFamily: font.BOLD,
        lineHeight: Size(18),
        marginVertical: 5,
    }
})