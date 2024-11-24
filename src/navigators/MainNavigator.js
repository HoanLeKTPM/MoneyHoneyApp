// react
import React, { Component } from "react";
import { View } from "react-native";

// other packages
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// navigators
import {
  CategoryNavigator,
  TransactionNavigator,
  SettingNavigator,
  WalletNavigator,
  TabBarNavigator,
  BudgetScreen,
  AddBudgetScreen,
} from "./";

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Transactions";

  switch (routeName) {
    case "Transactions":
      return "Các giao dịch";
    case "Report":
      return "Báo cáo";
    case "Wallet":
      return "Các ví";
    case "Settings":
      return "Tùy chỉnh";
  }
}

export default class MainNavigator extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={({ navigation, route }) => ({
            headerTitle: getHeaderTitle(route),
            headerShown: true,

            headerRight: () => <View></View>,
          })}
          name="TabBarNavigator"
          component={TabBarNavigator}
        />
        <Stack.Screen name="WalletNavigator" component={WalletNavigator} />
        <Stack.Screen
          name="TransactionNavigator"
          component={TransactionNavigator}
        />
        <Stack.Screen name="CategoryNavigator" component={CategoryNavigator} />
        <Stack.Screen name="SettingNavigator" component={SettingNavigator} />
      </Stack.Navigator>
    );
  }
}
