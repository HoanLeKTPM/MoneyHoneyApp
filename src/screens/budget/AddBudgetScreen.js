import React, { Component, useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import {
  String,
  ScreenView,
  Row,
  HomoTextInput,
  Button1,
  LooseDivider,
} from "../../components/Basic";
import { Icon, Overlay } from "react-native-elements";
import { connect, useDispatch, useSelector } from "react-redux";

import * as firebase from "firebase";
import { userRef } from "../../components/DataConnect";
import { useAuthState } from "react-firebase-hooks/auth";

import { findIcon } from "../../components/Image";
import { updateCategories } from "../../redux/actions";
import { FlatList } from "react-native-gesture-handler";
import { Alert } from "react-native";
import {
  colors,
  sizeFactor,
  styles,
  windowHeight,
  windowWidth,
} from "../../constants";

const AddBudgetScreen = ({ navigation }) => {
  const [user] = useAuthState(firebase.auth());

  const allCategories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [newSoDu, setNewSoDu] = useState("");

  const userCategoryRef = userRef.child(user?.uid).child("Category");

  const data = [];
  allCategories
    .filter((cate) => cate.typeID == "002")
    .forEach((element) => {
      var info = {
        ...element,
        onPress: () => {
          setVisible(false);
          setCategory(element);
        },
      };
      data.push(info);
    });

  useEffect(() => {
    userCategoryRef.on("value", (snapshot) => {
      dispatch(updateCategories(snapshot));
    });
  }, []);

  const checkValidInput = () => {
    if (parseInt(newSoDu) == 0 || newSoDu == "") {
      Alert.alert(
        "Thông báo",
        "Giới hạn phải lớn hơn 0",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    if (category == "") {
      Alert.alert(
        "Thông báo",
        "Bạn chưa chọn danh mục áp dụng hạn mức",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  };

  const checkDuplicatedInput = async () => {
    let duplicated = false;
    // const selectedCategoryIndex = allCategories.indexOf(category);
    await userCategoryRef.child(category.key).once("value", (snapshot) => {
      console.log(snapshot.toJSON());
      if (snapshot.toJSON().budget && snapshot.toJSON().budget > 0) {
        console.log("duplicated");
        Alert.alert(
          "Thông báo",
          "Hạn mức cho danh mục này đã được tạo.",
          [
            {
              text: "OK",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
        duplicated = true;
      }
    });
    return duplicated;
  };

  const resetAll = () => {
    setNewSoDu(0);
    setCategory("");
  };

  const luuNganSach = async () => {
    if (!checkValidInput()) return;

    await checkDuplicatedInput().then((res) => {
      console.log(res);
      if (!res) {
        userCategoryRef.child(category.key).update({
          budget: parseInt(newSoDu),
        });
        resetAll();

        Alert.alert(
          "Thông báo",
          "Bạn đã thêm giới hạn mức chi cho danh mục này thành công",
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
      }
    });
  };

  const Item = ({ name }) => (
    <View>
      <Row style={{ marginBottom: sizeFactor / 2 }}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <String style={{ marginBottom: 0 }}>{name}</String>
        </View>
      </Row>
      <LooseDivider />
    </View>
  );

  const renderSelector =
    category === "" ? (
      <View style={{ margin: sizeFactor, alignItems: "center" }}>
        <Image
          source={require("../../assets/categories/themdanhmuccon.png")}
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
          Chọn danh mục
        </String>
      </View>
    ) : (
      <View style={{ margin: sizeFactor, alignItems: "center" }}>
        <Image
          source={findIcon(category.icon)}
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
          {category.categoryName}
        </String>
      </View>
    );

  return (
    <ScreenView
      style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}
    >
      <Overlay
        overlayStyle={{
          borderRadius: sizeFactor,
          width: windowWidth - sizeFactor * 4,
          height: windowHeight - sizeFactor * 20,
          paddingHorizontal: sizeFactor * 1.5,
          paddingVertical: sizeFactor * 1,
          alignContent: "center",
          alignItems: "stretch",
        }}
        isVisible={visible}
      >
        <View
          style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}
        >
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
          >
            <View style={{ backgroundColor: "white" }}>
              <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
            </View>
          </TouchableOpacity>
        </View>

        <String
          style={{
            fontSize: sizeFactor * 1.5,
            fontWeight: "bold",
            marginBottom: sizeFactor * 1.5,
          }}
        >
          {"Chọn danh mục "}
        </String>
        <ScrollView
          style={{
            paddingHorizontal: sizeFactor / 2,
            marginBottom: sizeFactor,
          }}
        >
          <FlatList
            data={data}
            renderItem={(item) => {
              return (
                <TouchableOpacity onPress={item.item.onPress}>
                  <Item name={item.item.categoryName} />
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </Overlay>

      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        {renderSelector}
      </TouchableOpacity>
      <View style={{ alignItems: "center", margin: sizeFactor }}>
        <HomoTextInput
          value={newSoDu}
          label="Mức chi tối đa tháng này"
          placeholder="000,000 VNĐ"
          leftIcon={{
            type: "material-community",
            name: "cash",
            color: colors.gray,
          }}
          onChangeText={(text) => {
            setNewSoDu(text);
          }}
          keyboardType="number-pad"
          errorMessage=""
          style={{ width: windowWidth - sizeFactor * 4, margin: 0 }}
        />
      </View>
      <View
        style={{
          alignItems: "stretch",
          marginHorizontal: sizeFactor * 3,
          marginVertical: sizeFactor,
        }}
      >
        <Button1
          onPress={() => {
            luuNganSach();
          }}
        >
          Xác nhận
        </Button1>
      </View>
    </ScreenView>
  );
};

const mapStateToProps = (state) => {
  return {
    allCategories: state.allCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategories: (categories) => {
      dispatch(updateCategories(categories));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBudgetScreen);
