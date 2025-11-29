import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import PressableScaleXCompo from './XCompos/PressableScaleXCompo'
import { useThemeX } from 'hooks';
import LinearGradient from 'react-native-linear-gradient';
import { defStyObjType, PressableScaleXCompoProps } from 'types';
import { btnRadius } from 'utils';
import { IC_FONT_AWESOME6 } from 'assets';

type P = {
    linearStyle?: ViewStyle;
}

const ButtonOneCompo = (proprs: PressableScaleXCompoProps & P) => {
    const { col, GRADIANTS_COLORS, defStyOBJ } = useThemeX();
    const styles = stylesFN(defStyOBJ);
    return (
        <PressableScaleXCompo
            rippleColor={col.TRANSPARENT}
            activeOpacity={0.9}
            {...proprs}>
            <View style={styles.button} >
                <LinearGradient
                    colors={GRADIANTS_COLORS.buttonGradient}
                    style={[styles.buttonGradient, proprs?.linearStyle]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    {proprs?.children}
                </LinearGradient>
            </View>
        </PressableScaleXCompo>
    )
}

export default ButtonOneCompo

const stylesFN = ({ col, font }: defStyObjType) => StyleSheet.create({
    /* BUTTON STYLES */
    buttonContainer: {
        position: "absolute",
        bottom: 35,
        left: 20,
        right: 20,
        // shadowColor: GRADIANTS_COLORS.primary[0],
        // shadowOffset: { width: 0, height: 12 },
        // shadowOpacity: 0.5,
        // shadowRadius: 25,
        // elevation: 12,
    },

    button: {
        borderRadius: btnRadius,
        overflow: "hidden",
    },

    buttonGradient: {
        paddingVertical: 18,
        paddingHorizontal: 28,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
})