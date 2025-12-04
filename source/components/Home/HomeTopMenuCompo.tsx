import { StyleSheet, Text, View } from 'react-native'
import React, { act, useEffect, useRef, useState } from 'react'
import { useThemeX } from 'hooks'
import { defStyObjType, HomeTopMenuItemType } from 'types';
import { Size } from 'functions';
import PressableScaleXCompo from 'components/XCompos/PressableScaleXCompo';
import { FlatList } from 'react-native-gesture-handler';
import TextXCompo from 'components/XCompos/TextXCompo';
import { _WIDTH, bSpace } from 'utils';

type P = {
    data?: { [key: string]: HomeTopMenuItemType };
    onPress?: (i: number) => void;
    activeScrPage?: number;
};
const HomeTopMenuCompo = ({ data = {}, onPress = () => { }, activeScrPage }: P) => {
    const { defStyOBJ } = useThemeX();
    const style = styleFN(defStyOBJ);
    const [activePage, setActivePage] = useState<number>(0);
    const flashListRef = useRef<FlatList>(null);
    const menu_data = Object.values(data);

    const onPressing = (item: HomeTopMenuItemType, index: number) => {
        setActivePage(index);
        onPress(index);
    }

    const onScrollSnap = () => {
        const item = menu_data[activePage];
        if (activePage > 0) flashListRef.current?.scrollToItem({ animated: true, item, viewOffset: (_WIDTH / 2) - (bSpace * 3) });
    }

    useEffect(() => {
        onScrollSnap()
    }, [activeScrPage]);

    return (
        <View style={style.mainCSty}>
            <FlatList
                ref={flashListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.fl_cSty}
                data={menu_data}
                ItemSeparatorComponent={() => <View style={style.fl_sehpratore} />}
                renderItem={({ item, index }: { item: HomeTopMenuItemType, index: number }) => <PressableScaleXCompo
                    style={activePage === index ? style.item_selected_mSty : style.item_mSty}
                    onPress={() => onPressing(item, index)} >
                    <TextXCompo text={item?.name} tSty={activePage === index ? style.title_selected_Sty : style.titleSty} />
                </PressableScaleXCompo>}
            />
        </View>);
}

export default HomeTopMenuCompo

const styleFN = ({ col, font }: defStyObjType) => StyleSheet.create({

    mainCSty: {
        // height: Size(40),
        backgroundColor: col.BLACK07
    },
    fl_cSty: {
        paddingVertical: 2,
        paddingHorizontal: bSpace
    },
    fl_sehpratore: {
        width: 7,
    },
    item_mSty: {
        height: Size(45),
        backgroundColor: col.BLACK005,
        justifyContent: 'center',
        paddingHorizontal: 25,
        borderRadius: _WIDTH
    },
    item_selected_mSty: {
        height: Size(45),
        backgroundColor: col.BLACK,
        justifyContent: 'center',
        paddingHorizontal: 25,
        borderRadius: _WIDTH,
    },
    title_selected_Sty: {
        fontFamily: font.BOLD,
        color: col.WHITE,
        fontSize: Size(15)
    },
    titleSty: {
        fontFamily: font.BOLD,
        color: col.BLACK,
        fontSize: Size(15)
    },
});