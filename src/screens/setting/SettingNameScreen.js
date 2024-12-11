// react
import React, { Component } from "react";
import {
    View,
    Image,
    Alert,
} from "react-native";

// firebase

// redux
import { connect } from "react-redux";

// components
import {
    String,
    ScreenView,
    HomoTextInput,
    Button1,
} from "../../components/Basic";

// constants
import {
    colors,
    sizeFactor,
    styles,
    windowWidth
} from "../../constants";
import { getAuth, reload, updateProfile } from "firebase/auth";
import { userRef } from "../../database/firebase/firebase";
import { child } from "firebase/database";

class SettingNameScreen extends Component {
    constructor() {
        super();

        this.state = {
            userName: getAuth().currentUser.displayName,
        };
    }

    editUserInfo = async () => {
        let successful = false;
        const user = getAuth().currentUser;
        await updateProfile(user, {
            displayName: this.state.userName,
        });
        const dbRef = child(userRef, `${user.uid}/profile`);
        await update(dbRef, {
            name: user.displayName,
        });
        successful = true;
        if (successful) {
            this.props.editUserName(this.state.userName);
            Alert.alert(
                "Thông báo",
                "Bạn đã cập nhật thông tin thành công",
                [
                    {
                        text: "OK",
                        onPress: async () => {
                            const auth = getAuth();
                            await reload(auth);

                            this.props.navigation.goBack();
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    render() {
        const email = getAuth().currentUser.email;

        return (
            <ScreenView style={{ backgroundColor: "white" }}>
                <View
                    style={{ margin: sizeFactor, alignItems: "center", marginTop: sizeFactor * 2 }}
                >
                    <Image
                        source={require("../../assets/others/info.png")}
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
                        Thông tin người dùng
                    </String>
                </View>
                <View style={{ alignItems: "center", margin: sizeFactor }}>
                    <HomoTextInput
                        label="Email"
                        placeholder="Email không thay đổi được"
                        leftIcon={{
                            type: "material-community",
                            name: "email",
                            color: colors.gray,
                        }}
                        secureTextEntry={true}
                        textContentType="emailAddress"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                        keyboardType="email-address"
                        disabled={true}
                        value={email}
                    />
                    <HomoTextInput
                        label="Họ Và Tên"
                        placeholder="Họ và tên"
                        leftIcon={{
                            type: "material-community",
                            name: "account-circle",
                            color: colors.gray,
                        }}
                        textContentType="name"
                        errorMessage=""
                        style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
                        value={this.state.userName}
                        onChangeText={(text) => {
                            this.setState({ userName: text });
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: "stretch",
                        marginHorizontal: sizeFactor * 3,
                        marginVertical: sizeFactor,
                    }}
                >
                    <Button1 onPress={() => this.editUserInfo()}>Xác nhận</Button1>
                </View>
            </ScreenView>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        editUserName: (name) => {
            dispatch(editUserName(name));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingNameScreen);
