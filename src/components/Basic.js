// react
import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";

// other packages
import { Icon, Input, Divider } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import TextTicker from "react-native-text-ticker";
import toMoneyString from "./toMoneyString";
import { ButtonGroup } from '@rneui/themed';

// constants
import {
  sizeFactor,
  windowWidth,
  windowHeight,
  managerCategoryWidth,
  managerCategoryHeight,
  styles,
  colors,
} from "../constants";

export class String extends Component {
  render() {
    return (
      <TextTicker
        style={[styles.string, this.props.style]}
        duration={5000}
        loop
        bounce
        repeatSpacer={50}
      >
        {this.props.children}
      </TextTicker>
    );
  }
}

export class Heading extends Component {
  render() {
    return (
      <String style={[styles.heading, this.props.style]}>
        {this.props.children}
      </String>
    );
  }
}

export class Title extends Component {
  render() {
    return (
      <Text style={[styles.title, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

export class PositiveNumber extends Component {
  render() {
    return (
      <String style={[styles.positiveNumber, this.props.style]}>
        {this.props.children}
      </String>
    );
  }
}

export class NegativeNumber extends Component {
  render() {
    return (
      <String style={[styles.negativeNumber, this.props.style]}>
        {this.props.children}
      </String>
    );
  }
}

export class HomoTextInput extends Component {
  render() {
    return (
      <Input
        label="Text Input"
        placeholder="Placeholder"
        leftIcon={{
          name: this.props.leftIconName,
          color: colors.gray,
        }}
        labelStyle={{ color: colors.gray }}
        leftIconContainerStyle={{
          marginRight: this.props.leftIconName ? sizeFactor / 2 : 0,
        }}
        containerStyle={styles.homoTextInputContainerStyle}
        inputContainerStyle={styles.homoTextInputInputContainerStyle}
        errorStyle={styles.homoTextInputErrorStyle}
        {...this.props}
      />
    );
  }
}

export class TransactionMonthSummary extends Component {
  render() {
    return (
      <View
        style={{
          width: this.props.isLast
            ? windowWidth - sizeFactor * 2 + 4
            : windowWidth - sizeFactor * 2,
          paddingHorizontal: sizeFactor,
          paddingTop: sizeFactor,
        }}
      >
        <View style={styles.transactionMonthSummaryStyle}>
          <Icon
            name="chevron-left"
            type="material-community"
            color={colors.gray3}
            size={sizeFactor * 2}
            style={{
              marginTop: 2,
              opacity: this.props.leftChevronOpacity,
            }}
          />
          <Text style={styles.cardHeader1}>{this.props.month}</Text>
          <Icon
            name="chevron-right"
            type="material-community"
            color={colors.gray3}
            size={sizeFactor * 2}
            style={{
              marginTop: 2,
              opacity: this.props.rightChevronOpacity,
            }}
          />
        </View>
        <Row>
          <String style={{ color: colors.gray }}>Tổng thu</String>
          <String>{this.props.openBalance}</String>
        </Row>
        <Row>
          <String style={{ color: colors.gray }}>Tổng chi</String>
          <String>{this.props.endBalance}</String>
        </Row>
        <Divider style={{ marginBottom: sizeFactor }} />
        <Row style={{ marginBottom: sizeFactor * 0.5 }}>
          <String style={{ fontWeight: "bold" }}>Thay đổi</String>
          <String
            style={{
              fontWeight: "bold",
              color: this.props.changeColor,
            }}
          >
            {this.props.change}
          </String>
        </Row>
      </View>
    );
  }
}

export class ScreenView extends Component {
  render() {
    return (
      <SafeAreaView
        pointerEvents={this.props.disablePress ? "none" : "auto"}
        style={[styles.background, this.props.style]}
      >
        <KeyboardAvoidingView behavior="height" enabled={true}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.screenView}>{this.props.children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export class NormalCard extends Component {
  render() {
    return (
      <View style={[styles.normalCard, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

export class SimpleCarousel extends Component {
  render() {
    return (
      <ScrollView
        ref={(ref) => {
          this.scrollref = ref;
        }}
        horizontal
        snapToInterval={Math.ceil(windowWidth - sizeFactor * 2)}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.simpleCarousel}
        onScroll={this.props.onScroll}
        onContentSizeChange={() =>
          this.scrollref.scrollToEnd({ animated: false })
        }
      >
        {this.props.children}
      </ScrollView>
    );
  }
}

export class DialogModal extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={styles.dialogModalContainer}>
          <View style={styles.dialogModal(this.props.width, this.props.height)}>
            {this.props.children}
          </View>
        </View>
      </Modal>
    );
  }
}

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.button,
          {
            backgroundColor: this.props.backgroundColor,
          },
          this.props.style,
        ]}
      >
        <String
          style={{
            color: this.props.color,
            fontWeight: "bold",
          }}
        >
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class Button1 extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button1, this.props.style]}
      >
        <String style={styles.button1String}>{this.props.children}</String>
      </TouchableOpacity>
    );
  }
}

export class Button2 extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button2, this.props.style]}
      >
        <String style={[styles.button2String, this.props.textStyle]}>
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class Button3 extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button3, this.props.style]}
      >
        <String style={[styles.button3String, this.props.textStyle]}>
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class OutlineButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.outlineButton,
          { borderColor: this.props.color },
          this.props.style,
        ]}
        onPress={this.props.onPress}
      >
        <String
          style={{
            color: this.props.color,
            fontWeight: "bold",
          }}
        >
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class ToggleButton extends Component {
  render() {
    var choosed = this.props.choosed;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.toggleButton,
          {
            backgroundColor:
              choosed == "true" ? this.props.color : this.props.background,
            borderColor: this.props.color,
          },
          this.props.style,
        ]}
      >
        <String
          style={{
            color: choosed == "true" ? this.props.background : this.props.color,
            fontWeight: "bold",
          }}
        >
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class AddWalletButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon
          name="credit-card-plus-outline"
          type="material-community"
          color={this.props.color}
          size={sizeFactor * 2}
          style={{ marginRight: sizeFactor / 2 }}
        />
      </TouchableOpacity>
    );
  }
}

