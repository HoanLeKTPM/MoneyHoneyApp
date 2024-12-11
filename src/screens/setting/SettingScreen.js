// react
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

// firebase

// redux
import { connect } from "react-redux";
import { signOut, editUserName } from "../../redux/actions";

// other packages
import { Icon } from "react-native-elements";

// components
import {
  String,
  ScreenView,
  NormalCard,
  SettingRow,
} from "../../components/Basic";

// constants
import { colors, sizeFactor } from "../../constants";
import { getAuth, signOut as signOutNe } from "firebase/auth";

class SettingScreen extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
    };
  }

  componentDidMount() {
    this.props.editUserName(getAuth().currentUser.displayName);
  }

  signOut = async () => {
    this.props.signOut();
    const auth = getAuth();
    try {
      await signOutNe(auth);
      console.log(this.props.isSignedIn);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <ScreenView>
        <View style={{ marginBottom: sizeFactor }}>
          <Image
            style={{
              alignSelf: "center",
              width: sizeFactor * 9,
              height: sizeFactor * 9,
              marginBottom: sizeFactor,
            }}
            source={require("../../assets/others/user.png")}
          />
          <Text
            style={{
              fontWeight: "bold",
              alignSelf: "center",
              fontSize: sizeFactor * 1.5,
              marginBottom: sizeFactor * 0.25,
            }}
          >
            {this.props.userName}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: sizeFactor,
              color: colors.gray,
            }}
          >
            {getAuth().currentUser.email}
          </Text>
        </View>
        {/* {<Title style={{ marginBottom: sizeFactor / 4 }}>Cài đặt</Title>} */}
        <NormalCard style={{ paddingHorizontal: 0 }}>
          <SettingRow
            color={colors.yellow}
            iconName="account-circle"
            text="Thông tin người dùng"
            onPress={() =>
              this.props.navigation.navigate("SettingNavigator", {
                screen: "SettingNameScreen",
              })
            }
          />
          <SettingRow
            color={colors.yellow}
            iconName="key"
            text="Thay đổi mật khẩu"
            onPress={() =>
              this.props.navigation.navigate("SettingNavigator", {
                screen: "SettingPasswordScreen",
              })
            }
          />
          <SettingRow
            color={colors.green}
            iconName="currency-cny"
            text="Chuyển đổi ngoại tệ"
            onPress={() => {
              this.props.navigation.navigate("SettingNavigator", {
                screen: "ExchangeScreen",
              });
            }}
          />
          <SettingRow
            color={colors.green}
            iconName="bank-plus"
            text="Tính lãi suất nâng cao"
            onPress={() => {
              this.props.navigation.navigate("SettingNavigator", {
                screen: "InterestScreen",
              });
            }}
          />
          <SettingRow
            color={colors.green}
            iconName="package-variant"
            text="Quản lý danh mục"
            onPress={() => {
              this.props.navigation.navigate("SettingNavigator", {
                screen: "CategoryScreen",
              });
              console.log(getAuth().currentUser.uid);
            }}
          />
          <SettingRow
            color={colors.green}
            iconName="piggy-bank"
            text="Quản lí hạn mức"
            onPress={() =>
              this.props.navigation.navigate("SettingNavigator", {
                screen: "BudgetScreen",
              })
            }
          />
          <SettingRow
            color={colors.blue}
            iconName="bell-ring"
            text="Thông báo"
            onPress={() =>
              this.props.navigation.navigate("SettingNavigator", {
                screen: "SettingAlertScreen",
              })
            }
          />
          <View
            style={{
              marginBottom: sizeFactor / 4,
              paddingHorizontal: sizeFactor,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                marginBottom: sizeFactor * 0.75,
                alignSelf: "center",
              }}
            >
              <Icon
                style={{ marginRight: sizeFactor / 2 }}
                name="logout"
                size={sizeFactor * 1.5}
                type="material-community"
                color={colors.red}
              />
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  color: colors.red,
                  fontSize: sizeFactor,
                }}
                onPress={() => {
                  this.signOut();
                }}
              >
                <Text style={{ color: colors.red }}>Đăng xuất tài khoản</Text>
              </TouchableOpacity>
            </View>
          </View>
        </NormalCard>
        <View
          style={{
            alignItems: "center",
            marginTop: sizeFactor * 4,
            marginHorizontal: sizeFactor * 2,
          }}
        >
        </View>
      </ScreenView>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.userName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editUserName: (name) => {
      dispatch(editUserName(name));
    },
    signOut: () => {
      dispatch(signOut());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
