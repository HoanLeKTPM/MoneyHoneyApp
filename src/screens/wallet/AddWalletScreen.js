import React, { Component } from "react";
import {
  TextInput,
} from "react-native";
import {
  String,
  ScreenView,
  Space,
  Title,
  Row,
  ColorSelectButton,
  RoundedView,
  Button1,
} from "../../components/Basic";
import {
  colors,
  sizeFactor,
  styles,
} from "../../constants/index"
import { Icon } from "react-native-elements";
import { userRef } from "../../components/DataConnect";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { push, child } from "firebase/database";

export default class AddWalletScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      newTenVi: '',
      newSoDu: '',
      selectedColor: colors.blue,
    };
  }

  onChangeTenVi(text) {
    this.setState({ newTenVi: text });
  }
  onChangeSoDu(text) {
    this.setState({ newSoDu: text });
  }
  checkWalletValid() {
    var TenVi = this.state.newTenVi;
    var SoDu = this.state.newSoDu;
    var Mau = this.state.selectedColor;
    if (!TenVi) {
      return false;
    }
    if (!SoDu) {
      if (SoDu != '0')
        return false;
    }
    return true;
  }
  addNewWallet() {
    var TenVi = this.state.newTenVi;
    var SoDu = this.state.newSoDu;
    var Mau = this.state.selectedColor;
    if (this.checkWalletValid()) {
      let uid = 'none';
      if (getAuth().currentUser) {
        uid = getAuth().currentUser.uid;
      }
      const userWalletRef = child(userRef, `${uid}/Wallet`);
      push(userWalletRef, {
        name: TenVi,
        money: SoDu,
        date: this.state.date,
        isDefault: 'false',
        color: Mau
      })
      //them vao day mot cai rhong bao pop up da tao vi thanh cong
      this.setState({
        newTenVi: '',
        newSoDu: '',
        selectedColor: colors.blue
      })
      Alert.alert("Thông báo", "Bạn đã thêm ví mới thành công",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.goBack();
            }
          }
        ], { cancelable: false }
      );
      //this.props.navigation.goBack();
    }
    else {
      Alert.alert("Thông báo", "Vui lòng nhập đủ các trường",
        [
          {
            text: "OK",
            onPress: () => {
            }
          }
        ], { cancelable: false }
      );
    }
    //them bao loi o day
  }
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var fulldate;
    if (date < 10) {
      fulldate = '0' + date;
    }
    else {
      fulldate = date;
    }
    if (month < 10) {
      fulldate = fulldate + '/' + '0' + month;
    }
    else {
      fulldate = fulldate + '/' + month;
    }
    fulldate = fulldate + '/' + year;
    that.setState({
      //Setting the value of the date time
      date: fulldate
    });
  }
  render() {
    return (
      <ScreenView>
        <Icon
          name="wallet"
          type="material-community"
          color="black"
          size={sizeFactor * 6}
        />
        <Title style={{ marginLeft: sizeFactor * 1.5 }}>Tạo ví mới</Title>
        <RoundedView>
          <String style={{ fontWeight: "bold" }}>Tên ví</String>
          <TextInput
            maxLength={50}
            style={styles.inputText}
            placeholder="Ví của tôi"
            onChangeText={text => { this.onChangeTenVi(text) }}
            value={this.state.newTenVi} />
          <Space />
          <String style={{ fontWeight: "bold" }}>Số dư</String>
          <TextInput
            maxLength={15}
            contextMenuHidden={true}
            style={styles.inputText}
            placeholder="000,000,000"
            keyboardType='number-pad' //dung tam cai nay cho den khi co ban phim so hoc//
            onChangeText={text => { this.onChangeSoDu(text) }}
            value={this.state.newSoDu} />
          <Space />
          <String style={{ fontWeight: "bold" }}>Màu sắc</String>
          <Row>
            <ColorSelectButton color={colors.yellow} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.yellow }) }} />
            <ColorSelectButton color={colors.green} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.green }) }} />
            <ColorSelectButton color={colors.blue} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.blue }) }} />
            <ColorSelectButton color={colors.purple} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.purple }) }} />
            <ColorSelectButton color={colors.red} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.red }) }} />
            <ColorSelectButton color={colors.orange} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.orange }) }} />
            <ColorSelectButton color={colors.dark} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.dark }) }} />
            <ColorSelectButton color={colors.indigo} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.indigo }) }} />
            <ColorSelectButton color={colors.pink} selected={this.state.selectedColor} onPress={() => { this.setState({ selectedColor: colors.pink }) }} />
          </Row>
          <Space />
          <String style={{ fontWeight: "bold" }}>Ngày tạo</String>
          <String style={styles.inputText}>{this.state.date}</String>
        </RoundedView>
        <Space />
        <Button1
          color="white"
          background={colors.blue}
          style={{ marginHorizontal: sizeFactor }}
          onPress={() => { this.addNewWallet() }}
        >
          Lưu thay đổi
        </Button1>
      </ScreenView>
    );
  }
}
