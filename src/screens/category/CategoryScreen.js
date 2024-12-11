// react
import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Platform, Keyboard, TextInput, FlatList, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// firebase
import { userRef } from "../../database/firebase/firebase";

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
import { SearchBar } from "@rneui/themed";

// components
import {
  Space,
  RowLeft,
  KindSelect,
  CategoryInManagerScreen,
} from "../../components/Basic";

// constants
import { sizeFactor } from "../../constants";

// assets
import { findIcon, getIndex } from "../../assets";
import { child, equalTo, get, onValue, orderByChild, query } from "firebase/database";
import { getAuth } from "firebase/auth";

const CategoryScreen = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Component Did Mount logic
    let uid = getAuth().currentUser?.uid || "none";
    const userCategoryRef = child(userRef, `${uid}/Category`);
    const q = query(userCategoryRef, orderByChild("IsDeleted"), equalTo(false));
    
    const unsubscribe = onValue(q, (snapshot) => {
      if (isMounted && snapshot.exists()) {
        props.updateCategories(snapshot);
      }
    });

    return () => {
      setIsMounted(false);
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: "white",
        marginHorizontal: Platform.OS == "ios" ? sizeFactor / 2 : sizeFactor,
        borderRadius: 99,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizeFactor / 2.5,
        height: 40,
        marginBottom: 10,
      }}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Tìm danh mục..."
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
          }}
          value={props.searchText}
          onChangeText={(text) => props.changeSearchText(text)}
        />
      </View>
      {/* {<Title style={{ marginTop: 0 }}>Danh mục</Title>} */}
      <KindSelect
        onPress={(index) => props.changeType(index)}
        selectedIndex={props.selectedType}
        buttons={["Vay/Trả", "Chi tiêu", "Thu nhập"]}
      />
      <Space />
      <View
        style={{ flex: 0.9, alignItems: "center", paddingLeft: sizeFactor }}
      >
        <FlatList
          data={Array.isArray(props.renderedCategories) ? props.renderedCategories : []}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={{ marginBottom: sizeFactor }}>
              <TouchableOpacity onPress={() => props.chooseCategory(item)}>
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
        />
        <Space />
      </View>
    </View>
  );
};

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
