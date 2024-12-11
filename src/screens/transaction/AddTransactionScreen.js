import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
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
} from "../../components/Basic";
import { sizeFactor, styles, windowWidth } from "../../constants";
import { colors, Icon } from "react-native-elements";
import { findIcon } from "../../components/Image";
import DateTimePicker from "@react-native-community/datetimepicker";
import Calculator from "../../components/Calculator";
import { ProgressBar } from "react-native-paper";
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


//data connect
import { userRef } from "../../components/DataConnect";

import { Alert } from "react-native";
import { Switch } from "react-native";
import { numberOfDayInMonth, toDate } from "../../utils/datetime";
import {
  FloatToIntMoney,
  FloatToMoney,
  FloatToTypingMoney,
  stringToTypingMoney,
} from "../../components/toMoneyString";
import { getAuth } from "firebase/auth";
import { 
  push, 
  set, 
  ref,
  get,
  child, 
  equalTo, 
  onValue, 
  orderByChild, 
  query, 
  update 
} from "firebase/database";
import { FlatList } from "react-native-gesture-handler";

export class AddTransactionScreen extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      showCalc: false,
      note: "",
      //selectedTenVi: this.props.route.params?.walletName ?? '',
      //defaultColor: this.props.route.params?.walletColor ?? colors.blue,
      fulllist: false,
      typeID: this.props.route.params.typeID,
      isLoop: false,
      budgetInfo: null,
    };
    this.calcRef = React.createRef();
    this.safeInputMoney = React.createRef();
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
      this.setState({ budgetInfo: null });
      this.props.deselectCategory();
      this.props.deselectSub();
    } else {
      this.calcRemainingMoneyRealtime(category?.key).then((budgetInfo) => {
        this.setState({ budgetInfo: budgetInfo });
      });
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

  componentDidUpdate(prevProps) {
    // when allCategories is updated after creating new category, renderedCategories is also updated
    if (
      this.props.allCategories !== prevProps.allCategories ||
      this.props.selectedType !== prevProps.selectedType
    ) {
      this.getDataBasedOnType(this.props.selectedType);
    }
  }

  componentDidMount() {
    this.resetAll();
    // if(this.state.add)
    // {
    //   this.props.changeType('003')
    // }
    // else
    // {
    //   this.props.changeType('002')
    // }
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet`);
    onValue(userWalletRef, (snapshot) => {
      this.props.Update(snapshot);
    });
    this.props.walletData.forEach((element) => {
      if (element.isDefault == "true") {
        if (this.props.selectedWallet != element)
          this.props.SelectWallet(element);
      }
    });

    const userCategoryRef = child(userRef, `${uid}/Category`);
    const q = query(userCategoryRef, orderByChild("IsDeleted"), equalTo(false));
    onValue(q, (snapshot) => {
      this.props.updateCategories(snapshot);
    });

    this.getDataBasedOnType(parseInt(this.state.typeID) - 1);
    //this.props.changeType(parseInt(this.state.typeID) - 1);

    const categories = this.props.allCategories;
    const temp = categories.filter((item) => item.typeID === this.state.typeID);
    this.props.reloadCategory(temp);

    // let tempTen = '';
    // let tempColor = '';
    // if(this.state.selectedTenVi == '')
    // {
    //   walletRef.orderByChild("isDefault").equalTo('true').on('value', (snap) => {
    //     snap.forEach(element => {
    //       tempTen = element.toJSON().name;
    //       tempColor = element.toJSON().color;
    //   })
    // })
    // this.setState({selectedTenVi: tempTen, defaultColor: tempColor});
    // }
  }

  renderCategoryHorizon = () => {
    const categories = this.props.renderedCategories;
    const row = categories.map((category, index) => (
      <Category
        key={category.key || `category-${index}`}
        choosed={this.props.selectedCategory.key == category.key}
        source={findIcon(category.icon)}
        onPress={() => this.chooseCategory(category)}
      >
        {category.categoryName}
      </Category>
    ));

    // Add "Thêm danh mục" button
    row.push(
      <Category
        key="add-category"
        source={require("../../assets/categories/themdanhmuc.png")}
        onPress={() =>
          this.props.navigation.navigate("CategoryNavigator", {
            screen: "AddCategoryScreen",
          })
        }
      >
        {"Thêm danh mục"}
      </Category>
    );

    return <RowLeft key="category-row">{row}</RowLeft>;
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
            <View style={{ marginRight: sizeFactor * 0.8 }}>
              <Category
                choosed={
                  this.props.selectedCategory.key == categories[index].key
                    ? true
                    : false
                }
                key={categories[index].key}
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
            <Category
              key={index}
              source={require("../../assets/categories/themdanhmuc.png")}
              onPress={() =>
                this.props.navigation.navigate("CategoryNavigator", {
                  screen: "AddCategoryScreen",
                })
              }
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

  renderSubCategoryTable = () => {
    const categories = this.props.subCategory;
    if (!categories || categories.length === 0) {
      return null;
    }

    const numberOfRows = Math.ceil((categories.length) / 4);
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const index = 4 * i + j;
        if (index < categories.length) {
          const category = categories[index];
          row.push(
            <View key={`sub-cat-container-${category.key}`} style={{ marginRight: sizeFactor * 0.8 }}>
              <Category
                key={`sub-cat-${category.key}`}
                choosed={this.props.selectedSub.key === category.key}
                source={findIcon(category.icon)}
                onPress={() => this.chooseSub(category)}
                stringContainerStyle={{ width: sizeFactor * 4 }}
              >
                {category.categoryName}
              </Category>
            </View>
          );
        }
      }
      rows.push(<RowLeft key={`sub-row-${i}`}>{row}</RowLeft>);
    }
    return rows;
  };

  renderSubCategoryHorizon = () => {
    const categories = this.props.subCategory;
    const row = categories.map((category, index) => (
      <Category
        key={category.key || `sub-category-${index}`}
        choosed={this.props.selectedSub.key == category.key}
        source={findIcon(category.icon)}
        onPress={() => this.chooseSub(category)}
      >
        {category.categoryName}
      </Category>
    ));

    return <RowLeft key="sub-category-row">{row}</RowLeft>;
  };
  renderKindSelect = () => {
    if (this.props.searchText === "") {
      return (
        <KindSelect
          onPress={(index) => {
            this.setState({ budgetInfo: null });
            this.getDataBasedOnType(index);
            this.props.deselectSub();
            this.props.deselectCategory();
          }}
          selectedIndex={this.props.selectedType}
          buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
        />
      );
    }
    return;
  };

  getDataInTimeRangeDate = (startDate, endDate) => {
    var temp = [];
    this.props.walletData.forEach((element) => {
      if (element.transactionList != undefined && element.isDefault == "true") {
        Object.keys(element.transactionList).forEach((transaction) => {
          //console.log(transaction)
          var tempInfo = {
            key: transaction,
            categoryKey: element.transactionList[transaction].category.key,
            subCategory: element.transactionList[transaction].subCategory,
            date: element.transactionList[transaction].date,
            money: element.transactionList[transaction].money,
          };
          if (
            toDate(tempInfo.date) >= startDate &&
            toDate(tempInfo.date) <= endDate
          ) {
            temp.push(tempInfo);
          }
        });
      }
    });
    return temp.sort((a, b) => {
      return toDate(a.date) - toDate(b.date);
    });
  };

  getDataInMonth = (month, year) => {
    var start = new Date(year, month - 1, 1);
    var end = new Date(year, month - 1, numberOfDayInMonth(month, year));
    return this.getDataInTimeRangeDate(start, end);
  };

  getBudgetInfo = async () => {
    let budget = 0;
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    console.log(this.props.selectedCategory);
    const dbRef = child(userRef, `${uid}/Category/${this.props.selectedCategory.key}`)
    const cate = await get(dbRef);
    if(cate.exists()){
      budget = cate.toJSON().budget;
      console.log(cate);
    }else{
      console.log(cate);
    }
    return budget;
  };

  getBudgetInfoRealtime = async (categoryKey) => {
    let budget = 0;
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    console.log("eeeeeeeeeeeeeeeee", categoryKey);
    const dbRef = child(userRef, `${uid}/Category/${categoryKey}`);
    const cate = await get(dbRef);
    if(cate.exists()){
      console.log(cate);
      budget = cate.val().budget;
    }else{
      console.log(cate);
    }
    return budget;
  };

  calcRemainingMoney = () => {
    var lose = 0;
    let budget = 0;

    var data = this.getDataInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );

    data.forEach((transaction) => {
      if (transaction.categoryKey == this.props.selectedCategory.key) {
        lose += parseInt(transaction.money);
      }
    });

    if (this.props.selectedCategory.key != "") {
      budget = this.getBudgetInfo();
    }
    console.log(budget, lose);
    return budget - lose;
  };

  calcRemainingMoneyRealtime = async (categoryKey) => {
    var used = 0;
    let budget = 0;

    var data = this.getDataInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );

    data.forEach((transaction) => {
      if (transaction.categoryKey == categoryKey) {
        used += parseInt(transaction.money);
      }
    });

    if (categoryKey != "") {
      budget = await this.getBudgetInfoRealtime(categoryKey);
    }
    console.log(budget, used);
    return {
      budget: budget,
      remain: budget - used,
    };
  };

  addNewTransaction = async () => {
    if (this.props.selectedCategory.key == "" || !this.props.newSoDu) {
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
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }

    const userWalletRef = child(userRef, `${uid}/Wallet/${wallet.key}/transactionList`);
    const newTransactionRef = push(userWalletRef);
    await set(newTransactionRef, {
      category: this.props.selectedCategory,
      subCategory: this.props.selectedSub,
      money: this.props.newSoDu,
      date: this.toString(this.props.date),
      note: this.state.note,
      isLoopNextMonth: this.state.isLoop,
      //isCreatedLoop: false,
    });

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
      const userWalletRef = child(userRef, `${uid}/Wallet`);
      const dbRef2 = child(userWalletRef, this.props.selectedWallet.key);
      await update(dbRef2, {
        money:
          parseInt(this.props.selectedWallet.money) +
          parseInt(this.props.newSoDu),
      })
    } else {
      let uid = "none";
      if (getAuth().currentUser) {
        uid = getAuth().currentUser.uid;
      }
      const userWalletRef = child(userRef, `${uid}/Wallet`);
      const dbRef3 = child(userWalletRef, this.props.selectedWallet.key);
      await update(dbRef3, {
        money: this.props.selectedWallet.money - this.props.newSoDu
      })
    }

    const remainValue =
      this.state.budgetInfo?.remain -
      (parseFloat(this.safeInputMoney?.current) || 0);
    this.resetAll();

    // const remainingMoney = this.calcRemainingMoney();
    console.log("tao thanh cong", remainValue);
    Alert.alert(
      "Thông báo",
      remainValue !== NaN && remainValue <= 0
        ? // remainingMoney > 0
        "Bạn đã tạo giao dịch mới thành công và sử dụng vượt hạn mức."
        : "Bạn đã tạo giao dịch mới thành công.",
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

  resetAll = () => {
    this.props.changeSoDu("");
    this.props.changeDateMode("Today");
    this.setState({ note: "" });
    this.setState({ budgetInfo: null });
    this.props.deselectCategory();
    this.textInput.clear();
    this.calcRef?.current?.clear();
    // this.textInput2.clear();
    let uid = "none";
    if (getAuth().currentUser) {
      uid = getAuth().currentUser.uid;
    }
    const userWalletRef = child(userRef, `${uid}/Wallet`);
    onValue(userWalletRef, (snapshot) => {
      this.props.Update(snapshot);
    });
  };

  render() {
    this.calcRemainingMoney();
    let rows = this.state.fulllist
      ? this.renderCategoryTable()
      : this.renderCategoryHorizon();
    const kindSelect = this.renderKindSelect();
    const subCategoryShow = this.props.selectedCategory.key ? (
      <View>
        <View style={{ flex: 1, paddingLeft: sizeFactor }}>
          <String style={{ fontWeight: "bold" }}>Danh mục con</String>
        </View>
        <View style={{ marginHorizontal: sizeFactor }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            removeClippedSubviews={false}
          >
            {this.renderSubCategoryHorizon()}
          </ScrollView>
        </View>
      </View>
    ) : null;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        {this.state.showCalc && (
          <Calculator
            initValue={this.props.newSoDu}
            ref={this.calcRef}
            onPressButton={() => {
              // this.setState({
              //   amount: this?.calcRef?.current?.state?.calculationText,
              // });
              const tempRes = this?.calcRef?.current?.state?.calculationText;
              this.safeInputMoney.current = tempRes;
              this.props.changeSoDu(tempRes);
            }}
            onCollapse={() => {
              this.setState({ showCalc: false });
            }}
          />
        )}
        <ScreenView
          style={{ backgroundColor: this.props.selectedWallet.color }}
        >
          <TouchableOpacity
            onPress={() => {
              //this.props.navigation.goBack()
              //this.props.navigation.navigate("Ví");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                marginHorizontal: sizeFactor * 1.75,
                marginRight: sizeFactor * 3,
              }}
            >
              <Icon
                name="unfold-more-horizontal"
                type="material-community"
                color="white"
                size={sizeFactor * 1.45}
                style={{
                  marginRight: sizeFactor / 2,
                  opacity: 0,
                  marginTop: 1,
                }}
              />
              <Heading style={{ color: "white" }}>
                {this.props.selectedWallet.name}
              </Heading>
              <Icon
                name="unfold-more-horizontal"
                type="material-community"
                color="white"
                size={sizeFactor * 1.45}
                style={{
                  marginLeft: sizeFactor / 2,
                  opacity: 0.75,
                  marginTop: 1,
                }}
              />
            </View>
          </TouchableOpacity>
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
            {/* <TextInput
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
            /> */}
            <TouchableOpacity onPress={() => this.setState({ showCalc: true })}>
              <String
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: sizeFactor * 2,
                  marginBottom: sizeFactor * 0.75,
                  // width: sizeFactor * 30,
                  textAlign: "right",
                }}
              >
                {stringToTypingMoney(this.props.newSoDu) || "0"}
              </String>
            </TouchableOpacity>
            {!!this.state.budgetInfo?.budget && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ alignItems: "flex-end" }}>
                  <String
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: 0,
                    }}
                  >
                    Còn lại
                  </String>
                  <String
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: sizeFactor * 1.5,
                      marginBottom: sizeFactor * 0.75,
                      // width: sizeFactor * 30,
                      textAlign: "right",
                    }}
                  >
                    {FloatToIntMoney(
                      this.state.budgetInfo?.remain -
                      (parseFloat(this.safeInputMoney?.current) || 0)
                    )}
                  </String>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    marginLeft: sizeFactor,
                    opacity: 0.5,
                  }}
                >
                  <String
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: 0,
                    }}
                  >
                    Hạn mức
                  </String>
                  <String
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: sizeFactor * 1.5,
                      marginBottom: sizeFactor * 0.75,
                      // width: sizeFactor * 30,
                      textAlign: "right",
                    }}
                  >
                    {FloatToIntMoney(this.state.budgetInfo?.budget)}
                  </String>
                </View>
              </View>
            )}
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
            {kindSelect}
            <View style={{ marginHorizontal: sizeFactor }}>
              <FlatList
                horizontal
                data={rows}
                keyExtractor={(item, index) => `category-${index}`}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: sizeFactor / 2 }}>
                    {item}
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
          <View style={{ marginVertical: sizeFactor }}>
            <OutlineButton
              style={{ marginHorizontal: sizeFactor }}
              color="white"
              onPress={() => {
                this.addNewTransaction();
              }}
            >
              Thực hiện giao dịch
            </OutlineButton>
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
              style={{
                right: sizeFactor,
                top: sizeFactor,
                position: "absolute",
              }}
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
            <View
              style={{
                // marginHorizontal: sizeFactor,
                marginBottom: sizeFactor,
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
        </ScreenView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    walletData: state.WalletReducer,

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
    Update: (snapshot) => {
      dispatch(UpdateWalletAction(snapshot));
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
)(AddTransactionScreen);
