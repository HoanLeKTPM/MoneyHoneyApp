// react
import React, { Component } from "react";
import { View } from "react-native";

// other packages
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native";

// Import trực tiếp từ các file thay vì qua index
import CategoryNavigator from "./CategoryNavigator";
import TransactionNavigator from "./TransactionNavigator";
import SettingNavigator from "./SettingNavigator";
import WalletNavigator from "./WalletNavigator";
import TabBarNavigator from "./TabBarNavigator";


const Stack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (!routeName) {
    return "Ví";
  }
  switch (routeName) {
    case "Transactions":
      return "Giao dịch";
    case "Report":
      return "Báo cáo";
    case "Wallet":
      return "Ví";
    case "Settings":
      return "Cài đặt";
    default:
      return routeName;
  }
}

export default class MainNavigator extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerShown: true,
          })}
          name="TabBarNavigator"
          component={TabBarNavigator}
        />
        <Stack.Screen 
        name="WalletNavigator" 
        component={WalletNavigator}
        options={{
          title: "Ví",
          headerShown: false
        }}
        />
        <Stack.Screen
          name="TransactionNavigator"
          component={TransactionNavigator}
          options={{
            title: "Giao dịch",
            headerShown: false
          }}
        />
        <Stack.Screen 
        name="CategoryNavigator" 
        component={CategoryNavigator} 
        options={{
          title: "Báo cáo",
          headerShown: false
        }}
        />
        <Stack.Screen 
        name="SettingNavigator" 
        component={SettingNavigator}
        options={{
          title: "Cài đặt",
          headerShown: false
        }}
        />
      </Stack.Navigator>
    );
  }
}
