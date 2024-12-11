import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, TextInput, FlatList, Image, Text } from "react-native";
import {
  String,
  ScreenView,
  Space,
  Heading,
  RowLeft,
  KindSelect,
  Title,
  Category,
  CategoryTable,
  OutlineButton,
  ToggleButton,
  Button2,
} from "../../components/Basic";
import { sizeFactor, styles, colors } from "../../constants";
import { Icon } from "react-native-elements";
import { findIcon } from "../../components/Image";
import DateTimePicker from "@react-native-community/datetimepicker";

//redux
import { connect } from "react-redux";
import {
  UpdateWalletAction,
  SelectWallet,
  changeType,
  updateCategories,
  reloadCategory,
  changeSearchText,
  chooseCategory,
  changeName,
  getSubCategories,
  DeselectCategoryAction,
  SelectSubAction,
  DeselectSubAction,
  UpdateSubAction,
  SetShowDatePicker,
  ChangeSoDuTransAction,
  ChangeDateModeaTransAction,
  ChangeDateTransAction,
} from "../../redux/actions";

//import {UpdateWalletAction, SelectWallet } from "../actions";

//firebase

//data connect
import { userRef } from "../../components/DataConnect";

import { Alert } from "react-native";
import { Switch } from "react-native";
import { getAuth } from "firebase/auth";
import { child, onValue, remove, update } from "firebase/database";

