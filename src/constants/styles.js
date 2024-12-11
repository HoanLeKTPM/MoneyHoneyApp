// react
import { StyleSheet } from "react-native";

// constants
import { colors } from "./colors";
import {
  sizeFactor,
  windowWidth,
  windowHeight,
  managerCategorySize,
  categorySize,
  iconCategorySize,
  iconCategoryImageSize,
  smallCategorySize,
} from "./ruler";

export const styles = StyleSheet.create({
  //String
  string: {
    fontSize: sizeFactor,
    marginBottom: sizeFactor * 0.75,
  },
  //Heading
  heading: {
    fontSize: sizeFactor * 1.25,
    fontWeight: "bold",
    marginBottom: sizeFactor * 0.75,
    color: colors.gray,
    textTransform: "uppercase",
  },
  //Title
  title: {
    fontSize: sizeFactor * 1.75,
    fontWeight: "bold",
    marginVertical: sizeFactor,
    marginHorizontal: sizeFactor * 1.25,
    color: "black",
  },
  //PositiveNumber
  positiveNumber: {
    fontWeight: "bold",
    color: colors.greenDark,
    fontSize: sizeFactor * 1.25,
  },
  //NegativeNumber
  negativeNumber: {
    fontWeight: "bold",
    color: colors.redDark,
    fontSize: sizeFactor * 1.25,
  },
  //HomoTextInput
  homoTextInputContainerStyle: {
    width: windowWidth - sizeFactor * 6,
    padding: 0,
  },
  homoTextInputInputContainerStyle: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  homoTextInputErrorStyle: {
    color: colors.red,
    alignSelf: "flex-end",
  },
  //TransactionMonthSummary
  transactionMonthSummaryContainerStyle: {
    width: windowWidth - sizeFactor * 2,
    paddingHorizontal: sizeFactor,
    paddingTop: sizeFactor,
  },
  transactionMonthSummaryStyle: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: sizeFactor * 0.75,
    alignItems: "center",
  },
  cardHeader1: {
    fontWeight: "bold",
    fontSize: sizeFactor * 1.5,
    marginHorizontal: sizeFactor / 2,
  },
  //ScreenView
  background: {
    flex: 1,
    backgroundColor: colors.gray6,
  },
  screenView: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  //RoundedView
  roundedView: {
    backgroundColor: "white",
    borderRadius: sizeFactor,
    margin: sizeFactor,
    marginTop: 0,
    paddingHorizontal: sizeFactor,
    paddingTop: sizeFactor,
  },
  container: {
    marginHorizontal: sizeFactor,
    marginBottom: sizeFactor * 0.75,
    paddingTop: sizeFactor,
    paddingBottom: sizeFactor * 0.25,
    paddingHorizontal: sizeFactor,
    borderRadius: sizeFactor,
  },
  //SimpleCarousel
  simpleCarousel: {
    backgroundColor: "white",
    borderRadius: sizeFactor,
    margin: sizeFactor,
    marginTop: 0,
  },
  //Row
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  //RowLeft
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  //Button
  button: {
    justifyContent: "center",
    borderWidth: 0,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.6,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  //Button1
  button1: {
    justifyContent: "center",
    borderWidth: 0,
    backgroundColor: colors.blue,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.6,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  button1String: {
    color: "white",
    fontWeight: "bold",
  },
  //Button2
  button2: {
    justifyContent: "center",
    borderWidth: 0,
    backgroundColor: colors.gray6,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.6,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  button2String: {
    color: "black",
    fontWeight: "bold",
  },
  //Button3
  button3: {
    justifyContent: "center",
    paddingHorizontal: sizeFactor,
    flexDirection: "row",
  },
  button3String: {
    color: colors.blue,
    fontWeight: "bold",
  },
  //OutlineButton
  outlineButton: {
    justifyContent: "center",
    borderWidth: 1.25,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.75,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  //ToggleButton
  toggleButton: {
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.75,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  //ColorSelectButton
  colorSelectButton: (thecolor, selected) => {
    return {
      width: (windowWidth - 10 * sizeFactor) / 9,
      height: (windowWidth - 10 * sizeFactor) / 9,
      borderRadius: (windowWidth - 6 * sizeFactor) / 4.5,
      backgroundColor: thecolor,
      opacity: selected == thecolor ? 1 : 0.2,
      marginBottom: sizeFactor * 0.75,
    };
  },
  //ManagerCategory
  managerCategoryContainer: {
    height: managerCategorySize + sizeFactor / 2,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  managerCategoryChoosed: (choosed) => {
    return {
      alignSelf: "center",
      marginBottom: sizeFactor / 2,
      width: managerCategorySize,
      height: managerCategorySize,
      opacity: choosed ? 1 : 0,
      position: "absolute",
    };
  },
  managerCategoryImage: {
    alignSelf: "center",
    marginBottom: sizeFactor / 2,
    marginTop: sizeFactor * 0.24,
    marginLeft: sizeFactor * 0.03,
    opacity: 1,
    width: managerCategorySize - sizeFactor * 1.25,
    height: managerCategorySize - sizeFactor * 1.25,
  },
  managerCategoryStringContainer: {
    width: managerCategorySize,
    alignItems: "center",
  },
  managerCategoryString: (choosed) => {
    return {
      fontSize: sizeFactor * 0.75,
      fontWeight: choosed ? "bold" : "normal",
      color: choosed ? colors.blue : "black",
    };
  },
  //HugeCategory
  hugeCategory: {
    alignSelf: "center",
    marginBottom: sizeFactor / 2,
    width: ((windowWidth - 5 * sizeFactor) / 4) * 0.75,
    height: ((windowWidth - 5 * sizeFactor) / 4) * 0.75,
  },
  //SettingRow
  settingRow: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: sizeFactor * 0.75,
  },
  //NormalCard
  normalCard: {
    backgroundColor: "white",
    borderRadius: sizeFactor,
    margin: sizeFactor,
    marginBottom: 0,
    paddingHorizontal: sizeFactor,
    paddingTop: sizeFactor,
  },
  dialogModalContainer: {
    flex: 1,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  dialogModal: (width, height) => {
    return {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      width: width,
      height: height,
    };
  },
  transactionsFullListView: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionsFullListDate: {
    marginBottom: 0,
    fontSize: sizeFactor * 2,
    marginRight: sizeFactor,
    marginTop: 0,
  },
  transactionsFullListDateOfWeek: {
    fontSize: sizeFactor * 0.75,
    marginBottom: 0,
    fontWeight: "bold",
    color: colors.gray,
  },
  transactionsFullListMonth: {
    fontSize: sizeFactor * 0.75,
    marginBottom: 0,
    color: colors.gray,
  },
  categoryContainer: {
    height: categorySize + sizeFactor / 2,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryChoosed: (choosed) => {
    return {
      alignSelf: "center",
      marginBottom: sizeFactor / 2,
      width: categorySize,
      height: categorySize,
      opacity: choosed ? 1 : 0,
      position: "absolute",
    };
  },
  categoryImage: {
    alignSelf: "center",
    marginBottom: sizeFactor / 2,
    marginTop: sizeFactor * 0.24,
    marginLeft: sizeFactor * 0.03,
    opacity: 1,
    width: categorySize - sizeFactor * 1.25,
    height: categorySize - sizeFactor * 1.25,
  },
  categoryStringContainer: {
    width: categorySize,
    alignItems: "center",
  },
  categoryString: (choosed) => {
    return {
      fontSize: sizeFactor * 0.75,
      fontWeight: choosed ? "bold" : "normal",
      color: choosed ? colors.blue : "black",
    };
  },
  iconCategory: {
    height: iconCategorySize,
    width: iconCategorySize,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: sizeFactor / 2,
  },
  iconCategoryChoosed: (choosed) => {
    return {
      alignSelf: "center",
      marginBottom: sizeFactor / 2,
      opacity: choosed ? 1 : 0,
      position: "absolute",
      height: iconCategorySize,
      width: iconCategorySize,
    };
  },
  iconCategoryImage: {
    alignSelf: "center",
    marginBottom: sizeFactor / 2,
    marginTop: sizeFactor / 2,
    opacity: 1,
    width: iconCategoryImageSize,
    height: iconCategoryImageSize,
  },
  smallCategoryContainer: {
    height: smallCategorySize + sizeFactor / 2,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  smallCategoryChoosed: (choosed) => {
    return {
      alignSelf: "center",
      marginBottom: sizeFactor / 2,
      width: smallCategorySize,
      height: smallCategorySize,
      opacity: choosed ? 1 : 0,
      position: "absolute",
    };
  },
  smallCategoryImage: {
    alignSelf: "center",
    marginBottom: sizeFactor / 2,
    width: smallCategorySize - sizeFactor * 1.25,
    height: smallCategorySize - sizeFactor * 1.25,
    opacity: 1,
  },
  smallCategoryTextContainer: {
    width: smallCategorySize,
    alignItems: "center",
  },
  smallCategoryText: (choosed) => {
    return {
      fontSize: sizeFactor * 0.75,
      fontWeight: this.choosed ? "bold" : "normal",
      color: this.choosed ? colors.blue : "black",
    };
  },
  outlineToggleButton: (color, checked) => {
    return {
      justifyContent: "center",
      borderWidth: 1.25,
      paddingHorizontal: sizeFactor,
      borderColor: color,
      backgroundColor: checked == "true" ? "transparent" : color,
      borderRadius: 9999,
      borderStyle: checked == "true" ? "dashed" : "solid",
      paddingTop: sizeFactor * 0.75,
      flexDirection: "row",
      marginBottom: sizeFactor,
    };
  },
  walletRow: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  walletSelectContainer: {
    borderRadius: sizeFactor,
    borderWidth: 0,
    borderColor: colors.gray3,
    marginBottom: sizeFactor,
    marginHorizontal: 0,
    backgroundColor: colors.gray5,
    height: sizeFactor * 2.5,
  },
  walletSelectText: {
    fontSize: sizeFactor * 0.75,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.gray,
  },
  walletSelectButton: {
    borderWidth: 0,
    backgroundColor: colors.gray5,
  },
  walletSelectButtonContainer: {
    borderWidth: 0,
    backgroundColor: colors.gray5,
    borderColor: colors.gray5,
  },
  kindSelectContainer: {
    borderRadius: sizeFactor * 0.75,
    borderWidth: 1.25,
    borderColor: colors.gray3,
    marginBottom: sizeFactor,
    marginHorizontal: sizeFactor,
    backgroundColor: colors.gray5,
    height: sizeFactor * 2,
  },
  kindSelectText: {
    fontSize: sizeFactor * 0.75,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.gray,
  },
  //SmallKindSelect
  smallKindSelectContainer: {
    borderRadius: sizeFactor,
    borderWidth: 0,
    borderColor: colors.gray3,
    marginBottom: sizeFactor,
    marginHorizontal: sizeFactor,
    backgroundColor: colors.gray5,
    height: sizeFactor * 2,
  },
  smallKindSelectText: {
    fontSize: sizeFactor * 0.75,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: colors.gray,
  },
  smallKindSelectButtonContainer: {
    borderWidth: 0,
    backgroundColor: colors.gray5,
    borderColor: colors.gray5,
  },
  //EmptyTransactionIndicator
  emptyTransactionIndicator: {
    width: sizeFactor * 6,
    height: sizeFactor * 6 * 0.56666666666,
    marginBottom: sizeFactor * 1.25,
  },
  emptyIndicatorText: {
    fontSize: sizeFactor,
    fontWeight: "bold",
    color: colors.gray3,
  },
  outlineToggleButton: (color, checked) => {
    return {
      justifyContent: "center",
      borderWidth: 1.25,
      paddingHorizontal: sizeFactor,
      borderColor: color,
      backgroundColor: checked == "true" ? "transparent" : color,
      borderRadius: 9999,
      borderStyle: checked == "true" ? "dashed" : "solid",
      paddingTop: sizeFactor * 0.75,
      flexDirection: "row",
      marginBottom: sizeFactor,
    };
  },
});
