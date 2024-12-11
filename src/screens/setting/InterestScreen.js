// react
import React, { Component, useEffect, useState } from "react";
import { View, Image, Alert } from "react-native";

// firebase

// redux
import { connect } from "react-redux";

// components
import {
  String,
  ScreenView,
  HomoTextInput,
  Button1,
  Button2,
  Space,
} from "../../components/Basic";

// constants
import { colors, sizeFactor, styles, windowWidth } from "../../constants";
import { Picker } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { TextInput } from "react-native";
import toMoneyString, { FloatToMoney } from "../../components/toMoneyString";

// Tạo custom ButtonGroup component với default parameters
const CustomButtonGroup = ({
  containerStyle = {},
  onPress = () => {},
  selectedIndex = 0,
  buttons = [],
}) => {
  return (
    <ButtonGroup
      containerStyle={containerStyle}
      onPress={onPress}
      selectedIndex={selectedIndex}
      buttons={buttons}
      textStyle={{ fontSize: 14 }}
      selectedTextStyle={{ color: colors.blue }}
      selectedButtonStyle={{ backgroundColor: colors.blue + '20' }}
    />
  );
};

export const InterestScreen = () => {
  const modes = ["Lãi suất thường", "Lãi suất kép"];
  const [mode, setMode] = useState(0);
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [rate, setRate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [result, setResult] = useState("");

  const calculateNormal = () => {
    if (amount && duration && rate) {
      const res =
        (((parseFloat(amount) * parseFloat(rate)) / 100) *
          parseFloat(duration)) /
        12;
      setResult(FloatToMoney(res));
    } else Alert.alert("Thông báo", "Bạn chưa nhập đủ thông tin");
  };

  const calculateAdvanced = () => {
    if (amount && duration && rate && frequency) {
      const res =
        parseFloat(amount) *
        Math.pow(
          1 + parseFloat(rate) / 100 / parseFloat(frequency),
          parseFloat(duration) * parseFloat(frequency)
        ) -
        parseFloat(amount);
      setResult(FloatToMoney(res));
    } else Alert.alert("Thông báo", "Bạn chưa nhập đủ thông tin");
  };

  const config = (mode) => {
    switch (mode) {
      case 0: {
        return {
          durationLabel: "Kỳ hạn (tháng)",
          durationPlaceHolder: "Nhập số tháng",
          calFunction: () => calculateNormal(),
        };
      }
      case 1: {
        return {
          durationLabel: "Số năm",
          durationPlaceHolder: "Nhập số năm",
          calFunction: () => calculateAdvanced(),
        };
      }
    }
  };

  const resetFields = () => {
    setAmount("");
    setDuration("");
    setRate("");
    setResult("");
    setFrequency("");
  };

  return (
    <ScreenView style={{ backgroundColor: "white" }}>
      <View
        style={{
          margin: sizeFactor,
          alignItems: "center",
          marginTop: sizeFactor * 2,
        }}
      >
        <Image
          source={require("../../assets/others/interest.png")}
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
          Tính lãi suất
        </String>
      </View>
      <CustomButtonGroup
        containerStyle={{ 
          marginTop: -10, 
          marginHorizontal: sizeFactor * 3,
          borderRadius: 8,
          borderColor: colors.gray,
        }}
        onPress={(index) => {
          resetFields();
          setMode(index);
        }}
        selectedIndex={mode}
        buttons={modes}
      />
      <View
        style={{
          alignItems: "center",
          marginHorizontal: sizeFactor * 3,
          marginVertical: sizeFactor,
        }}
      >
        <HomoTextInput
          label="Số tiền gửi"
          placeholder="Nhập số tiền"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={(value) => {
            setAmount(value);
          }}
        />

        <HomoTextInput
          label={config(mode).durationLabel}
          placeholder={config(mode).durationPlaceHolder}
          keyboardType="decimal-pad"
          value={duration}
          onChangeText={(value) => {
            setDuration(value);
          }}
        />

        <HomoTextInput
          label="Lãi suất hàng năm"
          placeholder="Nhập % năm"
          keyboardType="decimal-pad"
          value={rate}
          onChangeText={(value) => {
            setRate(value);
          }}
        />
        {mode === 1 && (
          <HomoTextInput
            label="Số lần ghép lãi trong năm"
            placeholder="Số lần"
            keyboardType="decimal-pad"
            value={frequency}
            onChangeText={(value) => {
              setFrequency(value);
            }}
          />
        )}
        <HomoTextInput
          labelStyle={{ color: colors.blue }}
          inputStyle={{ color: colors.blue }}
          label="Tiền lãi cuối kì"
          placeholder="Tiền lãi"
          keyboardType="decimal-pad"
          value={result}
        />
      </View>
      <View
        style={{
          alignItems: "stretch",
          marginHorizontal: sizeFactor * 3,
        }}
      >
        <Button2
          onPress={() => {
            resetFields();
          }}
        >
          Nhập lại
        </Button2>
        <Button1
          onPress={() => {
            config(mode).calFunction();
          }}
        >
          Tính
        </Button1>
      </View>
    </ScreenView>
  );
};

export default InterestScreen;
