// react
import React, { Component } from "react";
import { Alert, View } from "react-native";

// other packages
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionButton from "react-native-circular-action-menu";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";

// screens
import {
  TransactionScreen,
  ReportScreen,
  WalletScreen,
  SettingScreen,
} from "../screens";

import { colors } from "../constants/colors";
import { windowHeight, windowWidth } from "../constants";
import { SettingNavigator, WalletNavigator } from ".";

//Navigator
const Tab = createBottomTabNavigator();

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

export const ButtonMenuBackdrop = ({ onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        width: windowWidth,
        height: windowHeight,
        zIndex: 5,
        backgroundColor: "black",
        opacity: 0.15,
      }}
      pointerEvents="none"
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          position: "absolute",
          backgroundColor: "pink",
          zIndex: 5,
          height: windowHeight - 225,
          width: windowWidth,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          position: "absolute",
          backgroundColor: "green",
          zIndex: 4,
          height: windowHeight - 140,
          width: windowWidth / 2 - 90,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignSelf: "flex-end",
          flex: 1,
          position: "absolute",
          backgroundColor: "blue",
          zIndex: 4,
          height: windowHeight - 140,
          width: windowWidth / 2 - 90,
        }}
      />
    </View>
  );
};

export const BackDrop = ({ onPress }) => {
  return [
    <View
      style={{
        flex: 1,
        position: "absolute",
        width: windowWidth,
        height: windowHeight,
        zIndex: 5,
        backgroundColor: "black",
        opacity: 0.15,
      }}
      pointerEvents="none"
    />,
    <View
      style={{
        flex: 1,
        position: "absolute",
        zIndex: 5,
        height: windowHeight - 225,
        width: windowWidth,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          zIndex: 6,
          // flex: 1,
          // alignSelf: "stretch",
          height: windowHeight - 225,
          width: windowWidth,
        }}
      />
    </View>,
    <View
      style={{
        flex: 1,
        position: "absolute",
        zIndex: 5,
        height: windowHeight - 140,
        width: windowWidth / 2 - 90,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          zIndex: 6,
          // flex: 1,
          // alignSelf: "stretch",
          height: windowHeight - 140,
          width: windowWidth / 2 - 90,
        }}
      />
    </View>,
    <View
      style={{
        flex: 1,
        position: "absolute",
        zIndex: 5,
        alignSelf: "flex-end",
        height: windowHeight - 140,
        width: windowWidth / 2 - 90,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          zIndex: 6,
          // flex: 1,
          alignSelf: "flex-end",
          height: windowHeight - 140,
          width: windowWidth / 2 - 90,
        }}
      />
    </View>,
  ];
};

export default class TabBarNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
    this.menuRef = React.createRef();
  }

  onBackdropPress() {
    this.menuRef.current.reset();
    this.setState({ menuActive: false });
  }

  render() {
    this.props.navigation.setOptions({
      headerTitle: getHeaderTitle(this.props.route),
    });
    return (
      <View style={{ flex: 1 }}>
        {this.state.menuActive && (
          <BackDrop onPress={() => this.onBackdropPress()} />
        )}
        <Tab.Navigator
          initialRouteName="Wallet"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Transactions") {
                iconName = "swap-horizontal";
              } else if (route.name === "Settings") {
                iconName = "cog";
              } else if (route.name === "Report") {
                iconName = "chart-timeline-variant";
              } else if (route.name === "Wallet") {
                iconName = "credit-card-outline";
              }

              // You can return any component that you like here!
              return (
                <Icon
                  name={iconName}
                  type="material-community"
                  color={color}
                  size={25}
                />
              );
            },
          })}
          tabBarOptions={{
            // activeTintColor: colors.greenDark,
            // inactiveTintColor: colors.dark,
            keyboardHidesTabBar: true,
            showIcon: true,
            style: {
              backgroundColor: "white",
              bottom: 0,
              left: 0,
              right: 0,
              height: 55,
            },
            labelStyle: {
              marginBottom: 4,
              fontSize: 11,
            },
          }}
        >
          <Tab.Screen
            name="Transactions"
            component={TransactionScreen}
            options={{ title: "Các giao dịch" }}
          />

          <Tab.Screen
            name="Report"
            options={{ title: "Báo cáo" }}
            component={ReportScreen}
          />

          <Tab.Screen
            name="Add"
            component={ActionButton}
            options={{
              tabBarButton: (props) => (
                <View
                  style={{
                    width: 60,
                  }}
                >
                  <ActionButton
                    // buttonColor={colors.yellow}
                    // autoInactive={true}
                    style={{ backgroundColor: "pink" }}
                    active={this.state.menuActive}
                    ref={this.menuRef}
                    size={60}
                    degrees={315}
                    onPress={() => {
                      this.setState({ menuActive: !this.state.menuActive });
                    }}
                    //onOverlayPress={()=>{console.log("a")}}
                    icon={
                      <Icon
                        name="plus"
                        type="material-community"
                        color="white"
                        size={35}
                      />
                    }
                    radius={80}
                  >
                    <ActionButton.Item buttonColor="#transparent">
                      <View></View>
                    </ActionButton.Item>

                    <ActionButton.Item
                      buttonColor={colors.greenDark}
                      size={50}
                      title="Thu"
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.onBackdropPress();
                          this.props.navigation.navigate("WalletNavigator", {
                            screen: "AddTransactionScreen",
                            params: { typeID: "003" },
                          });
                        }}
                      >
                        <Icon
                          name="database-plus"
                          type="material-community"
                          color="white"
                        />
                      </TouchableOpacity>
                    </ActionButton.Item>

                    <ActionButton.Item
                      buttonColor={colors.indigo}
                      size={50}
                      title="Chuyển ví"
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.onBackdropPress();

                          this.props.navigation.navigate("WalletNavigator", {
                            screen: "WalletTransferScreen",
                          });
                        }}
                      >
                        <Icon
                          name="wallet"
                          type="material-community"
                          color="white"
                        />
                      </TouchableOpacity>
                    </ActionButton.Item>
                    <ActionButton.Item
                      buttonColor="#F55555"
                      size={50}
                      title="Chi"
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.onBackdropPress();
                          this.props.navigation.navigate("WalletNavigator", {
                            screen: "AddTransactionScreen",
                            params: { typeID: "002" },
                          });
                        }}
                      >
                        <Icon
                          name="database-minus"
                          type="material-community"
                          color="white"
                        />
                      </TouchableOpacity>
                    </ActionButton.Item>

                    <ActionButton.Item buttonColor="#transparent">
                      <View></View>
                    </ActionButton.Item>
                  </ActionButton>
                </View>
              ),
            }}
          ></Tab.Screen>
          <Tab.Screen
            name="Wallet"
            component={WalletScreen}
            options={{ title: "Các ví" }}
          />
          <Tab.Screen
            name="Settings"
            options={{ title: "Tùy chỉnh" }}
            component={SettingScreen}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