export class ColorSelectButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={styles.colorSelectButton(
            this.props.color,
            this.props.selected
          )}
        />
      </TouchableOpacity>
    );
  }
}

export class TouchableText extends Component {
  render() {
    return (
      <Row style={{ marginHorizontal: sizeFactor * 1.5 }}>
        <String></String>
        <TouchableOpacity onPress={this.props.onPress}>
          <String style={{ fontSize: sizeFactor, color: colors.blue }}>
            {this.props.children}
          </String>
        </TouchableOpacity>
      </Row>
    );
  }
}

export class TouchableDeleteText extends Component {
  render() {
    return (
      <Row style={{ marginHorizontal: sizeFactor * 0.5 }}>
        <String></String>
        <TouchableOpacity onPress={this.props.onPress}>
          <String style={{ fontSize: sizeFactor, color: colors.redDark }}>
            {this.props.children}
          </String>
        </TouchableOpacity>
      </Row>
    );
  }
}
export class Category extends Component {
  render() {
    var choosed = this.props.choosed;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ marginRight: sizeFactor }}>
          <View style={styles.categoryContainer}>
            <Image
              source={require("../assets/categories/choosed.png")}
              style={styles.categoryChoosed(this.props.choosed)}
            ></Image>
            <Image
              source={this.props.source}
              style={styles.categoryImage}
            ></Image>
          </View>
          <View
            style={[
              styles.categoryStringContainer,
              this.props.stringContainerStyle,
            ]}
          >
            <String style={styles.categoryString(this.props.choosed)}>
              {this.props.children}
            </String>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export class IconCategory extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.iconCategory}>
          <Image
            source={require("../assets/categories/choosed.png")}
            style={styles.iconCategoryChoosed(this.props.choosed)}
          ></Image>
          <Image
            source={this.props.source}
            style={styles.iconCategoryImage}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  }
}

export class SmallCategory extends Component {
  render() {
    var choosed = this.props.choosed;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ marginRight: sizeFactor }}>
          <View style={styles.smallCategoryContainer}>
            <Image
              source={require("../assets/categories/choosed.png")}
              style={styles.smallCategoryChoosed(this.props.choosed)}
            ></Image>
            <Image
              source={this.props.source}
              style={styles.smallCategoryImage}
            ></Image>
          </View>
          <View style={styles.smallCategoryTextContainer}>
            <String style={styles.smallCategoryText(this.props.choosed)}>
              {this.props.children}
            </String>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export class Row extends Component {
  render() {
    return (
      <View style={[styles.row, this.props.style]}>{this.props.children}</View>
    );
  }
}

