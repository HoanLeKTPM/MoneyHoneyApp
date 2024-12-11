// react
import React, { Component } from "react";
import { View } from "react-native";

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
import SettingNavigator from "./SettingNavigator";
import WalletNavigator from "./WalletNavigator";

const Tab = createBottomTabNavigator();

// Tách các component con ra riêng
const EmptyComponent = () => null;

const EmptyView = () => <View />;

const ActionButtonItem = ({ buttonColor, size, title, iconName, onPress }) => (
  <ActionButton.Item
    buttonColor={buttonColor}
    size={size}
    title={title}
  >
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={iconName}
        type="material-community"
        color="white"
      />
    </TouchableOpacity>
  </ActionButton.Item>
);

const BackDrop = ({ onPress }) => (
  <>
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
    />
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        zIndex: 6,
        height: windowHeight - 225,
        width: windowWidth,
      }}
    />
  </>
);

export default class TabBarNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
    this.menuRef = React.createRef();
  }

  onBackdropPress = () => {
    this.menuRef.current?.reset();
    this.setState({ menuActive: false });
  };

  getTabBarIcon = (route) => ({ color }) => {
    const iconMap = {
      Transactions: "swap-horizontal",
      Settings: "cog",
      Report: "chart-timeline-variant",
      Wallet: "credit-card-outline"
    };
    return (
      <Icon
        name={iconMap[route.name]}
        type="material-community"
        color={color}
        size={25}
      />
    );
  };

  render() {
    const { navigation, route } = this.props;
    
    return (
      <View style={{ flex: 1 }}>
        {this.state.menuActive && <BackDrop onPress={this.onBackdropPress} />}
        
        <Tab.Navigator
          initialRouteName="Wallet"
          screenOptions={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'Wallet';
            const titleMap = {
              Transactions: 'Giao dịch',
              Report: 'Báo cáo',
              Wallet: 'Ví',
              Settings: 'Cài đặt',
              Add: ''
            };
            return {
              tabBarIcon: this.getTabBarIcon(route),
              headerTitle: titleMap[routeName],
              tabBarStyle: {
                backgroundColor: "white",
                height: 60,
              },
              tabBarLabelStyle: {
                marginBottom: 4,
                fontSize: 11,
              },
            };
          }}
        >
          <Tab.Screen
            name="Transactions"
            component={TransactionScreen}
            options={{ 
              title: "Giao dịch",
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Report"
            component={ReportScreen}
            options={{ 
              title: "Báo cáo",
              headerShown: false
            }}
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
                    style={{ backgroundColor: "pink" }}
                    active={this.state.menuActive}
                    ref={this.menuRef}
                    size={60}
                    degrees={315}
                    onPress={() => {
                      this.setState({ menuActive: !this.state.menuActive });
                    }}
                    icon={
                      <Icon
                        name="plus"
                        type="material-community"
                        color="white"
                        size={35}
                      />
                    }
                    radius={80}
                    useNativeDriver={true}
                  >
                    <ActionButton.Item 
                        buttonColor="transparent"
                        useNativeDriver={true}
                    >
                        <View></View>
                    </ActionButton.Item>

                    <ActionButton.Item
                      buttonColor={colors.greenDark}
                      size={50}
                      title="Thu"
                      useNativeDriver={true}
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
                      useNativeDriver={true}
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
                      useNativeDriver={true}
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

                    <ActionButton.Item 
                    buttonColor="#transparent"
                    useNativeDriver={true}>
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
            options={{ 
              title: "Ví",
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingScreen}
            options={{ 
              title: "Cài đặt",
              headerShown: false
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
