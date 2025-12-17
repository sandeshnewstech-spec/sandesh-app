import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    SharedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive card dimensions
const CARD_MARGIN = SCREEN_WIDTH * 0.04;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;
const CARD_HEIGHT = CARD_WIDTH * 0.6; // 60% of width for aspect ratio

interface CubeListItemCompoProps {
    index: number;
    scrollY: SharedValue<number>;
    onPress?: () => void;
    backgroundColor?: string;
}

const CubeListItemCompo: React.FC<CubeListItemCompoProps> = ({
    index,
    scrollY,
    onPress,
    backgroundColor = '#4A90E2',
}) => {
    const inputRange = [
        -SCREEN_WIDTH * (index + 1),
        -SCREEN_WIDTH * index,
        -SCREEN_WIDTH * (index - 1),
    ];

    const animatedStyle = useAnimatedStyle(() => {
        // Cube rotation effect
        const rotateY = interpolate(
            scrollY.value,
            inputRange,
            [60, 0, -60],
            Extrapolate.CLAMP
        );

        const translateXOffset = interpolate(
            scrollY.value,
            inputRange,
            [-SCREEN_WIDTH * 0.5, 0, SCREEN_WIDTH * 0.5],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollY.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            scrollY.value,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { perspective: 1000 },
                { translateX: scrollY.value + SCREEN_WIDTH * index + translateXOffset },
                { rotateY: `${rotateY}deg` },
                { scale },
            ],
            opacity,
        };
    });


    return (
        <View style={styles.itemContainer}>
            <Pressable
                onPress={onPress}
            >
                <Animated.View
                    style={[
                        styles.card,
                        { backgroundColor },
                        animatedStyle,
                    ]}
                >
                    <View style={styles.content}>
                    </View>
                </Animated.View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        height: CARD_HEIGHT + CARD_MARGIN,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: CARD_WIDTH * 0.04,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 10,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        backgroundColor: 'red',
        padding: CARD_WIDTH * 0.06,
    },
    title: {
        fontSize: CARD_WIDTH * 0.06,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: CARD_WIDTH * 0.02,
    },
    description: {
        fontSize: CARD_WIDTH * 0.04,
        color: '#FFFFFF',
        opacity: 0.9,
        lineHeight: CARD_WIDTH * 0.055,
    },
    indexBadge: {
        position: 'absolute',
        top: CARD_WIDTH * 0.04,
        right: CARD_WIDTH * 0.04,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: CARD_WIDTH * 0.08,
        width: CARD_WIDTH * 0.1,
        height: CARD_WIDTH * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indexText: {
        fontSize: CARD_WIDTH * 0.045,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default CubeListItemCompo;