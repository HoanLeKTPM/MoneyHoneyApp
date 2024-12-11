// react
import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  StatusBar,
} from "react-native";

// firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// other packages
import * as Notifications from 'expo-notifications';
import { Permissions } from "expo-permissions";

// components
import {
  HomoTextInput,
  Button1,
  Button2,
  Button3,
} from "../../components/Basic";

// constants
import { sizeFactor, windowWidth } from "../../constants/ruler";
import { colors } from "../../constants/colors";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage !== "") {
      Alert.alert("Thông báo", errorMessage);
    }
  }, [errorMessage]);

  const reset = () => {
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  const userLogin = () => {
    if (email === "" || password === "") {
      setErrorMessage("Không thể để trống email hoặc password!");
      Alert.alert("Thông báo", errorMessage);
    } else {
      setIsLoading(true);

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User logged-in successfully!");
          reset();
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Tài khoản đã được sử dụng.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Email không hợp lệ!");
          } else if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            setErrorMessage("Email hoặc mật khẩu không đúng.");
          }
          Alert.alert("Thông báo", errorMessage);
          console.log(error.code);
        });
      Notifications.dismissAllNotificationsAsync();
      askPermissions();
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../assets/others/background.png")}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
      >
        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/others/logo.png")}
            style={{
              height: sizeFactor * 8,
              width: sizeFactor * 8 * 1.42489270386,
              marginBottom: sizeFactor * 2,
            }}
          />
          <View
            style={{
              backgroundColor: "white",
              padding: sizeFactor,
              alignItems: "center",
              borderWidth: 0,
              borderRadius: sizeFactor,
              marginBottom: sizeFactor * 4,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: sizeFactor * 1.25,
                fontWeight: "bold",
                marginBottom: sizeFactor,
                marginTop: sizeFactor / 2,
              }}
            >
              Đăng nhập
            </Text>
            <HomoTextInput
              label="Email"
              placeholder="example@mail.com"
              leftIconName="email"
              textContentType="email"
              keyboardType="email-address"
              errorMessage=""
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
            <HomoTextInput
              label="Mật khẩu"
              placeholder="••••••••••••••••••••••"
              leftIcon={{ name: "lock", color: colors.gray }}
              secureTextEntry={true}
              textContentType="password"
              errorMessage=""
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
            <View
              style={{
                width: windowWidth - sizeFactor * 8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: sizeFactor / 2,
              }}
            >
              <Button2
                style={{ width: sizeFactor * 8.5 }}
                onPress={() => navigation.navigate("SignUp")}
              >
                Đăng ký
              </Button2>
              <Button1
                style={{ width: sizeFactor * 8.5 }}
                onPress={() => userLogin()}
              >
                Đăng nhập
              </Button1>
            </View>
            <Button3 onPress={() => console.log(getAuth().currentUser)}>
              Quên mật khẩu
            </Button3>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

// class SignInScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       isLoading: false,
//       errorMessage: "",
//     };
//   }

//   updateInputVal = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   };

//   userLogin = () => {
//     if (this.state.email === "" || this.state.password === "") {
//       Alert.alert("Tài khoản hoặc mật khẩu không đúng!");
//     } else {
//       this.setState({
//         isLoading: true,
//       });
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(this.state.email, this.state.password)
//         .then((res) => {
//           //console.log(res)
//           console.log("User logged-in successfully!");
//           this.setState({
//             isLoading: false,
//             email: "",
//             password: "",
//           });
//           this.props.signIn();
//           //console.log(this.props.isSignedIn);
//           //this.props.navigation.navigate('Main')
//         })
//         .catch((error) => this.setState({ errorMessage: error.message }));
//       console.log(this.state.errorMessage);
//       Notifications.dismissAllNotificationsAsync();
//       this.askPermissions();
//     }
//   };
//   askPermissions = async () => {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       return false;
//     }
//     return true;
//   };

//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <ImageBackground
//           source={require("../../assets/others/background.png")}
//           style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
//         >
//           <View
//             style={{
//               flex: 1,
//               alignContent: "center",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Image
//               source={require("../../assets/others/logo.png")}
//               style={{
//                 height: sizeFactor * 8,
//                 width: sizeFactor * 8 * 1.42489270386,
//                 marginBottom: sizeFactor * 2,
//               }}
//             />
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: sizeFactor,
//                 alignItems: "center",
//                 borderWidth: 0,
//                 borderRadius: sizeFactor,
//                 marginBottom: sizeFactor * 4,
//               }}
//             >
//               <Text
//                 style={{
//                   alignSelf: "center",
//                   fontSize: sizeFactor * 1.25,
//                   fontWeight: "bold",
//                   marginBottom: sizeFactor,
//                   marginTop: sizeFactor / 2,
//                 }}
//               >
//                 Đăng nhập
//               </Text>
//               <HomoTextInput
//                 label="Email"
//                 placeholder="example@mail.com"
//                 leftIconName="email"
//                 textContentType="email"
//                 keyboardType="email-address"
//                 errorMessage=""
//                 value={this.state.email}
//                 onChangeText={(val) => this.updateInputVal(val, "email")}
//               />
//               <HomoTextInput
//                 label="Mật khẩu"
//                 placeholder="••••••••••••••••••••••"
//                 leftIcon={{ name: "lock", color: colors.gray }}
//                 secureTextEntry={true}
//                 textContentType="password"
//                 errorMessage=""
//                 value={this.state.password}
//                 onChangeText={(val) => this.updateInputVal(val, "password")}
//               />
//               <View
//                 style={{
//                   width: windowWidth - sizeFactor * 8,
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginTop: sizeFactor / 2,
//                 }}
//               >
//                 <Button2
//                   style={{ width: sizeFactor * 8.5 }}
//                   onPress={() => this.props.navigation.navigate("SignUp")}
//                 >
//                   Đăng ký
//                 </Button2>
//                 <Button1
//                   style={{ width: sizeFactor * 8.5 }}
//                   onPress={() => this.userLogin()}
//                 >
//                   Đăng nhập
//                 </Button1>
//               </View>
//               <Button3 onPress={() => console.log(firebase.auth().currentUser)}>
//                 Quên mật khẩu
//               </Button3>
//             </View>
//           </View>
//         </ImageBackground>
//       </View>
//     );
//   }
// }

export default SignInScreen;
