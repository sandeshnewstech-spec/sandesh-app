// CustomBottomTab.tsx
import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

interface IconProps {
    name: string;
    focused: boolean;
}

// Replace these with your actual icon components (e.g., from react-native-vector-icons)
const HomeIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.icon, focused && styles.iconFocused]}>
        <View style={styles.iconShape} />
    </View>
);

const SearchIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.icon, focused && styles.iconFocused]}>
        <View style={[styles.iconShape, { borderRadius: 12 }]} />
    </View>
);

const AddIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.icon, focused && styles.iconFocused]}>
        <View style={[styles.iconShape, { transform: [{ rotate: '45deg' }] }]} />
    </View>
);

const NotificationIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.icon, focused && styles.iconFocused]}>
        <View style={[styles.iconShape, { borderRadius: 8 }]} />
    </View>
);

const ProfileIcon = ({ focused }: { focused: boolean }) => (
    <View style={[styles.icon, focused && styles.iconFocused]}>
        <View style={[styles.iconShape, { borderRadius: 50 }]} />
    </View>
);

const CustomBottomTab: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    const tabCount = state.routes.length;
    const tabWidth = width / tabCount;

    // Animated values
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);

    // Update position when tab changes
    useEffect(() => {
        translateX.value = withSpring(state.index * tabWidth, {
            damping: 15,
            stiffness: 90,
        });
    }, [state.index, tabWidth]);

    // Animated style for the moving indicator
    const indicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { scale: scale.value },
            ],
        };
    });

    // Animated style for icons
    const getIconAnimatedStyle = (index: number) => {
        return useAnimatedStyle(() => {
            const isFocused = index === state.index;
            const inputRange = [index - 1, index, index + 1];

            const scaleValue = interpolate(
                translateX.value / tabWidth,
                inputRange,
                [0.8, 1.2, 0.8],
                'clamp'
            );

            const translateY = interpolate(
                translateX.value / tabWidth,
                inputRange,
                [0, -8, 0],
                'clamp'
            );

            return {
                transform: [
                    { scale: isFocused ? scaleValue : 1 },
                    { translateY: isFocused ? translateY : 0 },
                ],
            };
        });
    };

    // Pan gesture for dragging between tabs
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            const newTranslateX = state.index * tabWidth + event.translationX;
            if (newTranslateX >= 0 && newTranslateX <= (tabCount - 1) * tabWidth) {
                translateX.value = newTranslateX;
            }
        })
        .onEnd((event) => {
            const targetIndex = Math.round(translateX.value / tabWidth);
            const clampedIndex = Math.max(0, Math.min(tabCount - 1, targetIndex));

            translateX.value = withSpring(clampedIndex * tabWidth, {
                damping: 15,
                stiffness: 90,
            });

            if (clampedIndex !== state.index) {
                navigation.navigate(state.routes[clampedIndex].name);
            }
        });

    const iconComponents = [HomeIcon, SearchIcon, AddIcon, NotificationIcon, ProfileIcon];

    return (
        <GestureDetector gesture={panGesture}>
            <View style={styles.container}>
                {/* Animated Background Indicator */}
                <Animated.View style={[styles.indicator, indicatorStyle, { width: tabWidth }]}>
                    <View style={styles.indicatorInner} />
                </Animated.View>

                {/* Tab Buttons */}
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    const IconComponent = iconComponents[index] || HomeIcon;

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

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabButton}
                            activeOpacity={0.7}
                        >
                            <Animated.View style={getIconAnimatedStyle(index)}>
                                <IconComponent focused={isFocused} />
                            </Animated.View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 70,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        height: 50,
        top: 10,
        borderRadius: 25,
        backgroundColor: '#F0F4FF',
    },
    indicatorInner: {
        flex: 1,
        backgroundColor: '#E8EFFF',
        borderRadius: 25,
        margin: 4,
    },
    icon: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconFocused: {
        tintColor: '#4A90E2',
    },
    iconShape: {
        width: 20,
        height: 20,
        backgroundColor: '#999',
    },
});

export { CustomBottomTab };

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Your screen components
const HomeScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;
const SearchScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;
const AddScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;
const NotificationScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;
const ProfileScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;

export default function TempBottom() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomBottomTab {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Add" component={AddScreen} />
            <Tab.Screen name="Notifications" component={NotificationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}