// react
import React, { Component } from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
    TransactionScreen,
    EditTransactionScreen,
    AddCategoryScreen,
}
from "../screens"

const TransactionStack = createStackNavigator();

export default class TransactionNavigator extends Component {
  render() {
    return (
      <TransactionStack.Navigator>
        <TransactionStack.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{ headerShown: false }}
        />
        <TransactionStack.Screen
          name="EditTransaction"
          component={EditTransactionScreen}
          options={{ headerShown: true, title: "Chỉnh sửa giao dịch" }}
        />
        <TransactionStack.Screen
          name="AddCategoryScreen"
          component={AddCategoryScreen}
          options={{ headerShown: true, title: "Thêm danh mục" }}
        />
      </TransactionStack.Navigator>
    );
  }
}
