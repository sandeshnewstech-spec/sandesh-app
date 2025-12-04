import { View, StyleSheet } from 'react-native';
import React, { ReactNode, useCallback } from 'react';
import { useThemeX } from 'hooks';
import { PressableScaleX, TextX } from 'components';
import { defStyObjType } from 'types';
import { IC_MATERIAL, IC_MATERIAL_COMMUNITY } from 'assets';
import { Size } from 'functions';

const CustomizeBottomTabBar = ({ state, descriptors, navigation }: any) => {

    const { col, defStyOBJ, bottom } = useThemeX();
    const sty = styFN(defStyOBJ);

    const getTabs = useCallback(() => {
        return state?.routes?.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused: boolean = state.index === index;

            function getIcon(name: string): { svg: ReactNode; title: string } {
                switch (name) {
                    case 'HomeTabScreen':
                        return ({
                            title: "Home",
                            svg: <IC_MATERIAL name='home'
                                color={isFocused ? col.BOTTOM_TAB_SELECTED_ITEM_IC : col.BOTTOM_TAB_ITEM_IC} size={30} />
                        });
                    case 'VideosTabScreen':
                        return ({
                            title: "Videos",
                            svg: <IC_MATERIAL_COMMUNITY name='play-circle'
                                color={isFocused ? col.BOTTOM_TAB_SELECTED_ITEM_IC : col.BOTTOM_TAB_ITEM_IC} size={30} />
                        });
                    case 'SearchTabScreen':
                        return ({
                            title: "Search",
                            svg: <IC_MATERIAL_COMMUNITY name='cloud-search'
                                color={isFocused ? col.BOTTOM_TAB_SELECTED_ITEM_IC : col.BOTTOM_TAB_ITEM_IC} size={30} />
                        });
                    case 'ProfileTabScreen':
                        return ({
                            title: "Profile",
                            svg: <IC_MATERIAL name='person-pin'
                                color={isFocused ? col.BOTTOM_TAB_SELECTED_ITEM_IC : col.BOTTOM_TAB_ITEM_IC} size={30} />
                        });
                    default:
                        return { svg: <></>, title: "" };
                }
            }

            const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                }
            };
            const item = getIcon(route?.name);
            return (
                <PressableScaleX key={item?.title || ""} disabled={isFocused}
                    style={isFocused ? sty.item_selected_cnt : sty.item_cnt}
                    feedbackMode='scale' activeOpacity={0} rippleColor={'translate'}
                    onPress={onPress} >
                    {item?.svg}
                    {isFocused && <TextX text={item?.title} tSty={isFocused ? sty.tab_item_selected_title : sty.tab_item_title} />}
                </PressableScaleX>
            );
        });
    }, [state, navigation, descriptors, col.WHITE, col.BLACK]);

    return (
        <View style={[sty.mainContainer]}>
            <View style={sty.iconContainer}>
                {getTabs()} {/* Render the generated tab buttons */}
            </View>
        </View>
    );
};

export default CustomizeBottomTabBar;

const styFN = ({ col, font, bottom }: defStyObjType) => StyleSheet.create({
    mainContainer: {
        height: 70 + bottom - 2,
        paddingBottom: bottom / 2 + 5,
        justifyContent: 'center',
        backgroundColor: col.BOTTOM_TAB_BG,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    item_cnt: {
        backgroundColor: col.BOTTOM_TAB_ITEM_BG,
        padding: 10,
        borderRadius: 200,
        flexDirection: 'row',
        alignItems: 'center'
    },
    item_selected_cnt: {
        backgroundColor: col.BOTTOM_TAB_SELECTED_ITEM_BG,
        padding: 10,
        borderRadius: 200,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tab_item_title: {
        fontFamily: font.REGULAR,
        fontSize: Size(18),
        color: col.BOTTOM_TAB_ITEM_TITLE,
        paddingLeft: 10
    },
    tab_item_selected_title: {
        fontFamily: font.BOLD,
        fontSize: Size(18),
        color: col.BOTTOM_TAB_SELECTED_ITEM_TITLE,
        paddingLeft: 8,
    },

});