export class RowLeft extends Component {
  render() {
    return (
      <View style={[styles.rowLeft, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

export class OutlineToggleButton extends Component {
  render() {
    //change this to state instead
    const checked = this.props.checked;
    return (
      <TouchableOpacity
        style={styles.outlineToggleButton(this.props.color, checked)}
        onPress={this.props.onPress}
      >
        <Icon
          name={
            checked == "false" ? this.props.uncheckIcon : this.props.checkIcon
          }
          type="material-community"
          color={this.props.color}
          size={sizeFactor * 1.25}
        />
        <String
          style={{
            color:
              checked == "true" ? this.props.color : this.props.uncheckColor,
            fontWeight: checked == "true" ? "normal" : "bold",
          }}
        >
          {this.props.uncheckIcon == "" ? "" : " "}
          {checked == "true" ? this.props.checkedText : this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class WalletRow extends Component {
  render() {
    return (
      <View>
        <Row style={{ marginBottom: sizeFactor / 2 }}>
          <View style={styles.walletRow}>
            <Icon
              style={{ marginRight: sizeFactor }}
              name="wallet"
              size={sizeFactor * 1.5}
              type="material-community"
              color={this.props.color}
            />
            <String style={{ marginBottom: 0 }}>{this.props.name}</String>
          </View>
        </Row>
        <LooseDivider />
      </View>
    );
  }
}

export class SettingRow extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress}>
          <Row
            style={{
              marginBottom: sizeFactor / 4,
              paddingHorizontal: sizeFactor,
            }}
          >
            <View style={styles.settingRow}>
              <Icon
                style={{ marginRight: sizeFactor }}
                name={this.props.iconName}
                size={sizeFactor * 1.5}
                type="material-community"
                color={this.props.color}
              />
              <String style={{ marginBottom: 0 }}>{this.props.text}</String>
            </View>
            <Icon
              name="chevron-right"
              type="material-community"
              color={colors.gray}
            />
          </Row>
          <View style={{ paddingLeft: sizeFactor * 3.5 }}>
            <LooseDivider />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export class CategoryInManagerScreen extends Component {
  render() {
    var choosed = this.props.choosed;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ marginRight: sizeFactor }}>
          <View style={styles.managerCategoryManager}>
            <Image
              source={require("../assets/categories/choosed.png")}
              style={styles.managerCategoryChoosed(this.props.choosed)}
            ></Image>
            <Image
              source={this.props.source}
              style={styles.managerCategoryImage}
            ></Image>
          </View>
          <View
            style={[
              styles.managerCategoryStringContainer,
              this.props.stringContainerStyle,
            ]}
          >
            <String style={styles.managerCategoryString(this.props.choosed)}>
              {this.props.children}
            </String>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export class CategoryTable extends Component {
  render() {
    return <View style={this.props.style}>{this.props.rows}</View>;
  }
}

export class ChooseWalletList extends Component {
  render() {
    const Item = ({ name, color }) => <WalletRow name={name} color={color} />;
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={item.onPress}>
        <Item name={item.name} color={item.color} />
      </TouchableOpacity>
    );
    return <FlatList data={this.props.data} renderItem={renderItem} />;
  }
}

export class TransactionsList extends Component {
  render() {
    const Item = ({ subcategory, onPress, source, amount, color }) => (
      <TouchableOpacity onPress={onPress}>
        <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: sizeFactor }}>
              <Image
                source={source}
                style={{
                  width: sizeFactor * 2.25,
                  height: sizeFactor * 2.25,
                }}
              ></Image>
            </View>
            <String style={{ marginBottom: 0 }}>{subcategory}</String>
          </View>
          <String style={{ marginBottom: 0, color: color }}>{amount}</String>
        </Row>
      </TouchableOpacity>
    );
    const renderItem = ({ item }) => (
      <Item
        subcategory={item.subcategory}
        onPress={item.onPress}
        source={item.source}
        amount={toMoneyString(item.amount)}
        color={item.color}
      />
    );
    return <FlatList data={this.props.data} renderItem={renderItem} />;
  }
}

export class TransactionsFullList extends Component {
  render() {
    const Item = ({ date, dayOfWeek, month, change, list }) => (
      <NormalCard>
        <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
          <View style={styles.transactionsFullListView}>
            <String style={styles.transactionsFullListDate}>{date}</String>
            <View>
              <String style={styles.transactionsFullListDateOfWeek}>
                {dayOfWeek}
              </String>
              <String style={styles.transactionsFullListMonth}>{month}</String>
            </View>
          </View>
          <String
            style={{ marginBottom: 0, fontWeight: "bold", color: "black" }}
          >
            {change}
          </String>
        </Row>
        <LooseDivider />
        <View style={{ marginBottom: sizeFactor / 2 }}>
          <TransactionsList data={list} />
        </View>
      </NormalCard>
    );
    const renderItem = ({ item }) => (
      <Item
        date={item.date}
        dayOfWeek={item.dayOfWeek}
        month={item.month}
        list={item.list}
        change={toMoneyString(item.change)}
      />
    );
    return (
      <FlatList
        data={this.props.data}
        renderItem={renderItem}
        ListEmptyComponent={this.props.ListEmptyComponent}
      />
    );
  }
}

export class AddWalletKindSelect extends Component {
  constructor() {
    super();
    this.state = { selectedIndex: 1 };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  render() {
    const buttons = this.props.buttons;
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        disabled={this.props.disabled}
        onPress={this.props.onPress}
        selectedIndex={this.props.selectedIndex}
        buttons={buttons}
        containerStyle={styles.walletSelectContainer}
        textStyle={styles.walletSelectText}
        buttonStyle={styles.walletSelectButton}
        buttonContainerStyle={styles.walletSelectButtonContainer}
        innerBorderStyle={{ color: colors.gray3 }}
        selectedButtonStyle={{ backgroundColor: colors.blue }}
        selectedTextStyle={{ color: "white" }}
      />
    );
  }
}

export class KindSelect extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }
  render() {
    const buttons = this.props.buttons;
    //const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.props.onPress}
        selectedIndex={this.props.selectedIndex}
        buttons={buttons}
        containerStyle={styles.kindSelectContainer}
        textStyle={styles.kindSelectText}
        innerBorderStyle={{ color: colors.gray3 }}
        selectedButtonStyle={{ backgroundColor: "white" }}
        selectedTextStyle={{ color: colors.dark }}
      />
    );
  }
}

export class SmallKindSelect extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 1,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  render() {
    const buttons = this.props.buttons;
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.smallKindSelectContainer}
        textStyle={styles.smallKindSelectText}
        buttonStyle={{
          borderWidth: 0,
          backgroundColor: colors.gray5,
        }}
        buttonContainerStyle={styles.smallKindSelectButtonContainer}
        innerBorderStyle={{ color: colors.gray3 }}
        selectedButtonStyle={{ backgroundColor: colors.blue }}
        selectedTextStyle={{ color: "white" }}
      />
    );
  }
}

