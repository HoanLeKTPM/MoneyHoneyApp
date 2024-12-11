import React, { Component, useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import {
  String,
  ScreenView,
  HomoTextInput,
  Button1,
  Button3,
} from "../../components/Basic";
import {
  colors,
  sizeFactor,
  styles,
  windowHeight,
  windowWidth,
} from "../../constants";

import { userRef } from "../../components/DataConnect";
import { useAuthState } from "react-firebase-hooks/auth";

import { findIcon } from "../../components/Image";
import toMoneyString from "../../components/toMoneyString";
import { getAuth } from "firebase/auth";
import { child, set, update } from "firebase/database";

const EditBudgetScreen = ({ route, navigation }) => {
  const { selectedCategory } = route.params;
  console.log(selectedCategory);
  const [user] = useAuthState(getAuth().currentUser);

  const userCategoryRef = child(userRef, `${user?.uid}/Category`);

  const [newBudget, setNewBudget] = useState(
    selectedCategory.budget.toString()
  );

  const checkValidInput = () => {
    if (parseInt(newBudget) == 0 || newBudget == "") {
      Alert.alert(
        "Thông báo",
        "Giới hạn phải lớn hơn 0",
        [
          {
            text: "OK",
            onPress: () => { },
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  };

  const editBudget = () => {
    if (!checkValidInput()) return;
    const dbRef = child(userCategoryRef, selectedCategory.key);
    update(dbRef, {
      budget: newBudget
    });
    // reset
    setNewBudget(0);

    Alert.alert(
      "Thông báo",
      "Bạn đã sửa giới hạn mức chi cho danh mục này thành công",
      [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const deleteBudget = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn xóa giới hạn mức chi cho danh mục này không?",
      [
        {
          text: "OK",
          onPress: () => {
            const updatedCategory = { ...selectedCategory };
            delete updatedCategory.key;
            delete updatedCategory.budget;

            // delete budget: set new obj without budget property
            const dbRef = child(userCategoryRef, selectedCategory.key);
            set(dbRef, updatedCategory);
            console.log("deleted budget");
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScreenView
      style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}
    >
      <TouchableOpacity>
        <View style={{ margin: sizeFactor, alignItems: "center" }}>
          <Image
            source={findIcon(selectedCategory?.Icon)}
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
            {selectedCategory?.CategoryName}
          </String>
        </View>
      </TouchableOpacity>
      <View style={{ alignItems: "center", margin: sizeFactor }}>
        <HomoTextInput
          value={newBudget}
          label="Mức chi tối đa tháng này"
          placeholder="000.000 VNĐ"
          leftIcon={{
            type: "material-community",
            name: "cash",
            color: colors.gray,
          }}
          keyboardType="number-pad"
          errorMessage=""
          style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
          defaultValue={selectedCategory?.budget}
          onChangeText={setNewBudget}
        />
      </View>
      <View
        style={{
          alignItems: "stretch",
          marginHorizontal: sizeFactor * 3,
          marginVertical: sizeFactor,
        }}
      >
        <Button1 onPress={editBudget}>Xác nhận</Button1>
        <Button3 style={{ color: colors.red }} onPress={deleteBudget}>
          Xóa tiết kiệm
        </Button3>
      </View>
    </ScreenView>
  );
};

export default EditBudgetScreen;
