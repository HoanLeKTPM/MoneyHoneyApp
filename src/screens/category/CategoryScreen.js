// react
import React, { Component, useState } from "react";
import { View, ScrollView, Platform } from "react-native";

// firebase
import { firebase, userRef } from "../../database";

// redux
import { connect } from "react-redux";
import {
  changeType,
  updateCategories,
  reloadCategory,
  changeSearchText,
  chooseCategory,
  changeName,
  getSubCategories,
  reloadAddedSubCategories,
  showType,
  selectIcon,
  workWithCategory,
  closeIconDialog,
  setAddingIcon,
  setEditingIcon,
  closeDialog,
} from "../../redux/actions";

// other packages
import { SearchBar } from "react-native-elements";

// components
import {
  Space,
  RowLeft,
  KindSelect,
  CategoryInManagerScreen,
  CategoryTable,
} from "../../components/Basic";

// constants
import { sizeFactor } from "../../constants";

// assets
import { findIcon, getIndex } from "../../assets";

class CategoryScreen extends Component {
  _isMounted = false;

  constructor() {
    super();
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
    //console.log("call " + this.props.allCategories[2].isDeleted)
    const temp = categories.filter((item) => item.typeID === typeID);
    //console.log("cs " + categories[2].isDeleted)
    this.props.reloadCategory(temp);
  };

  createNewCategory = () => {
    // create new -> no subcategory
    const category = [];
    this.props.getSubCategories(category);

    this.props.setAddingIcon(9);
    this.props.navigation.navigate("AddCategoryScreen");
  };

  getSubCategories = (chosenCategory) => {
    let uid = "none";
    if (firebase.auth().currentUser) {
      uid = firebase.auth().currentUser.uid;
    }
    const userCategoryRef = userRef.child(uid).child("Category");

    const categories = [];
    userCategoryRef
      .child(chosenCategory.key)
      .child("SubCategories/")
      .once("value", (snapshot) => {
        snapshot.forEach((element) => {
          if (element.toJSON().IsDeleted === false) {
            categories.push({
              key: element.key,
              categoryName: element.toJSON().CategoryName,
              icon: element.toJSON().Icon,
            });
          }
        });
      });

    // console.log("ZZZ");
    // console.log(categories);
    return categories;
  };

  chooseCategory = async (category) => {
    await this.props.chooseCategory(category);
    await this.props.workWithCategory();

    const iconIndex = getIndex(this.props.chosenCategory.icon);
    this.props.setEditingIcon(iconIndex);
    this.props.closeIconDialog();
    this.props.closeDialog();

    this.props.changeName(category.categoryName);
    this.props.showType(this.props.selectedType);

    const subCategories = this.getSubCategories(category);
    this.props.getSubCategories(subCategories);
    this.props.reloadAddedSubCategories();

    this.props.navigation.navigate("EditCategoryScreen");
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
          //console.log("ci " + categories[2].isDeleted);
          row.push(
            <CategoryInManagerScreen
              key={categories[index].key}
              source={iconPath}
              onPress={() => this.chooseCategory(categories[index])}
            >
              {name}
            </CategoryInManagerScreen>
          );
        } else if (
          index == categories.length &&
          this.props.selectedType !== 0
        ) {
          row.push(
            <CategoryInManagerScreen
              key={index}
              source={require("../../assets/categories/themdanhmuc.png")}
              onPress={() => this.createNewCategory()}
            >
              {"Thêm danh mục"}
            </CategoryInManagerScreen>
          );
        }
      }
      rows.push(<RowLeft key={i}>{row}</RowLeft>);
    }
    return rows;
  };

  componentDidMount() {
    let uid = "none";
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
      uid = firebase.auth().currentUser.uid;
    }
    // const categoryRef = rootRef.child('users').child(uid).child('Category');
    // console.log(categoryRef);
    const userCategoryRef = userRef.child(uid).child("Category");

    this._isMounted = true;
    userCategoryRef
      .orderByChild("IsDeleted")
      .equalTo(false)
      .on("value", (snapshot) => {
        this.props.updateCategories(snapshot);
      });
  }

  componentDidUpdate(prevProps) {
    // when allCategories is updated after creating new category, renderedCategories is also updated
    if (
      this.props.allCategories !== prevProps.allCategories ||
      this.props.selectedType !== prevProps.selectedType
    ) {
      this.getDataBasedOnType(this.props.selectedType);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  searchFilterFunction(text) {
    if (text !== "") {
      //passing the inserted text in textinput
      const newData = this.props.allCategories.filter(function (item) {
        //applying filter for the inserted text in search bar
        const itemData = item.categoryName
          ? item.categoryName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.props.reloadCategory(newData);
    } else {
      this.getDataBasedOnType(this.props.selectedType);
    }
    //setting the filtered newData on datasource
    //After setting the data it will automatically re-render the view
    this.props.changeSearchText(text);
  }

  renderKindSelect = () => {
    if (this.props.searchText === "") {
      return (
        <KindSelect
          onPress={(index) => this.getDataBasedOnType(index)}
          selectedIndex={this.props.selectedType}
          buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
        />
      );
    }
    return;
  };

  render() {
    let rows = this.renderCategoryTable();
    const kindSelect = this.renderKindSelect();

    return (
      <View style={{ flex: 1 }}>
        <Space />
        <Space />
        <Space />
        <SearchBar
          platform={Platform.OS}
          placeholder="Tìm danh mục..."
          onChangeText={(text) => this.searchFilterFunction(text)}
          value={this.props.searchText}
          lightTheme="true"
          containerStyle={{
            backgroundColor: "",
            marginHorizontal:
              Platform.OS == "ios" ? sizeFactor / 2 : sizeFactor,
            flex: 0.1,
          }}
          inputContainerStyle={{
            backgroundColor: "white",
            borderRadius: 99,
            paddingHorizontal: sizeFactor / 2.5,
          }}
        />
        <Space />
        <Space />
        <Space />
        <Space />
        {/* {<Title style={{ marginTop: 0 }}>Danh mục</Title>} */}
        {kindSelect}
        <Space />
        <View
          style={{ flex: 0.9, alignItems: "center", paddingLeft: sizeFactor }}
        >
          <ScrollView>
            <CategoryTable style={{ marginBottom: 70 }} rows={rows} />
            <Space />
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedType: state.selectedType,
    allCategories: state.allCategories,
    renderedCategories: state.renderedCategories,
    searchText: state.searchText,
    chosenCategory: state.chosenCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
    reloadAddedSubCategories: () => {
      dispatch(reloadAddedSubCategories());
    },
    showType: (selectedType) => {
      dispatch(showType(selectedType));
    },
    selectIcon: (index) => {
      dispatch(selectIcon(index));
    },
    workWithCategory: () => {
      dispatch(workWithCategory());
    },
    closeIconDialog: () => {
      dispatch(closeIconDialog());
    },
    closeDialog: () => {
      dispatch(closeDialog());
    },
    setAddingIcon: (index) => {
      dispatch(setAddingIcon(index));
    },
    setEditingIcon: (index) => {
      dispatch(setEditingIcon(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);
