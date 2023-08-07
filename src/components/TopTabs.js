import React from 'react';
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

export default TopTabs;
