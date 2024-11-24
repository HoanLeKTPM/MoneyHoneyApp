// react
import React, { Component } from "react";

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

export default class CategoryNavigator extends Component {

    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="CategoryScreen"
                    component={CategoryScreen}
                />
                <Stack.Screen
                    name="AddCategoryScreen"
                    component={AddCategoryScreen}
                    options={{ headerShown: true, title: "Thêm danh mục" }}
                />
                <Stack.Screen
                    name="EditCategoryScreen"
                    component={EditCategoryScreen}
                    options={{
                        headerShown: true,
                        title: "Xem danh mục",
                    }}
                />
            </Stack.Navigator>
        );
    }
}
