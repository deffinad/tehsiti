import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Kota from '../pages/RuasJalan/Kota';
import Provinsi from '../pages/RuasJalan/Provinsi';
import Lingkungan from '../pages/RuasJalan/Lingkungan';
import Nasional from '../pages/RuasJalan/Nasional';
import { COLORS } from '../contains/index'

const TabArr = [
    {
        route: 'Kota',
        label: 'Kota',
        component: Kota,
    },
    {
        route: 'Provinsi',
        label: 'Provinsi',
        component: Provinsi,
    },
    {
        route: 'Nasional',
        label: 'Nasional',
        component: Nasional,
    },
    {
        route: 'Lingkungan',
        label: 'Lingkungan',
        component: Lingkungan,
    },
];

const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: 'transparent',
                elevation: 0
            },
            tabBarIndicatorStyle: {
                width: 70,
                marginLeft: 15,
                backgroundColor: COLORS.primary
            },
            tabBarPressColor: 'transparent',
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
                fontWeight: '600',
                textTransform: 'capitalize',
                fontSize: 14
            }
        }}>
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                    />
                );
            })}
        </Tab.Navigator>
    );
};

function TabButton({ state, descriptors, navigation, position }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
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
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, padding: 16 }}
                    >
                        <Text style={{ color: isFocused ? COLORS.primary : 'grey' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default TopTabs;