export class EditTransactionScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      //selectedTenVi: this.props.route.params?.walletName ?? '',
      //defaultColor: this.props.route.params?.walletColor ?? colors.blue,
      fulllist: false,
      isLoop: false,
    };
  }
  toDate(datestring) {
    var parts = datestring.split("/");
    return new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );
  }
  toString(date) {
    var day = date.getDate(); //Current Date
    var month = date.getMonth() + 1; //Current Month
    var year = date.getFullYear(); //Current Year
    var fulldate;
    if (day < 10) {
      fulldate = "0" + day;
    } else {
      fulldate = day;
    }
    if (month < 10) {
      fulldate = fulldate + "/" + "0" + month;
    } else {
      fulldate = fulldate + "/" + month;
    }
    fulldate = fulldate + "/" + year;
    return fulldate;
  }
  getDataBasedOnType = (selectedType) => {
    this.props.changeType(selectedType);
    switch (selectedType) {
      case 0:
        this.getData("001");
        break;
      case 1:
        this.getData("002");
        break;
      case 2:
        this.getData("003");
        break;
      case 3:
        this.getData("004");
        break;
    }
  };
  getData = (typeID) => {
    const categories = this.props.allCategories;
    const temp = categories.filter((item) => item.typeID === typeID);
    this.props.reloadCategory(temp);
  };
  chooseCategory = (category) => {
    if (this.props.selectedCategory.key == category.key) {
      this.props.deselectCategory();
      this.props.deselectSub();
    } else {
      this.props.deselectSub();
      this.props.chooseCategory(category);
      this.props.updateSub(category);
    }
  };
  chooseSub = (sub) => {
    if (this.props.selectedSub.key == sub.key) {
      this.props.deselectSub();
    } else {
      this.props.selectSub(sub);
    }
  };
  componentDidMount() {
    this.resetAll();
    var swallet;
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet`);
    onValue(userWalletRef, (snapshot) => {
      this.props.Update(snapshot);
    })
    
    // Kiểm tra wallet data tồn tại
    if (this.props.walletData && this.props.walletData.length > 0) {
      this.props.walletData.forEach((element) => {
        if (element.isDefault == "true") {
          this.props.SelectWallet(element);
          swallet = element;
        }
      });
    }

    // Kiểm tra swallet và transactionList tồn tại
    if (swallet && swallet.transactionList && 
        this.props.selectedTransaction !== undefined && 
        swallet.transactionList[this.props.selectedTransaction]) {
      
      const trans = swallet.transactionList[this.props.selectedTransaction];
      this.props.changeSoDu(trans.money);
      
      //this.props.changeSoDu("");
      const categories = this.props.allCategories;
      const temp = categories.filter(
        (item) => item.typeID === trans.category?.typeID
      );
      this.props.reloadCategory(temp);

      this.props.changeDateMode("Custom");
      this.props.changeDate(this.toDate(trans.date));
      this.props.chooseCategory(
        categories.filter((item) => item.key == trans.category.key)[0]
      );

      this.setState({ note: trans.note, isLoop: trans.isLoopNextMonth });
      //this.props.deselectCategory();
    }
  }

  componentWillUnmount() { }

  renderCategoryHorizon = () => {
    const categories = this.props.renderedCategories;
    const rows = [];
    const row = [];
    for (let index = 0; index <= categories.length; index++) {
      if (index < categories.length) {
        const name = categories[index].categoryName;
        const icon = categories[index].icon;
        const iconPath = findIcon(icon);
        row.push(
          <Category
            choosed={
              this.props.selectedCategory.key == categories[index].key
                ? true
                : false
            }
            key={categories[index].key}
            source={iconPath}
            onPress={() => this.chooseCategory(categories[index])}
          >
            {name}
          </Category>
        );
      } else if (index == categories.length) {
        row.push(
          <Category
            key={index}
            source={require("../../assets/categories/themdanhmuc.png")}
            onPress={() => this.props.navigation.navigate("AddCategoryScreen")}
          >
            {"Thêm danh mục"}
          </Category>
        );
      }
    }
    rows.push(<RowLeft>{row}</RowLeft>);
    return rows;
  };

  renderCategoryTable = () => {
    const categories = this.props.renderedCategories;
    const numberOfRows = Math.ceil((categories.length + 1) / 4);
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const index = 4 * i + j;
        if (index < categories.length) {
          const name = categories[index].categoryName;
          const icon = categories[index].icon;
          const iconPath = findIcon(icon);
          row.push(
            <View 
              key={`category-${categories[index].key}`} 
              style={{ marginRight: sizeFactor * 0.8 }}
            >
              <Category
                choosed={
                  this.props.selectedCategory.key == categories[index].key
                    ? true
                    : false
                }
                source={iconPath}
                onPress={() => {
                  this.chooseCategory(categories[index]);
                }}
                stringContainerStyle={{ width: sizeFactor * 4 }}
              >
                {name}
              </Category>
            </View>
          );
        } else if (index == categories.length) {
          row.push(
            <View key="add-category">
              <Category
                source={require("../../assets/categories/themdanhmuc.png")}
                onPress={() =>
                  this.props.navigation.navigate("CategoryNavigator", {
                    screen: "AddCategoryScreen",
                  })
                }
              >
                {"Thêm danh mục"}
              </Category>
            </View>
          );
        }
      }
      rows.push(<RowLeft key={`row-${i}`}>{row}</RowLeft>);
    }
    return rows;
  };

  renderSubCategoryTable = () => {
    const categories = this.props.subCategory;
    const numberOfRows = Math.ceil((categories.length + 1) / 4);
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const index = 4 * i + j;
        if (index < categories.length) {
          const name = categories[index].categoryName;
          const icon = categories[index].icon;
          const iconPath = findIcon(icon);
          row.push(
            <View style={{ marginRight: sizeFactor * 0.8 }}>
              <Category
                choosed={
                  this.props.selectedSub.key == categories[index].key
                    ? true
                    : false
                }
                key={categories[index].key}
                source={iconPath}
                onPress={() => this.chooseSub(categories[index])}
              >
                {name}
              </Category>
            </View>
          );
        } else if (index == categories.length) {
          row.push(
            <Category
              key={index}
              source={require("../../assets/categories/themdanhmuc.png")}
              onPress={() => this.props.navigation.navigate("CategoryNavigator", {
                screen: "AddSubCategoryScreen",
                params: {
                  parentCategory: this.props.selectedCategory
                }
              })}
            >
              {"Thêm danh mục"}
            </Category>
          );
        }
      }
      rows.push(<RowLeft key={i}>{row}</RowLeft>);
    }
    return rows;
  };

  renderSubCategoryHorizon = () => {
    const categories = this.props.subCategory;
    const rows = [];
    const row = [];
    for (let index = 0; index <= categories.length; index++) {
      if (index < categories.length) {
        const name = categories[index].categoryName;
        const icon = categories[index].icon;
        const iconPath = findIcon(icon);
        row.push(
          <Category
            choosed={
              this.props.selectedSub.key == categories[index].key ? true : false
            }
            key={categories[index].key}
            source={iconPath}
            onPress={() => {
              this.chooseSub(categories[index]);
            }}
          >
            {name}
          </Category>
        );
      } else if (index == categories.length) {
        row.push(
          <Category
            key={index}
            source={require("../../assets/categories/themdanhmuc.png")}
            onPress={() => this.props.navigation.navigate("CategoryNavigator", {
              screen: "AddSubCategoryScreen",
              params: {
                parentCategory: this.props.selectedCategory
              }
            })}
          >
            {"Thêm danh mục"}
          </Category>
        );
      }
    }
    rows.push(<RowLeft>{row}</RowLeft>);

    return rows;
  };

  editTransaction = () => {
    if (!this.props.selectedCategory || !this.props.newSoDu) {
      Alert.alert(
        "Thông báo",
        "Thông tin không hợp lệ",
        [
          {
            text: "OK",
            onPress: () => { },
          },
        ],
        { cancelable: false }
      );
      return;
    }
    var wallet = this.props.selectedWallet;

    const tempmoney =
      this.props.selectedWallet.transactionList[this.props.selectedTransaction]
        .money;

    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet/${wallet.key}/transactionList/${this.props.selectedTransaction}`);
    update(userWalletRef, {
      category: this.props.selectedCategory,
      subCategory: this.props.selectedSub,
      money: this.props.newSoDu,
      date: this.toString(this.props.date),
      note: this.state.note,
      isLoopNextMonth: this.state.isLoop,
    })
    var category = this.props.selectedCategory;

    var b;

    if (category?.typeID == "002") {
      b = false;
    } else {
      if (category?.typeID == "003") {
        b = true;
      } else {
        if (
          category.categoryName == "Đi vay" ||
          category.categoryName == "Thu nợ"
        ) {
          b = true;
        } else {
          b = false;
        }
      }
    }
    if (b) {
      let uid = "none";
      if (getAuth().currentUser) {
        uid = getAuth().currentUser.uid;
      }
      const userWalletRef = child(userRef, `${uid}/Wallet/${this.props.selectedWallet.key}`);
      update(userWalletRef, {
        money:
          parseInt(this.props.selectedWallet.money) +
          parseInt(this.props.newSoDu) -
          parseInt(tempmoney),
      });

    } else {
      let uid = "none";
      if (getAuth().currentUser) {
        uid = getAuth().currentUser.uid;
      }
      const userWalletRef = child(userRef, `${uid}/Wallet/${this.props.selectedWallet.key}`);
      update(userWalletRef, {
        money:
          this.props.selectedWallet.money -
          this.props.newSoDu +
          parseInt(tempmoney),
      });
    }

    this.resetAll();
    Alert.alert(
      "Thông báo",
      "Bạn đã sửa giao dịch thành công",
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  deleteTransaction() {
    var wallet = this.props.selectedWallet;

    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet/${wallet.key}/transactionList/${this.props.selectedTransaction}`);
    remove(userRef);
    Alert.alert(
      "Thông báo",
      "Bạn đã xoá giao dịch thành công",
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  }

  resetAll = () => {
    this.props.changeSoDu("");
    this.props.changeDateMode("Today");
    //this.setState({note: ""});
    this.props.deselectCategory();
    this.textInput.clear();
    this.textInput2.clear();
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet`);
    onValue(userWalletRef, (snapshot) => {
      this.props.Update(snapshot);
    });
    this._isMounted = false;
  };

  render() {
    let rows = this.state.fulllist
      ? this.renderCategoryTable()
      : this.renderCategoryHorizon();
    //const kindSelect = this.renderKindSelect();
    const subCategoryShow =
      this.props.selectedCategory.key == "" ? (
        <View></View>
      ) : (
        <View>
          <View
            style={{
              flex: 1,
              paddingLeft: sizeFactor,
            }}
          >
            <String style={{ fontWeight: "bold" }}>Danh mục con</String>
          </View>
          <View style={{ marginHorizontal: sizeFactor }}>
            <FlatList
              horizontal
              data={this.state.fulllist ? this.renderSubCategoryTable() : this.renderSubCategoryHorizon()}
              keyExtractor={(item, index) => `subcategory-${index}`}
              renderItem={({item}) => item}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      );
    return (
      <ScreenView style={{ backgroundColor: this.props.selectedWallet.color }}>
        <View
          style={{
            alignItems: "flex-end",
            paddingLeft: sizeFactor,
            paddingRight: sizeFactor * 1.5,
          }}
        >
          <String
            style={{ color: "white", fontWeight: "bold", marginBottom: 0 }}
          >
            Số tiền
          </String>
          <TextInput
            maxLength={15}
            value={this.props.newSoDu}
            contextMenuHidden={true}
            placeholder="0"
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: sizeFactor * 2,
              marginBottom: sizeFactor * 0.75,
              width: sizeFactor * 30,
              textAlign: "right",
            }}
            ref={(input) => {
              this.textInput2 = input;
            }}
            keyboardType="number-pad" //dung tam cai nay cho den khi co ban phim so hoc//
            onChangeText={(text) => {
              this.props.changeSoDu(text);
            }}
          />
          <String style={{ color: "white", fontWeight: "bold" }}>
            Danh mục
          </String>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: sizeFactor,
            borderRadius: sizeFactor,
            paddingTop: sizeFactor * 0.75,
            paddingBottom: sizeFactor,
            marginBottom: sizeFactor,
          }}
        >
          <View style={{ marginHorizontal: sizeFactor }}>
            <FlatList
              horizontal
              data={this.state.fulllist ? this.renderCategoryTable() : this.renderCategoryHorizon()}
              keyExtractor={(item, index) => `category-${index}`}
              renderItem={({ item }) => (
                <View style={{ marginBottom: sizeFactor }}>
                  <TouchableOpacity onPress={() => this.chooseCategory(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: sizeFactor }}>
                      <Image 
                        source={findIcon(item.icon)}
                        style={{ width: 30, height: 30, marginRight: 10 }}
                      />
                      <Text>{item.categoryName}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {subCategoryShow}
          <TouchableOpacity
            onPress={() => {
              this.setState({ fulllist: !this.state.fulllist });
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Icon
                name={this.state.fulllist ? "chevron-up" : "chevron-down"}
                type="material-community"
                color="black"
                size={sizeFactor * 2}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: sizeFactor,
            borderRadius: sizeFactor,
            paddingTop: sizeFactor * 0.75,
            paddingBottom: sizeFactor,
            marginBottom: sizeFactor,
          }}
        >
          <View
            style={{
              marginHorizontal: sizeFactor,
              flexDirection: "row",
              flex: 1,
            }}
          >
            <String
              style={{
                fontWeight: "bold",
                color: this.props.selectedWallet.color,
                marginTop: 10,
                flex: 8,
              }}
            >
              Lặp lại theo tháng
            </String>
            <Switch
              style={{ flex: 2 }}
              value={this.state.isLoop}
              onValueChange={(value) => {
                this.setState({ isLoop: value });
              }}
              trackColor={{
                false: "#767577",
                true: this.props.selectedWallet.color,
              }}
              thumbColor={this.state.isLoop ? colors.grey4 : colors.grey5}
            ></Switch>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: sizeFactor,
            borderRadius: sizeFactor,
            marginBottom: sizeFactor,
            paddingHorizontal: sizeFactor,
            paddingBottom: sizeFactor * 1.25,
          }}
        >
          <View
            style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}
          ></View>
          <Title style={{ marginLeft: 0 }}>Nâng cao</Title>
          <String style={{ fontWeight: "bold" }}>Chọn ngày</String>
          <RowLeft style={{ flex: 9 }}>
            <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
              <ToggleButton
                color={this.props.selectedWallet.color}
                background="white"
                choosed={
                  this.props.selectedDateMode == "LastDay" ? "true" : "false"
                }
                style={{ paddingHorizontal: sizeFactor / 4 }}
                onPress={() => {
                  this.props.changeDateMode("LastDay");
                }}
              >
                Hôm qua
              </ToggleButton>
            </View>
            <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
              <ToggleButton
                color={this.props.selectedWallet.color}
                background="white"
                choosed={
                  this.props.selectedDateMode == "Today" ? "true" : "false"
                }
                style={{ paddingHorizontal: sizeFactor / 4 }}
                onPress={() => {
                  this.props.changeDateMode("Today");
                }}
              >
                Hôm nay
              </ToggleButton>
            </View>
            <View style={{ flex: 2.75, marginRight: sizeFactor / 2 }}>
              <ToggleButton
                color={this.props.selectedWallet.color}
                background="white"
                choosed={
                  this.props.selectedDateMode == "NextDay" ? "true" : "false"
                }
                style={{ paddingHorizontal: sizeFactor / 4 }}
                onPress={() => {
                  this.props.changeDateMode("NextDay");
                }}
              >
                Ngày mai
              </ToggleButton>
            </View>
          </RowLeft>
          <String>hoặc chọn một ngày khác</String>
          <RowLeft style={{ flex: 9 }}>
            <View style={{ flex: 3.5 }}>
              <ToggleButton
                color={this.props.selectedWallet.color}
                background="white"
                choosed={
                  this.props.selectedDateMode == "Custom" ? "true" : "false"
                }
                style={{ paddingHorizontal: sizeFactor / 4 }}
                onPress={() => {
                  this.props.changeDateMode("Custom");
                  this.props.setShow(true);
                }}
              >
                {this.toString(this.props.date)}
              </ToggleButton>
            </View>
          </RowLeft>
          {this.props.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.props.date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                this.props.setShow(false);
                selectedDate ? this.props.changeDate(selectedDate) : {};
              }}
            />
          )}
          <Space />
          <String style={{ fontWeight: "bold" }}>Ghi chú</String>
          <TextInput
            style={styles.inputMultilineText}
            multiline={true}
            placeholder="Vài điều cần ghi lại..."
            value={this.state.note}
            onChangeText={(text) => {
              this.setState({ note: text });
            }}
            ref={(input) => {
              this.textInput = input;
            }}
          />
        </View>
        <OutlineButton
          style={{ marginHorizontal: sizeFactor * 1.5 }}
          backgroundColor="white"
          color="white"
          onPress={() => {
            this.editTransaction();
          }}
        >
          Lưu thay đổi
        </OutlineButton>
        <Button2
          style={{
            marginHorizontal: sizeFactor * 1.5,
            backgroundColor: "white",
          }}
          textStyle={{
            color: colors.red,
          }}
          onPress={() => {
            this.deleteTransaction();
          }}
        >
          Xoá giao dịch
        </Button2>
      </ScreenView>
    );
  }
}