export class EmptyTransactionsIndicator extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          marginVertical: sizeFactor * 4,
        }}
      >
        <Image
          style={styles.emptyTransactionIndicator}
          source={require("../assets/others/empty.png")}
        />
        <String style={styles.emptyIndicatorText}>
          Bạn chưa có giao dịch nào!
        </String>
      </View>
    );
  }
}

export class LooseDivider extends Component {
  render() {
    return <Divider style={{ marginBottom: sizeFactor }} />;
  }
}

export class Space extends Component {
  render() {
    return (
      <View
        style={{
          height: 0,
          marginBottom: this.props.loose ? sizeFactor * 2 : sizeFactor / 2,
        }}
      />
    );
  }
}

export class RoundedView extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: sizeFactor,
          borderRadius: sizeFactor,
          paddingHorizontal: sizeFactor,
          paddingVertical: sizeFactor,
          marginBottom: sizeFactor,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

export class Wallet extends Component {
  render() {
    const isDefault = this.props.isDefault;
    return (
      <Card
        heading={this.props.heading}
        headingColor="white"
        color={this.props.color}
        icon="tune"
        iconColor="white"
        onPress={this.props.onPressEdit}
      >
        <Row>
          <String style={{ color: "white", fontSize: sizeFactor * 2 }}>
            VNĐ
          </String>
          <PositiveNumber style={{ color: "white", fontSize: sizeFactor * 2 }}>
            {this.props.children}
          </PositiveNumber>
        </Row>
        <Row>
          <String style={{ color: "white" }}>Ngày tạo</String>
          <String style={{ color: "white", fontWeight: "bold" }}>
            {this.props.date}
          </String>
        </Row>
        <Space />

        <OutlineToggleButton
          checked={this.props.isDefault}
          checkIcon="check-circle-outline"
          color="white"
          uncheckColor={this.props.color}
          onPress={this.props.onPressDefault}
          checkedText="Đang sử dụng"
        >
          Sử dụng
        </OutlineToggleButton>
      </Card>
    );
  }
}

export class Card extends Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.color }]}>
        <Row>
          <Heading style={[styles.heading, { color: this.props.headingColor }]}>
            {this.props.heading}
          </Heading>
          <TouchableOpacity onPress={this.props.onPress}>
            <Icon
              name={this.props.icon}
              type="material-community"
              color={this.props.iconColor}
              size={sizeFactor * 1.5}
            />
          </TouchableOpacity>
        </Row>
        {this.props.children}
      </View>
    );
  }
}

export class EmtpyTransactionsIndicator extends Component {
  render() {
    return (
      <View style={{ alignItems: "center", marginVertical: sizeFactor * 4 }}>
        <Image
          style={{
            width: sizeFactor * 6,
            height: sizeFactor * 6 * 0.56666666666,
            marginBottom: sizeFactor * 1.25,
          }}
          source={require("../assets/empty.png")}
        />
        <String
          style={{
            fontSize: sizeFactor,
            fontWeight: "bold",
            color: colors.gray3,
          }}
        >
          Bạn chưa có giao dịch nào!
        </String>
      </View>
    );
  }
}
