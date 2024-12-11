import React, { Component, useState } from "react";
import { View, Platform, StatusBar, TouchableOpacity, Text, StyleSheet } from "react-native";
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

//redux
import { connect } from "react-redux";

//const rootRef = firebase.database().ref();
//const walletRef = rootRef.child('Wallet');

import { userRef } from "../../components/DataConnect";

//Redux action
import { UpdateWalletAction, SelectWallet, deleteWallet } from "../../redux/actions";

import toMoneyString, {
  toMoneyStringWithoutVND,
} from "../../components/toMoneyString";
// import { AdMobBanner } from "expo-ads-admob";
import { getAuth } from "firebase/auth";
import { child, get, onValue, update } from "firebase/database";
import { getDatabase, ref } from 'firebase/database';

export class WalletScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      buttonState: "Sử dụng"
    };
  }
  componentDidMount() {
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet`);
    onValue(userWalletRef, (snap) => {
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
  handleWalletUseState = (wallet) => {
    if (this.state.buttonState === "Sử dụng") {
      this.setState({ buttonState: "Đang sử dụng" });
      this.handleSetDefaultWallet(wallet.key);
    } else {
      this.setState({ buttonState: "Sử dụng" });
    }
  };
  handleSetDefaultWallet = async (walletId) => {
    const db = getDatabase();
    const userId = getAuth().currentUser.uid;
    
    try {
      // Lấy danh sách ví hiện tại
      const walletsRef = ref(db, `users/${userId}/Wallet`);
      const updates = {};
      
      // Lấy snapshot của tất cả ví
      const snapshot = await get(walletsRef);
      const wallets = [];
      snapshot.forEach((child) => {
        wallets.push({
          key: child.key,
          ...child.val()
        });
      });
      
      // Cập nhật trạng thái default
      wallets.forEach(w => {
        if (w.isDefault) {
          updates[`${w.key}/isDefault`] = false;
        }
      });
      
      // Đặt ví được chọn thành default
      updates[`${walletId}/isDefault`] = true;
      
      // Cập nhật Firebase
      await update(walletsRef, updates);
      
      // Dispatch action để cập nhật Redux store
      dispatch({
        type: 'UPDATE_DEFAULT_WALLET',
        payload: walletId
      });

    } catch (error) {
      console.error("Lỗi khi đặt ví mặc định:", error);
    }
  };
  render() {
    return (
      <ScreenView disablePress={this.props.disablePress}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
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
  if (getAuth().currentUser) {
    uid = getAuth().currentUser.uid;
  }
  const userWalletRef = child(userRef, `${uid}/Wallet`);
  get(userWalletRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((element) => {
        const data = element.val();
        if (data.isDefault === "true") {
          const walletRef = ref(db, `userWallets/${element.key}`);
          update(walletRef, {
            isDefault: "false",
          });
        }
      });
    }
  }).catch((error) => {
    console.error("Error fetching data: ", error);
  });
  const dbRef2 = child(userWalletRef, walletItem.key);
  update(dbRef2, {
    isDefault: "true"
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
    deleteWallet: (walletId) => {
      dispatch(deleteWallet(walletId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);

const handleDeleteWallet = (walletId) => {
  const db = getDatabase();
  const userId = getAuth().currentUser.uid;
  
  try {
    // Cập nhật trong Firebase
    const walletRef = ref(db, `users/${userId}/Wallet/${walletId}`);
    update(walletRef, {
      isDeleted: true
    });
    
    // Dispatch action để cập nhật Redux store
    dispatch(deleteWallet(walletId));
    
  } catch (error) {
    console.error("Lỗi khi xóa ví:", error);
  }
};

const handleSetDefaultWallet = async (walletId) => {
  const db = getDatabase();
  const userId = getAuth().currentUser.uid;
  
  try {
    // Lấy danh sách ví hiện tại
    const walletsRef = ref(db, `users/${userId}/Wallet`);
    const updates = {};
    
    // Lấy snapshot của tất cả ví
    const snapshot = await get(walletsRef);
    const wallets = [];
    snapshot.forEach((child) => {
      wallets.push({
        key: child.key,
        ...child.val()
      });
    });
    
    // Cập nhật trạng thái default
    wallets.forEach(w => {
      if (w.isDefault) {
        updates[`${w.key}/isDefault`] = false;
      }
    });
    
    // Đặt ví được chọn thành default
    updates[`${walletId}/isDefault`] = true;
    
    // Cập nhật Firebase
    await update(walletsRef, updates);
    
    // Dispatch action để cập nhật Redux store
    dispatch({
      type: 'UPDATE_DEFAULT_WALLET',
      payload: walletId
    });

  } catch (error) {
    console.error("Lỗi khi đặt ví mặc định:", error);
  }
};

const styles = StyleSheet.create({
  useButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.purple
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
