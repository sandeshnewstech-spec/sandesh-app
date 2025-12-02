import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Animated,
    Easing,
    StatusBar,
    StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useThemeX } from "hooks";
import { defStyObjType } from "types";
import { bSpace, isIOS } from "utils";
import { ButtonOne, MasterView, TextX } from "components";
import { IC_MATERIAL } from "assets";
import { Size } from "functions";
import useZuStore from "store/useZuStore";

const states = [
    {
        name: "Gujarat",
        icon: "map-marker",
        subtitle: "Western India • Gandhinagar"
    },
    {
        name: "Maharashtra",
        icon: "map-marker-radius",
        subtitle: "Western India • Mumbai"
    },
    {
        name: "Delhi",
        icon: "city",
        subtitle: "Northern India • Capital"
    },
    {
        name: "Punjab",
        icon: "map",
        subtitle: "Northern India • Chandigarh"
    },
    {
        name: "Karnataka",
        icon: "earth",
        subtitle: "Southern India • Bangalore"
    },
    {
        name: "Tamil Nadu",
        icon: "flag",
        subtitle: "Southern India • Chennai"
    },
    {
        name: "Rajasthan",
        icon: "terrain",
        subtitle: "Northern India • Jaipur"
    },
    {
        name: "Uttar Pradesh",
        icon: "home-city",
        subtitle: "Northern India • Lucknow"
    },
];

export default function LocationController({ navigation }: any) {

    const { setIsAppStartFlow } = useZuStore();
    const { col, defStyOBJ, GRADIANTS_COLORS, top } = useThemeX();
    const styles = styleFN(defStyOBJ);

    const [selectedState, setSelectedState] = useState<string>("");

    const handleStateSelect = (stateName: string) => {
        setSelectedState(stateName);
    };

    const renderLocationCard = ({ item }: { item: { name: string; icon: string; subtitle: string } }) => {
        const isSelected = selectedState === item?.name;

        return (
            <Animated.View style={[{}]}>
                <TouchableOpacity
                    activeOpacity={1} style={styles.cardShadow}
                    onPress={() => handleStateSelect(item?.name)}>
                    {isSelected ? (
                        <LinearGradient
                            colors={GRADIANTS_COLORS.cardSelectedGradient}
                            style={[styles.locationCard, styles.locationCardSelected]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <View style={styles.cardContent}>
                                <View style={styles.textContainer}>
                                    <TextX tSty={{ ...styles.stateName, ...styles.textSelected }}>
                                        {item?.name}
                                    </TextX>
                                    <TextX tSty={[styles.stateSubtitle, styles.textSelected]}>
                                        {item?.subtitle}
                                    </TextX>
                                </View>
                                <View style={styles.selectedIndicator}>
                                    <IC_MATERIAL
                                        name="check" size={14}
                                        color={GRADIANTS_COLORS.primary[0]}
                                        style={styles.checkIcon}
                                    />
                                </View>
                                <View style={styles.glowEffect} />
                            </View>
                        </LinearGradient>
                    ) : (
                        <LinearGradient
                            colors={GRADIANTS_COLORS.cardGradient}
                            style={styles.locationCard}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>
                            <View style={styles.cardContent}>
                                <View style={styles.textContainer}>
                                    <TextX tSty={styles.stateName}>
                                        {item?.name}
                                    </TextX>
                                    <TextX tSty={styles.stateSubtitle}>
                                        {item?.subtitle}
                                    </TextX>
                                </View>
                            </View>
                        </LinearGradient>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (<MasterView fixed hShow={false} style={{ flex: 1 }} sbShow={false} >
        <View style={{ height: top }} />
        <View style={styles.main_ic_container} >
            <LinearGradient
                colors={GRADIANTS_COLORS.primary}
                style={styles.iconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <IC_MATERIAL name="map-marker-radius" size={24} color={col.WHITE} />
            </LinearGradient>
        </View>

        {/* HEADER SECTION */}
        <Animated.View style={[styles.headerContainer]}>
            <View style={styles.headerTextContainer}>
                <TextX tSty={styles.title}>Select Your Location</TextX>
                <TextX tSty={styles.subtitle}>
                    Choose your state to get localized news and updates
                </TextX>
            </View>
        </Animated.View>

        {/* LOCATIONS LIST */}
        <FlatList
            data={states}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?.name}
            renderItem={renderLocationCard}
        />

        {/* FLOATING ACTION BUTTON */}
        {selectedState !== "" && (<Animated.View style={[styles.buttonContainer]}>
            <ButtonOne onPress={() => setIsAppStartFlow(false)}>
                <TextX tSty={styles.buttonText}>Finish Setup</TextX>
                <IC_MATERIAL name="check-all" size={18} color={GRADIANTS_COLORS.textLight} style={styles.buttonIcon} />
            </ButtonOne>
        </Animated.View>)}
    </MasterView>);
}

const styleFN = ({ col, font, GRADIANTS_COLORS, bottom }: defStyObjType) => StyleSheet.create({
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
        fontSize: Size(34),
        fontWeight: "900",
        color: col.TEXT_COL,
        marginBottom: 8,
        letterSpacing: -0.8,
        textShadowColor: 'rgba(0, 0, 0, 0.05)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    subtitle: {
        fontSize: Size(16),
        color: col.TEXT_COL,
        lineHeight: 22,
        fontWeight: "500",
    },

    /* LIST STYLES */
    listContent: {
        paddingHorizontal: bSpace,
        paddingVertical: bSpace,
        paddingBottom: 100
    },

    cardShadow: {
        shadowColor: GRADIANTS_COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        elevation: 5,
        marginBottom: 16,
    },

    locationCard: {
        borderRadius: 18,
        padding: 20,
        borderWidth: 1,
        borderColor: col.WHITE03,
        overflow: "hidden",
        shadowColor: col.PRIMARY,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 25,
        elevation: 5,
        transform: [{ scale: 1.02 }],
    },

    locationCardSelected: {
        shadowColor: GRADIANTS_COLORS.primary[0],
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
        elevation: 15,
        transform: [{ scale: 1.02 }],
    },

    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },

    textContainer: {
        flex: 1,
    },

    stateName: {
        fontSize: 18,
        fontWeight: "700",
        color: GRADIANTS_COLORS.textPrimary,
        marginBottom: 4,
    },

    stateSubtitle: {
        fontSize: 14,
        color: GRADIANTS_COLORS.textSecondary,
        fontWeight: "500",
    },

    textSelected: {
        color: GRADIANTS_COLORS.textLight,
        textShadowColor: col.BLACK02,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },

    selectedIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: col.WHITE09,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: col.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },

    checkIcon: {
        color: GRADIANTS_COLORS.primary[0],
        fontWeight: "bold",
    },

    glowEffect: {
        position: "absolute",
        top: -15,
        right: -15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: col.WHITE03,
        opacity: 0.8,
    },

    /* BUTTON STYLES */
    buttonContainer: {
        position: "absolute",
        bottom: bottom + bSpace,
        width: "100%",
        paddingHorizontal: bSpace,
        shadowColor: GRADIANTS_COLORS.primary[0],
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 25,
        elevation: 12,
    },

    button: {
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: col.WHITE03,
    },

    buttonGradient: {
        paddingVertical: 18,
        paddingHorizontal: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: GRADIANTS_COLORS.textLight,
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