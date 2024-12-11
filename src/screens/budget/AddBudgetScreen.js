import React, { Component, useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import {
  String,
  ScreenView,
  Row,
  HomoTextInput,
  Button1,
  LooseDivider,
} from "../../components/Basic";
import { Icon } from "@rneui/themed";
import { connect, useDispatch, useSelector } from "react-redux";

import { userRef } from "../../components/DataConnect";
import { useAuthState } from "react-firebase-hooks/auth";

import { findIcon } from "../../components/Image";
import { updateCategories } from "../../redux/actions";
import { FlatList } from "react-native-gesture-handler";
import {
  colors,
  sizeFactor,
  styles,
  windowHeight,
  windowWidth,
} from "../../constants";
import { getAuth } from "firebase/auth";
import { child, onValue, get, update, ref, getDatabase } from "firebase/database";
import { Overlay } from "@rneui/themed";

const AddBudgetScreen = ({ navigation }) => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const database = getDatabase();

  const allCategories = useSelector((state) => state.allCategories);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [newSoDu, setNewSoDu] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
      return;
    }

    const userCategoryRef = ref(database, `users/${user.uid}/Category`);
    
    const unsubscribe = onValue(userCategoryRef, (snapshot) => {
      if (snapshot.exists()) {
        const categories = snapshot.val();
        if (categories && typeof categories === 'object') {
          dispatch(updateCategories(categories));
        } else {
          dispatch(updateCategories({}));
        }
      } else {
        dispatch(updateCategories({}));
      }
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (allCategories) {
      const categoryList = Object.entries(allCategories)
        .filter(([_, category]) => category.type === 'expense')
        .map(([key, category]) => ({
          key,
          categoryName: category.categoryName,
          icon: category.icon,
          onPress: () => {
            setCategory({
              key,
              categoryName: category.categoryName,
              icon: category.icon
            });
            setVisible(false);
          }
        }));
      setData(categoryList);
    }
  }, [allCategories]);

  const checkValidInput = () => {
    if (parseInt(newSoDu) == 0 || newSoDu == "") {
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
    if (category == "") {
      Alert.alert(
        "Thông báo",
        "Bạn chưa chọn danh mục áp dụng hạn mức",
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

  const checkDuplicatedInput = async () => {
    if (!user || !category.key) return true;

    const dbRef = ref(database, `users/${user.uid}/Category/${category.key}`);
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.budget && data.budget > 0) {
          Alert.alert(
            "Thông báo",
            "Hạn mức cho danh mục này đã được tạo.",
            [{ text: "OK" }],
            { cancelable: false }
          );
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error fetching category:', error);
      return true;
    }
  };

  const resetAll = () => {
    setNewSoDu(0);
    setCategory("");
  };

  const luuNganSach = async () => {
    if (!user) {
      Alert.alert("Lỗi", "Vui lòng đăng nhập lại");
      return;
    }

    if (!checkValidInput()) return;

    const isDuplicated = await checkDuplicatedInput();
    if (isDuplicated) return;

    try {
      const dbRef = ref(database, `users/${user.uid}/Category/${category.key}`);
      await update(dbRef, {
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
    } catch (error) {
      console.error('Error updating category:', error);
    }
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

  const overlayStyle = {
    borderRadius: sizeFactor,
    width: windowWidth - sizeFactor * 4,
    height: windowHeight - sizeFactor * 20,
    paddingHorizontal: sizeFactor * 1.5,
    paddingVertical: sizeFactor * 1,
    alignContent: "center",
    alignItems: "stretch",
  };

  return (
    <ScreenView
      style={{ backgroundColor: "white", paddingTop: windowHeight / 10 }}
    >
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={overlayStyle}
        animationType="fade"
        transparent={true}
        statusBarTranslucent
      >
        <View
          style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}
        >
          <TouchableOpacity
            onPress={() => setVisible(false)}
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
          Chọn danh mục
        </String>
        
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={item.onPress}>
                <Item name={item.categoryName} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              paddingHorizontal: sizeFactor / 2,
              marginBottom: sizeFactor,
            }}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <String>Không có danh mục chi tiêu nào</String>
          </View>
        )}
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

export default AddBudgetScreen;
