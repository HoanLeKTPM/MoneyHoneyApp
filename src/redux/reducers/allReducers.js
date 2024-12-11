// redux
import { combineReducers } from "redux";

// category reducers
import selectedTypeReducer from "./category/selectedTypeReducer";
import allCategoriesReducer from "./category/allCategoriesReducer";
import renderedCategoriesReducer from "./category/renderedCategoriesReducer";
import searchTextReducer from "./category/searchTextReducer";
import chosenCategoryReducer from "./category/chosenCategoryReducer";
import addedSubCategoriesReducer from "./category/addedSubCategoriesReducer";
import categoryNameReducer from "./category/categoryNameReducer";
import selectedIconReducer from "./category/selectedIconReducer";
import subCategoriesReducer from "./category/subCategoriesReducer";
import editableButtonGroupReducer from "./category/editableButtonGroupReducer";
import editedSubCategoriesReducer from "./category/editedSubCategoriesReducer";
import isVisibleReducer from "./category/isVisibleReducer";
import isVisibleIconDialogReducer from "./category/isVisibleIconDialogReducer";
import subcategoryNameReducer from "./category/subcategoryNameReducer";
import isWorkingWithSubReducer from "./category/isWorkingWithSubReducer";
//wallet reducers
import WalletReducer from "./wallet/WalletReducer";
import selectedWalletReducer from "./wallet/selectedWalletReducer";
//transaction screen reducer
import selectedSubReducer from "./transaction/selectedSubReducer";
import allSubReducer from "./transaction/allSubReducer";
import showDatePickerReducer from "./transaction/showDatePickerReducer";
import sodu_transReducer from "./transaction/sodu_transReducer";
import datemode_transReducer from "./transaction/datemode_transReducer";
import date_transReducer from "./transaction/date_transReducer";
import userNameReducer from "./setting/userNameReducer";

import selectedTransactionReducer from "./transaction/selectedTransactionReducer";

const allReducers = combineReducers({
  WalletReducer,
  selectedSubReducer,
  allSubReducer,
  showDatePickerReducer,
  sodu_transReducer,
  datemode_transReducer,
  date_transReducer,
  selectedWalletReducer,
  selectedTransactionReducer,
  selectedType: selectedTypeReducer,
  allCategories: allCategoriesReducer,
  renderedCategories: renderedCategoriesReducer,
  searchText: searchTextReducer,
  chosenCategory: chosenCategoryReducer,
  addedSubCategories: addedSubCategoriesReducer,
  categoryName: categoryNameReducer,
  selectedIcon: selectedIconReducer,
  subCategories: subCategoriesReducer,
  editableButtonGroup: editableButtonGroupReducer,
  editedSubCategories: editedSubCategoriesReducer,
  isVisible: isVisibleReducer,
  userName: userNameReducer,
  isVisibleIconDialog: isVisibleIconDialogReducer,
  subcategoryName: subcategoryNameReducer,
  isWorkingWithSub: isWorkingWithSubReducer,
});

export default allReducers;
