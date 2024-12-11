import React, { Component, useState } from "react";
import {
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, SearchBar, ButtonGroup, Overlay } from "react-native-elements";
import { connect } from "react-redux";

import { String, Space, IconCategory } from "./Basic";

import {
  colors,
  sizeFactor,
  windowWidth,
  styles,
  windowHeight,
} from "../constants";
import {
  closeIconDialog,
  selectIcon,
  setAddingIcon,
  setEditingIcon,
  setSubIcon,
} from "../redux/actions";
import IconImage from "./Image";

class ChooseIconDialog extends Component {
  constructor() {
    super();

    // this.state = {
    //     selectedIndex: 0
    // }
  }

  IconRows = () => {
    const numberOfRows = Math.ceil((IconImage.length - 2) / 4);
    let rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        const index = 4 * i + j;
        if (index < IconImage.length - 2) {
          const iconPath = IconImage[index].iconPath;
          const isSelected =
            this.props.selectedIcon.selectedIndex === index ? true : false;
          row.push(
            <IconCategory
              choosed={isSelected}
              source={iconPath}
              onPress={() => {
                this.props.selectIcon(index);
              }}
            />
          );
          //console.log("dia " + this.props.selectedIcon);
        }
      }
      rows.push(
        <View
          style={{
            flexDirection: "row",
            marginRight: -sizeFactor / 2,
            marginBottom: sizeFactor / 2,
          }}
        >
          {row}
        </View>
      );
    }
    return rows;
  };

  closeIconDialog = () => {
    // dirty code to skip checking is adding or editing or working with subcategory
    // can do this b/c in CategoriesScreen, i always setAddingIcon or setEditingIcon before navigating to add or edit screen
    // set sub in EditCategoryScreen before ...
    console.log("wsub " + this.props.isWorkingWithSub);
    if (this.props.isWorkingWithSub) {
      this.props.setSubIcon(this.props.selectedIcon.selectedIndex);
    } else {
      this.props.setAddingIcon(this.props.selectedIcon.selectedIndex);
      this.props.setEditingIcon(this.props.selectedIcon.selectedIndex);
    }
    this.props.closeIconDialog();
  };

  componentDidMount() {}

  render() {
    return (
      <Overlay
        overlayStyle={{
          borderRadius: sizeFactor,
          width: windowWidth - sizeFactor * 4,
          paddingHorizontal: sizeFactor * 1.5,
          paddingVertical: sizeFactor * 1.5,
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        isVisible={this.props.isVisibleIconDialog}
      >
        <View
          style={{ right: sizeFactor, top: sizeFactor, position: "absolute" }}
        >
          <TouchableOpacity onPress={() => this.props.closeIconDialog()}>
            <Icon name="clear" color={colors.gray} size={sizeFactor * 2} />
          </TouchableOpacity>
        </View>
        <String
          style={{
            fontSize: sizeFactor,
            fontWeight: "bold",
          }}
        >
          Biểu tượng danh mục
        </String>
        <Space />
        <ScrollView
          style={{
            width: windowWidth - sizeFactor * 7,
            height: windowHeight / 3,
          }}
          vertical
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              alignContent: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: sizeFactor / 4,
            }}
          >
            {this.IconRows()}
          </View>
        </ScrollView>
        <Space />
        <Space />
        <TouchableOpacity onPress={() => this.closeIconDialog()}>
          <String style={{ color: colors.blue }}>Đồng ý</String>
        </TouchableOpacity>
      </Overlay>
    );
  }
}

function mapStateToProps(state) {
  return {
    isVisibleIconDialog: state.isVisibleIconDialog,
    selectedIcon: state.selectedIcon,
    isWorkingWithSub: state.isWorkingWithSub,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeIconDialog: () => {
      dispatch(closeIconDialog());
    },
    selectIcon: (index) => {
      dispatch(selectIcon(index));
    },
    setAddingIcon: (index) => {
      dispatch(setAddingIcon(index));
    },
    setEditingIcon: (index) => {
      dispatch(setEditingIcon(index));
    },
    setSubIcon: (index) => {
      dispatch(setSubIcon(index));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseIconDialog);

