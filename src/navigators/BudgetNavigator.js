// react
import React, { Component } from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import { BudgetScreen, AddBudgetScreen, EditBudgetScreen } from "../screens";

const Stack = createStackNavigator();

export default class BudgetNavigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="BudgetScreen"
          component={BudgetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddBudgetScreen"
          component={AddBudgetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditBudgetScreen"
          component={EditBudgetScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
