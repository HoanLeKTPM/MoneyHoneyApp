import React, { Component } from "react";
import { View, Platform, StatusBar } from "react-native";
import {
  String,
  ScreenView,
  Row,
  Wallet,
  Title,
  AddWalletButton,
  Space,
  NormalCard,
  LooseDivider,
} from "../../components/Basic";
import { colors } from "../../constants/colors";
import { sizeFactor } from "../../constants/ruler";
import { FlatList } from "react-native-gesture-handler";
//firebase
import * as firebase from "firebase";

//redux
import { connect } from "react-redux";

//const rootRef = firebase.database().ref();
//const walletRef = rootRef.child('Wallet');

import { userRef } from "../../components/DataConnect";

//Redux action
import { UpdateWalletAction, SelectWallet } from "../../redux/actions";

import toMoneyString, {
  toMoneyStringWithoutVND,
} from "../../components/toMoneyString";
import { AdMobBanner } from "expo-ads-admob";

// await setTestDeviceIDAsync("EMULATOR");

// const adUnitID = Platform.select({
//   // https://developers.google.com/admob/ios/test-ads
//   ios: "ca-app-pub-3940256099942544~1458002511",
//   // https://developers.google.com/admob/android/test-ads
//   android: "ca-app-pub-3940256099942544~3347511713",
// });
export class WalletScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let uid = "none";
    if (firebase.auth().currentUser) {
      uid = firebase.auth().currentUser.uid;
    }
    const userWalletRef = userRef.child(uid).child("Wallet");
    userWalletRef.on("value", (snap) => {
      this.props.Update(snap);
    });
  }
  tinhtong() {
    var i = 0;
    this.props.walletData.forEach((item) => {
      i += parseInt(item.money);
    });
    return i;
  }
  render() {
    return (
      <ScreenView disablePress={this.props.disablePress}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View>
          <AdMobBanner
            bannerSize="smartBannerLandscape"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds={true} // true or false
            onDidFailToReceiveAdWithError={(error) => console.log(error)}
          />
        </View>
        <View style={{}}>
          <NormalCard
            style={{
              alignItems: "stretch",
              marginBottom: sizeFactor * 2,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <String
                style={{
                  fontSize: sizeFactor,
                  fontWeight: "bold",
                  color: colors.gray,
                }}
              >
                Số dư toàn bộ ví
              </String>
            </View>
            <LooseDivider />
            <View style={{ alignItems: "center" }}>
              <String style={{ fontSize: sizeFactor * 2 }}>
                {toMoneyString(this.tinhtong())}
              </String>
            </View>
          </NormalCard>
        </View>
        <Row>
          <Title>Quản lí ví</Title>
          <View
            style={{
              alignSelf: "flex-end",
              marginBottom: sizeFactor,
              marginRight: sizeFactor,
              flexDirection: "row",
            }}
          >
            <AddWalletButton
              color={colors.blue}
              onPress={() => {
                this.props.navigation.navigate("WalletNavigator", {
                  screen: "AddWalletScreen",
                });
              }}
            />
          </View>
        </Row>
        <FlatList
          data={this.props.walletData}
          renderItem={({ item }) => {
            return (
              <Wallet
                heading={item.name}
                color={item.color}
                date={item.date}
                isDefault={item.isDefault}
                onPressDefault={() => {
                  if (item.isDefault == "false") {
                    defaultChanged(item);
                  }
                }}
                onPressEdit={() => {
                  this.props.SelectWallet(item);
                  this.props.navigation.navigate("WalletNavigator", {
                    screen: "EditWalletScreen",
                  });
                }}
                onPressSuDung={() => {
                  this.props.SelectWallet(item);
                  this.props.navigation.navigate({
                    name: "WalletTransferScreen",
                  });
                }}
              >
                {toMoneyStringWithoutVND(item.money)}
              </Wallet>
            );
          }}
        ></FlatList>
        <Space />
      </ScreenView>
    );
  }
}

defaultChanged = (walletItem) => {
  let uid = "none";
  if (firebase.auth().currentUser) {
    uid = firebase.auth().currentUser.uid;
  }
  const userWalletRef = userRef.child(uid).child("Wallet");
  userWalletRef.once("value", (snap) => {
    snap.forEach((element) => {
      if (element.toJSON().isDefault == "true") {
        userWalletRef.child(element.key).update({
          //name: element.toJSON().name,
          //color: element.toJSON().color,
          //date: element.toJSON().date,
          //money: element.toJSON().money,
          isDefault: "false",
        });
      }
    });
  });
  userWalletRef.child(walletItem.key).update({
    //name: walletItem.name,
    //color: walletItem.color,
    //date:walletItem.date,
    //money: walletItem.money,
    isDefault: "true",
  });
};

//redux define container

const mapStateToProps = (state) => {
  return {
    walletData: state.WalletReducer,
    //selectedWallet: state.selectedWalletReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Update: (snap) => {
      dispatch(UpdateWalletAction(snap));
    },
    SelectWallet: (value) => {
      dispatch(SelectWallet(value));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

// var WalletData = [
//     {
//         key: "WL000001",
//         name: "Ví chính",
//         color: "#5856d6",
//         date: "20/08/2020",
//         isDefault: "true",
//         money: "1,500,000",
//     },
//     {
//         key: "WL000002",
//         name: "Ví cho người yêu",
//         color: "#ff2d55",
//         date: "01/01/2014",
//         isDefault: "false",
//         money: "25,000,000",
//     },
//     {
//         key: "WL000003",
//         name: "Tiền dưỡng già",
//         color: "#ff9500",
//         date: "01/01/2018",
//         isDefault: "false",
//         money: "5,000,000",
//     },
// ];
