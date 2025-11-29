import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useThemeX } from 'hooks';
import LinearGradient from 'react-native-linear-gradient';
import { IC_FONT_AWESOME6, IC_MATERIAL } from 'assets';
import { defStyObjType } from 'types';
import { _WIDTH } from 'utils';

type P = {
    item: { code?: string; name?: string, icon?: any };
    isSelected: boolean;
    onPress: () => void;
    selected?: string[];
    isInterestScreen?: boolean;
}
const SelectionItemCardCompo = ({ item, isSelected, onPress, selected = [], isInterestScreen = false }: P) => {

    const { GRADIANTS_COLORS, defStyOBJ } = useThemeX();
    const styles = stylesFN(defStyOBJ);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const getSelectionOrder = (itemName?: string): number | null => {
        const index = selected?.indexOf(itemName || "");
        return index !== -1 ? index + 1 : null;
    };

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic)
        }).start();
    }, [isSelected]);

    const animateSelect = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.08,
                duration: 120,
                useNativeDriver: true,
                easing: Easing.out(Easing.back(1.5))
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 120,
                useNativeDriver: true,
                easing: Easing.in(Easing.cubic)
            }),
        ]).start();
    };

    return (<Animated.View style={[{ transform: [{ scale: scaleAnim }] }, { opacity: fadeAnim }]}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
                onPress();
                animateSelect();
            }}
            style={styles.cardShadow}>
            {isSelected ? (
                <LinearGradient
                    colors={GRADIANTS_COLORS.cardSelectedGradient}
                    style={[styles.card, styles.cardSelected]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <View style={styles.cardContent}>
                        {isInterestScreen && <View style={[styles.iconWrapper, styles.iconWrapperSelected]}>
                            <IC_MATERIAL
                                name={item.icon} size={26}
                                color={GRADIANTS_COLORS.textLight}
                            />
                        </View>}
                        {item?.code && <Text style={[styles.code, styles.textSelected]}>
                            {item?.code}
                        </Text>}
                        {item?.name && <Text style={[styles.name, styles.textSelected]}>
                            {item?.name}
                        </Text>}
                        {isInterestScreen ? <View style={styles.selectionBadge}>
                            <Text style={styles.selectionBadgeText}>
                                {getSelectionOrder(item?.name)}
                            </Text>
                        </View> : <View style={styles.selectedIndicator}>
                            <IC_FONT_AWESOME6
                                name="check" size={14}
                                color={GRADIANTS_COLORS.primary[0]}
                                style={styles.checkIcon}
                            />
                        </View>}
                        <View style={styles.glowEffect} />
                    </View>
                </LinearGradient>
            ) : (
                <LinearGradient
                    colors={GRADIANTS_COLORS.cardGradient}
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}>
                    <View style={styles.cardContent}>
                        {(isInterestScreen) && <View style={[styles.iconWrapper]}>
                            <IC_MATERIAL
                                name={item?.icon} size={26}
                                color={GRADIANTS_COLORS.primary[0]}
                            />
                        </View>}
                        {item?.code && <Text style={styles.code}>{item?.code}</Text>}
                        {item?.name && <Text style={styles.name}>{item?.name}</Text>}
                    </View>
                </LinearGradient>
            )}
        </TouchableOpacity>
    </Animated.View>
    );
};

export default SelectionItemCardCompo;

const stylesFN = ({ col, GRADIANTS_COLORS }: defStyObjType) => StyleSheet.create({
    /* CARD STYLES */
    cardShadow: {
        shadowColor: col.BLACK05,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },

    card: {
        width: (_WIDTH - 60) / 2,
        height: (_WIDTH - 60) / 2 * 0.9,
        borderRadius: 18,
        padding: 18,
        borderWidth: 2,
        borderColor: "rgba(255, 255, 255, 0.9)",
        overflow: "hidden",
    },

    cardSelected: {
        borderColor: "rgba(255, 255, 255, 0.3)",
        shadowColor: col.PRIMARY,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
        elevation: 15,
        transform: [{ scale: 1.02 }],
    },

    cardContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    code: {
        fontSize: 28,
        fontWeight: "900",
        color: col.TEXT_COL,
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.05)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },

    name: {
        fontSize: 14,
        fontWeight: "700",
        color: col.TEXT_COL,
        textAlign: "center",
        letterSpacing: 0.3,
    },

    textSelected: {
        color: col.WHITE,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },

    selectedIndicator: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },

    checkIcon: {
        color: col.PRIMARY,
        fontWeight: "bold",
    },

    glowEffect: {
        position: "absolute",
        top: -15,
        right: -15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        opacity: 0.8,
    },

    iconWrapper: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "rgba(255, 65, 108, 0.1)",
    },

    iconWrapperSelected: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },

    selectionBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },

    selectionBadgeText: {
        color: GRADIANTS_COLORS.primary[0],
        fontSize: 12,
        fontWeight: "800",
    },
})