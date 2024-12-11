// react
import React, { Component } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";

// firebase

// components
import {
  String,
  ScreenView,
  HomoTextInput,
  Button1,
} from "../../components/Basic";

// constants
import { colors, sizeFactor, styles, windowWidth } from "../../constants";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";

export default class SettingPasswordScreen extends Component {
  constructor() {
    super();

    this.state = {
      currentPassword: "",
      newPassword: "",
    };
  }

  editPassword = async () => {
    let successful = false;
    const auth = getAuth();
    const emailCredential = EmailAuthProvider.credential(
      auth.currentUser.email,
      this.state.currentPassword
    );
    try {
      await reauthenticateWithCredential(auth.currentUser, emailCredential);
      updatePassword(auth.currentUser, this.state.newPassword);
      successful = true;
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Thông báo",
        error.toString(),
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");
              this.props.navigation.navigate("SettingScreen");
            },
          },
        ],
        { cancelable: false }
      );
    }

    if (successful) {
      Alert.alert(
        "Thông báo",
        "Bạn đã cập nhật mật khẩu thành công",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");
              this.props.navigation.navigate("SettingScreen");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <ScreenView style={{ backgroundColor: "white" }}>
        <TouchableOpacity>
          <View
            style={{
              margin: sizeFactor,
              alignItems: "center",
              marginTop: sizeFactor * 2,
            }}
          >
            <Image
              source={require("../../assets/others/password.png")}
              style={[
                styles.hugeCategory,
                {
                  opacity: 1,
                  width: styles.hugeCategory.height - sizeFactor * 1.25,
                  height: styles.hugeCategory.height - sizeFactor * 1.25,
                  marginBottom: sizeFactor,
                },
              ]}
            />

            <String style={{ fontWeight: "bold", fontSize: sizeFactor * 1.5 }}>
              Thay đổi mật khẩu
            </String>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: "center", margin: sizeFactor }}>
          <HomoTextInput
            label="Mật khẩu hiện tại"
            placeholder="••••••••••••••••••••••"
            leftIcon={{ name: "lock", color: colors.gray }}
            secureTextEntry={true}
            textContentType="password"
            errorMessage=""
            style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
            value={this.state.currentPassword}
            onChangeText={(text) => this.setState({ currentPassword: text })}
          />
          <HomoTextInput
            label="Mật khẩu mới"
            placeholder="••••••••••••••••••••••"
            leftIcon={{
              name: "lock-plus",
              type: "material-community",
              color: colors.gray,
            }}
            secureTextEntry={true}
            textContentType="password"
            errorMessage=""
            style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
            value={this.state.newPassword}
            onChangeText={(text) => this.setState({ newPassword: text })}
          />
        </View>
        <View
          style={{
            alignItems: "stretch",
            marginHorizontal: sizeFactor * 3,
            marginVertical: sizeFactor,
          }}
        >
          <Button1 onPress={() => this.editPassword()}>Xác nhận</Button1>
        </View>
      </ScreenView>
    );
  }
}
