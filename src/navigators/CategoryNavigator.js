// react
import React from 'react';

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
    CategoryScreen,
    EditCategoryScreen,
    AddCategoryScreen,
}
from "../screens"

const Stack = createStackNavigator();

const CategoryNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'white' },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen
                name="CategoryScreen"
                component={CategoryScreen}
            />
            <Stack.Screen
                name="AddCategoryScreen"
                component={AddCategoryScreen}
                options={{
                    headerShown: true,
                    title: "Thêm danh mục",
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />
            <Stack.Screen
                name="EditCategoryScreen"
                component={EditCategoryScreen}
                options={{
                    headerShown: true,
                    title: "Xem danh mục",
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default CategoryNavigator;
