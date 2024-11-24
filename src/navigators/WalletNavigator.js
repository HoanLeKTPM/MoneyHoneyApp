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
      <WalletStack.Navigator>
        <WalletStack.Screen
          name="Ví"
          component={WalletScreen}
          options={{ headerShown: false }}
        />
        <WalletStack.Screen
          name="AddWalletScreen"
          component={AddWalletScreen}
          options={{ headerShown: true, title: "Tạo ví mới" }}
        />
        <WalletStack.Screen
          name="EditWalletScreen"
          component={EditWalletScreen}
          options={{ headerShown: true, title: "Sửa ví" }}
        />
        <WalletStack.Screen
          name="AddTransactionScreen"
          component={AddTransactionScreen}
          options={{ headerShown: true, title: "Tạo giao dịch" }}
        />
        <WalletStack.Screen
          name="WalletTransferScreen"
          component={WalletTransferScreen}
          options={{ headerShown: true, title: "Chuyển tiền qua ví" }}
        />
      </WalletStack.Navigator>
    );
  }
}
