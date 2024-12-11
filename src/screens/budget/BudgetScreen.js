import React, { useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  String,
  ScreenView,
  Row,
  Button3,
  NormalCard,
  LooseDivider,
} from "../../components/Basic";
import { connect, useDispatch, useSelector } from "react-redux";
import { userRef } from "../../components/DataConnect";
import {
  UpdateWalletAction,
  SelectWallet,
  SelectTransaction,
  updateCategories,
} from "../../redux/actions/index";
import { findIcon } from "../../components/Image";
import { ProgressBar } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import toMoneyString from "../../components/toMoneyString";
import { colors, sizeFactor } from "../../constants/index";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { child, get, onValue, query, orderByChild } from "firebase/database";

const BudgetScreen = ({ navigation }) => {
  const [user] = useAuthState(getAuth());

  const walletData = useSelector((state) => state.WalletReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const userWalletRef = child(userRef, `${user.uid}/Wallet`);
      const userCategoryRef = child(userRef, `${user.uid}/Category`);

      onValue(userWalletRef, (snapshot) => {
        dispatch(UpdateWalletAction(snapshot));
      });
      onValue(userCategoryRef, (snapshot) => {
        dispatch(updateCategories(snapshot));
      });
    }
  }, [user, dispatch]);

  const getBudgetInfo = async () => {
    if (!user) return [];
    const userCategoryRef = child(userRef, `${user.uid}/Category`);
    const categoriesQuery = query(userCategoryRef, orderByChild("budget"));
    var categories = [];
    try {
      const snap = await get(categoriesQuery);
      snap.forEach((element) => {
        const data = element.val();
        if (parseInt(data.budget) > 0) {
          categories.push({
            key: element.key,
            ...data,
          });
        }
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    return categories;
  };

  const numberOfDayInMonth = (month, year) => {
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
    }
    if (month == 2) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return 29;
      } else {
        return 28;
      }
    }
  };

  const toDate = (datestring) => {
    var parts = datestring.split("/");
    return new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );
  };

  const getDataInTimeRangeDate = (startDate, endDate) => {
    var temp = [];
    walletData.forEach((element) => {
      if (element.transactionList != undefined && element.isDefault == "true") {
        Object.keys(element.transactionList).forEach((transaction) => {
          //console.log(transaction)
          var tempInfo = {
            key: transaction,
            category: element.transactionList[transaction].category.key,
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

  const getDataInMonth = (month, year) => {
    var start = new Date(year, month - 1, 1);
    var end = new Date(year, month - 1, numberOfDayInMonth(month, year));
    return getDataInTimeRangeDate(start, end);
  };

  const mergeDataByCategory = () => {
    var lose = 0;
    var losepie = [];

    var data = getDataInMonth(
      new Date().getMonth() + 1,
      new Date().getFullYear()
    );

    const categories = getBudgetInfo();

    for (let i = 0; i < categories.length; i++) {
      losepie[i] = {
        category: categories[i],
        money: 0,
      };
      data.forEach((item) => {
        if (item.category == categories[i].key) {
          losepie[i].money += parseInt(item.money);
          lose += parseInt(item.money);
        }
      });
    }
    return losepie;
  };

  // mergeDataByCategory();
  // getBudgetInfo();
  return (
    <ScreenView>
      <View
        style={{
          alignSelf: "flex-end",
          marginRight: sizeFactor,
          flexDirection: "row",
        }}
      >
        <Button3
          color={colors.blue}
          onPress={() => {
            navigation.navigate("AddBudgetScreen");
          }}
        >
          Thêm hạn mức
        </Button3>
      </View>
      <FlatList
        data={mergeDataByCategory()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditBudgetScreen", {
                  selectedCategory: item.category,
                })
              }
            >
              <NormalCard>
                <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        marginRight: sizeFactor,
                      }}
                    >
                      <Image
                        source={findIcon(item.category.Icon)}
                        style={{
                          width: sizeFactor * 2.25,
                          height: sizeFactor * 2.25,
                        }}
                      ></Image>
                    </View>
                    <View>
                      <String style={{ marginBottom: 0 }}>
                        {item.category.CategoryName}
                      </String>
                      <String
                        style={{
                          marginBottom: 0,
                          fontWeight: "bold",
                        }}
                      >
                        {toMoneyString(item.category.budget)}
                      </String>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <String
                      style={{
                        fontSize: sizeFactor * 0.85,
                        marginBottom: 0,
                        color: colors.gray,
                      }}
                    >
                      {"Tháng " +
                        (new Date().getMonth() + 1) +
                        "/" +
                        new Date().getFullYear()}
                    </String>
                    <String
                      style={{
                        marginBottom: 0,
                        fontWeight: "bold",
                        color: colors.gray,
                      }}
                    >
                      {"Còn " +
                        (numberOfDayInMonth(
                          new Date().getMonth() + 1,
                          new Date().getFullYear()
                        ) -
                          new Date().getDate()) +
                        " ngày"}
                    </String>
                  </View>
                </Row>
                <LooseDivider />
                <Row>
                  <String
                    style={{
                      color:
                        item.money / parseFloat(item.category.budget) < 1
                          ? colors.blue
                          : colors.red,
                      fontSize: sizeFactor * 0.9,
                      marginBottom: 0,
                    }}
                  >
                    {toMoneyString(item.money)}
                  </String>
                  <String
                    style={{
                      fontWeight: "bold",
                      fontSize: sizeFactor * 0.9,
                      marginBottom: 0,
                    }}
                  >
                    {"Còn lại " +
                      toMoneyString(
                        parseInt(item.category.budget) - item.money
                      )}
                  </String>
                </Row>
                <ProgressBar
                  style={{
                    height: sizeFactor * 0.5,
                    borderRadius: 999,
                    marginTop: sizeFactor / 2,
                    marginBottom: sizeFactor / 2,
                  }}
                  progress={item.money / parseFloat(item.category.budget)}
                  color={
                    item.money / parseFloat(item.category.budget) < 1
                      ? colors.blue
                      : colors.red
                  }
                />
                <View style={{ alignItems: "flex-end" }}>
                  <String
                    style={{
                      marginBottom: sizeFactor,
                      fontSize: sizeFactor * 0.9,
                    }}
                  ></String>
                </View>
              </NormalCard>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </ScreenView>
  );
};

const mapStateToProps = (state) => {
  return {
    walletData: state.WalletReducer,
    //selectedWallet: state.selectedWalletReducer,
    allCategories: state.allCategories,
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
    SelectTransaction: (value) => {
      dispatch(SelectTransaction(value));
    },
    updateCategories: (categories) => {
      dispatch(updateCategories(categories));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetScreen);
