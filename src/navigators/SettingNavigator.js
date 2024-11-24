// react
import React, { Component } from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
  SettingScreen,
  SettingAlertScreen,
  SettingNameScreen,
  SettingPasswordScreen,
  BudgetScreen,
  ExchangeScreen,
  InterestScreen,
  AddBudgetScreen,
  EditBudgetScreen,
  CategoryScreen,
  AddCategoryScreen,
  EditCategoryScreen,
} from "../screens";

// navigators
import CategoryNavigator from "./CategoryNavigator";
import BudgetNavigator from "./BudgetNavigator";

const SettingStack = createStackNavigator();

export default class SettingScreensNavigator extends Component {
  render() {
    return (
      <SettingStack.Navigator>
        <SettingStack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        <SettingStack.Screen
          name="SettingNameScreen"
          component={SettingNameScreen}
          options={{ title: "Thông tin người dùng" }}
        />
        <SettingStack.Screen
          name="SettingPasswordScreen"
          component={SettingPasswordScreen}
          options={{ title: "Thay đổi mật khẩu" }}
        />
        <SettingStack.Screen
          name="SettingAlertScreen"
          component={SettingAlertScreen}
          options={{ title: "Thông báo" }}
        />
        <SettingStack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{ title: "Quản lý danh mục" }}
        />
        <SettingStack.Screen
          name="AddCategoryScreen"
          component={AddCategoryScreen}
          options={{ title: "Thêm danh mục" }}
        />
        <SettingStack.Screen
          name="EditCategoryScreen"
          component={EditCategoryScreen}
          options={{ title: "Xem danh mục" }}
        />
        <SettingStack.Screen
          name="BudgetScreen"
          component={BudgetScreen}
          options={{ title: "Quản lý hạn mức" }}
        />
        <SettingStack.Screen
          name="AddBudgetScreen"
          component={AddBudgetScreen}
          options={{ title: "Thêm hạn mức" }}
        />
        <SettingStack.Screen
          name="EditBudgetScreen"
          component={EditBudgetScreen}
          options={{ title: "Xem hạn mức" }}
        />
        <SettingStack.Screen
          name="ExchangeScreen"
          component={ExchangeScreen}
          options={{ title: "Chuyển đổi ngoại tệ" }}
        />
        <SettingStack.Screen
          name="InterestScreen"
          component={InterestScreen}
          options={{ title: "Tính lãi suất nâng cao" }}
        />
      </SettingStack.Navigator>
    );
  }
}