function mapStateToProps(state) {
  return {
    walletData: state.WalletReducer,
    selectedTransaction: state.selectedTransactionReducer,

    selectedType: state.selectedType,
    allCategories: state.allCategories,
    renderedCategories: state.renderedCategories,
    searchText: state.searchText,
    //Thang
    selectedCategory: state.chosenCategory,
    selectedSub: state.selectedSubReducer,
    subCategory: state.allSubReducer,
    show: state.showDatePickerReducer,
    newSoDu: state.sodu_transReducer,
    selectedDateMode: state.datemode_transReducer,
    date: state.date_transReducer,

    selectedWallet: state.selectedWalletReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Update: (snap) => {
      dispatch(UpdateWalletAction(snap));
    },
    SelectWallet: (value) => {
      dispatch(SelectWallet(value));
    },

    changeType: (selectedType) => {
      dispatch(changeType(selectedType));
    },
    updateCategories: (categories) => {
      dispatch(updateCategories(categories));
    },
    reloadCategory: (categories) => {
      dispatch(reloadCategory(categories));
    },
    changeSearchText: (text) => {
      dispatch(changeSearchText(text));
    },
    chooseCategory: (category) => {
      dispatch(chooseCategory(category));
    },
    changeName: (text) => {
      dispatch(changeName(text));
    },
    getSubCategories: (categories) => {
      dispatch(getSubCategories(categories));
    },
    //Thang
    deselectCategory: () => {
      dispatch(DeselectCategoryAction());
    },
    selectSub: (category) => {
      dispatch(SelectSubAction(category));
    },
    deselectSub: () => {
      dispatch(DeselectSubAction());
    },
    updateSub: (category) => {
      dispatch(UpdateSubAction(category));
    },
    setShow: (bool) => {
      dispatch(SetShowDatePicker(bool));
    },
    changeSoDu: (sodu) => {
      dispatch(ChangeSoDuTransAction(sodu));
    },
    changeDateMode: (datemode) => {
      dispatch(ChangeDateModeaTransAction(datemode));
      var temp = new Date();
      if (datemode == "Today") dispatch(ChangeDateTransAction(temp));
      if (datemode == "LastDay") {
        temp.setDate(temp.getDate() - 1);
        dispatch(ChangeDateTransAction(temp));
      }
      if (datemode == "NextDay") {
        temp.setDate(temp.getDate() + 1);
        dispatch(ChangeDateTransAction(temp));
      }
    },
    changeDate: (date) => {
      dispatch(ChangeDateTransAction(date));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTransactionScreen);
