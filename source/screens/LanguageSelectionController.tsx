import React, { useState, useRef } from "react";
import { View, FlatList, Animated, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { defStyObjType } from "types";
import { _WIDTH, bSpace, isIOS, LANGUAGES } from "utils";
import { useThemeX } from "hooks";
import { ButtonOne, MasterView, SelectionItemCard, TextX } from "components";
import { IC_FONT_AWESOME6 } from "assets";
import { _GRADIANTS_COLORS } from "colors";

export default function LanguageSelectionController({ navigation }: any) {
    const { defStyOBJ, col, top, GRADIANTS_COLORS } = useThemeX();
    const styles = stylesFN(defStyOBJ);

    const [selected, setSelected] = useState("EN");

    return (
        <MasterView fixed hShow={false} style={{ flex: 1 }} sbShow={false}  >
            <LinearGradient
                colors={GRADIANTS_COLORS.primary}
                style={{ height: top }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            />
            <View style={styles.main_ic_container} >
                <LinearGradient
                    colors={GRADIANTS_COLORS.primary}
                    style={styles.iconContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <IC_FONT_AWESOME6 name="language" size={24} color={col.WHITE} />
                </LinearGradient>
            </View>

            {/* HEADER SECTION */}
            <Animated.View style={[styles.headerContainer]}>
                <View style={styles.headerTextContainer}>
                    <TextX tSty={styles.title}>Choose Your Language</TextX>
                    <TextX tSty={styles.subtitle}>
                        Select your preferred language for better experience
                    </TextX>
                </View>
            </Animated.View>

            {/* LANGUAGE GRID */}
            <FlatList
                data={LANGUAGES}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <SelectionItemCard
                        item={item}
                        isSelected={selected === item.code}
                        onPress={() => setSelected(item.code)}
                    />
                )}
            />

            {/* FLOATING ACTION BUTTON */}
            <Animated.View style={[styles.buttonContainer]}>
                <ButtonOne onPress={() => navigation.navigate("InterestScreen")}>
                    <TextX tSty={styles.buttonText}>Continue</TextX>
                    <IC_FONT_AWESOME6 name="arrow-right" size={16} color={col.WHITE} style={styles.buttonIcon} />
                </ButtonOne>
            </Animated.View>
        </MasterView>
    );
}

const stylesFN = ({ col }: defStyObjType) => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: isIOS ? 60 : 40,
    },

    main_ic_container: {
        padding: bSpace
    },

    /* HEADER STYLES */
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: col.PRIMARY,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },

    headerContainer: {
        marginVertical: bSpace / 2,
        paddingHorizontal: bSpace
    },
    headerTextContainer: {
        marginBottom: 10,
    },

    title: {
        fontSize: 34,
        fontWeight: "900",
        color: col.TEXT_COL,
        marginBottom: 8,
        letterSpacing: -0.8,
        textShadowColor: 'rgba(0, 0, 0, 0.05)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    subtitle: {
        fontSize: 16,
        color: col.TEXT_COL,
        lineHeight: 22,
        fontWeight: "500",
    },

    progressContainer: {
        marginVertical: bSpace,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 65, 108, 0.1)',
    },

    progressBar: {
        height: 8,
        backgroundColor: "#F8D7DA",
        // borderRadius: 4,
        overflow: "hidden",
        marginBottom: 10,
    },

    progressFill: {
        height: "100%",
        width: "33%",
        borderRadius: 4,
    },

    progressText: {
        fontSize: 14,
        color: col.TEXT_COL,
        fontWeight: "600",
        textAlign: "center",
    },

    /* LIST STYLES */
    listContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 100
    },

    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: 18,
    },

    /* BUTTON STYLES */
    buttonContainer: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        shadowColor: _GRADIANTS_COLORS.primary[0],
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },

    buttonText: {
        color: col.WHITE,
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: 0.8,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    buttonIcon: {
        marginLeft: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});