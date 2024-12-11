// react
import React, { Component } from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
  WalletScreen,
  AddWalletScreen,
  AddTransactionScreen,
  EditWalletScreen,
  WalletTransferScreen,
} from "../screens";

const WalletStack = createStackNavigator();

export default class WalletNavigator extends Component {
  render() {
    return (
      <WalletStack.Navigator
        screenOptions={{
          headerShown: true,
          headerBackTitle: " ",
          headerBackTitleVisible: false,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 300,
                useNativeDriver: true
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 300,
                useNativeDriver: true
              },
            },
          },
        }}
      >
        <WalletStack.Screen
          name="Ví"
          component={WalletScreen}
          options={{ headerShown: false }}
        />
        <WalletStack.Screen
          name="AddWalletScreen"
          component={AddWalletScreen}
          options={{ title: "Tạo ví mới" }}
        />
        <WalletStack.Screen
          name="EditWalletScreen"
          component={EditWalletScreen}
          options={{ title: "Sửa ví" }}
        />
        <WalletStack.Screen
          name="AddTransactionScreen"
          component={AddTransactionScreen}
          options={{ title: "Tạo giao dịch" }}
        />
        <WalletStack.Screen
          name="WalletTransferScreen"
          component={WalletTransferScreen}
          options={{ title: "Chuyển tiền qua ví" }}
        />
      </WalletStack.Navigator>
    );
  }
}
