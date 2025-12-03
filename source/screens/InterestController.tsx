import React, { useState, useRef } from "react";
import {
    View,
    FlatList,
    Animated,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { defStyObjType } from "types";
import { useThemeX } from "hooks";
import { _WIDTH, bSpace } from "utils";
import { ButtonOne, MasterView, SelectionItemCard, TextX } from "components";
import { IC_FONT_AWESOME6, IC_MATERIAL_COMMUNITY } from "assets";

const categories = [
    { name: "Entertainment", icon: "movie-open" },
    { name: "Sports", icon: "soccer" },
    { name: "World", icon: "earth" },
    { name: "India", icon: "flag" },
    { name: "Crime", icon: "police-badge" },
    { name: "Stock Market", icon: "chart-line" },
    { name: "Health", icon: "heart-pulse" },
    { name: "Technology", icon: "laptop" },
    { name: "Business", icon: "briefcase" },
    { name: "Politics", icon: "account-tie" },
    { name: "Education", icon: "school" },
    { name: "Science", icon: "atom" },
];

export default function InterestScreen({ navigation }: any) {

    const { defStyOBJ, GRADIANTS_COLORS, top, col } = useThemeX();
    const styles = styleFN(defStyOBJ);

    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelect = (item: string) => {
        if (selected.includes(item)) {
            setSelected(selected.filter((i) => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    const getButtonText = () => {
        if (selected.length < 3) {
            return `Select ${3 - selected.length} more to continue`;
        }
        return `Continue with ${selected.length} interests`;
    };

    return (
        <MasterView fixed hShow={false} style={{ flex: 1 }} sbShow={false} >
            <View style={{ height: top }} />

            <View style={styles.main_ic_container} >
                <LinearGradient
                    colors={GRADIANTS_COLORS.primary}
                    style={styles.iconContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <IC_FONT_AWESOME6 name="heart" size={24} color={col.WHITE} />
                </LinearGradient>
            </View>

            {/* HEADER SECTION */}
            <Animated.View style={[styles.headerContainer]}>
                <View style={styles.headerTextContainer}>
                    <TextX tSty={styles.title}>Choose Your Interests</TextX>
                    <TextX tSty={styles.subtitle}>
                        Select at least 3 categories to personalize your experience
                    </TextX>
                </View>
            </Animated.View>

            {/* CATEGORIES GRID */}
            <FlatList
                data={categories}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item?.name}
                renderItem={({ item }) => (<SelectionItemCard
                    item={item} selected={selected} isInterestScreen
                    onPress={() => { toggleSelect(item?.name) }}
                    isSelected={!!selected.includes(item?.name)}
                />)} />

            {/* FLOATING ACTION BUTTON */}
            <Animated.View style={[styles.buttonContainer]}>
                <ButtonOne disabled={selected.length < 3} linearStyle={{ opacity: selected.length < 3 ? 0.3 : undefined }} onPress={() => navigation.navigate("LocationScreen")} >
                    <TextX tSty={styles.buttonText}>
                        {getButtonText()}
                    </TextX>
                    {selected.length >= 3 && (
                        <IC_MATERIAL_COMMUNITY name="arrow-right" size={16} color={col.WHITE} style={styles.buttonIcon} />
                    )}
                </ButtonOne>
            </Animated.View>
        </MasterView>
    );
}

const styleFN = ({ col, font, GRADIANTS_COLORS, bottom }: defStyObjType) => StyleSheet.create({
    main_ic_container: {
        padding: bSpace,
    },

    /* HEADER STYLES */
    headerContainer: {
        marginVertical: bSpace / 2,
        paddingHorizontal: bSpace
    },

    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: GRADIANTS_COLORS.primary[0],
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },

    headerTextContainer: {
        marginBottom: 20,
    },

    title: {
        fontSize: 34,
        fontWeight: "900",
        color: col.TEXT_COL,
        marginBottom: 8,
        letterSpacing: -0.8,
        textShadowColor: col.BLACK02,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    subtitle: {
        fontSize: 16,
        color: GRADIANTS_COLORS.textSecondary,
        lineHeight: 22,
        fontWeight: "500",
    },

    /* LIST STYLES */
    listContent: {
        paddingHorizontal: bSpace,
        paddingVertical: bSpace,
        paddingBottom: 100
    },

    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: 18,
    },

    /* BUTTON STYLES */
    buttonContainer: {
        position: "absolute",
        width: "100%",
        bottom: bottom + bSpace,
        paddingHorizontal: bSpace,
        shadowColor: col.WHITE,
        shadowOffset: { width: 20, height: 10 },
        shadowOpacity: 0,
        shadowRadius: 20,
        elevation: 10,
    },

    buttonText: {
        color: col.WHITE,
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 0.8,
        textShadowColor: col.BLACK02,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    buttonIcon: {
        marginLeft: 10,
        textShadowColor: col.BLACK02,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});