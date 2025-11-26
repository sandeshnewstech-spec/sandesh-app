import { View, StyleSheet } from 'react-native'
import React, { Fragment, ReactNode, useCallback } from 'react'
import { useThemeX } from '../hooks';
import { PressX } from '../components';
import { defStyObjType } from '../types';
import { LIST_IC } from '../assets';

const CustomizeBottomTabBar = ({ state, descriptors, navigation }: any) => {

    const { col, defStyOBJ, bottom } = useThemeX();
    const sty = styFN(defStyOBJ);

    const getTabs = useCallback(() => state?.routes?.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused: boolean = state.index === index;

        function getIcon(name: string): { svg: ReactNode } {
            switch (name) {
                case 'FriendsListingScr': return ({ svg: <LIST_IC color={isFocused ? col.WHITE : col.BLACK} /> })
                case 'GroupListingScr': return ({ svg: <Fragment /* color={isFocused ? col.WHITE : col.BLACK} */ /> })
                case 'ProfileScr': return ({ svg: <Fragment /* color={isFocused ? col.WHITE : col.BLACK} */ /> })
                default: return { svg: <></> };
            }
        }

        const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
            <PressX key={index.toString()} onPress={onPress}
                mSty={sty.btnMSty} cSty={sty.btnCSty}
            // bgCol={isFocused ? col.PRIMARY : col.SECONDARY}
            >
                {getIcon(route?.name)?.svg}
            </PressX>)
    }), [state, navigation, descriptors]);

    return (
        <View style={[sty.mainContainer]} >
            <View style={sty.iconContainer} >
                {getTabs()}
            </View>
            <View style={{ height: bottom, backgroundColor: col.BOOTOM_TAB_BG }} />
        </View>
    );
}

export default CustomizeBottomTabBar

const styFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({

    mainContainer: {
        height: 55 + bottom,
        justifyContent: 'center',
        backgroundColor: col.BOOTOM_TAB_BG,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnMSty: {
        justifyContent: 'center',
    },
    btnCSty: {
        alignItems: 'center',
        padding: 2,
        paddingHorizontal: 30,
        borderRadius: 100,
    },

})