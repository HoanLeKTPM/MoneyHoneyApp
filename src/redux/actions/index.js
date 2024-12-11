//Tat ca cac action duoc khai bao o actionType va dinh nghia o index
//Nho import vao day truoc
import {
  INCREMENT,
  DECREMENT,
  UPDATEWALLETLIST,
  DESELECTCATEGORY,
  SELECTSUB,
  DESELECTSUB,
  UPDATESUBCATEGORY,
  SETSHOWDATEPICKER,
  CHANGESODU_TRANS,
  CHANGEDATEMODE_TRANS,
  CHANGEDATE_TRANS,
  SELECTWALLET,
  DELETEWALLET,
  RESET_SUBCATEGORIES,
} from './actionType'

//bat dau khai bao cac thanh phan cua action ben duoi
export const increaseAction = (step) => { //khai bao cac tham so cua action trong ngoac tron sau dau =
  return {
    type: INCREMENT, //action type
    step: step, //so luong tang len
  }
}

export const decreaseAction = (step) => {
  return {
    type: DECREMENT, //action type
    step: step, //so luong giam xuong
  }
}
//Thang
export const UpdateWalletAction = (snap) => {
  return {
    type: UPDATEWALLETLIST,
    snap: snap,
  }
}

export const DeselectCategoryAction = () => {
  return {
    type: DESELECTCATEGORY,
  }
}

export const SelectSubAction = (category) => {
  return {
    type: SELECTSUB,
    category: category
  }
}

export const DeselectSubAction = () => {
  return {
    type: DESELECTSUB,
  }
}

export const UpdateSubAction = (category) => {
  return {
    type: UPDATESUBCATEGORY,
    category: category,
  }
}

export const SetShowDatePicker = (bool) => {
  return {
    type: SETSHOWDATEPICKER,
    bool: bool,
  }
}

export const ChangeSoDuTransAction = (sodu) => {
  return {
    type: CHANGESODU_TRANS,
    sodu: sodu,
  }
}

export const ChangeDateModeaTransAction = (datemode) => {
  return {
    type: CHANGEDATEMODE_TRANS,
    datemode: datemode,
  }
}

export const ChangeDateTransAction = (date) => {
  return {
    type: CHANGEDATE_TRANS,
    date: date,
  }
}

export const SelectWallet = (value) => {
  return {
    type: SELECTWALLET,
    value: value
  }
}

export const SelectTransaction = (value) => {
  return {
    type: "SELECT_TRANS",
    value: value,
  }
}
//#region Tien

//#region selectedType 
export function changeType(selectedType) {
  return {
    type: 'CHANGE_TYPE',
    selectedType: selectedType
  };
}
//#endregion

//#region renderedCategories
export function reloadCategory(categories) {
  return {
    type: 'RELOAD_CATEGORY',
    categories: categories
  }
}
//#endregion

//#region allCategories
export function updateCategories(categories) {
  return {
    type: 'UPDATE_CATEGORIES',
    categories: categories
  }
}
//#endregion

//#region searchText
export function changeSearchText(text) {
  return {
    type: 'CHANGE_SEARCH_TEXT',
    text: text
  }
}

export function clearSearchText() {
  return {
    type: 'CLEAR_SEARCH_TEXT',
  }
}
//#endregion

//#region chosenCategory
export function chooseCategory(category) {
  return {
    type: 'CHOOSE_CATEGORY',
    category: category
  }
}
//#endregion

//#region categoryName
export function changeName(text) {
  return {
    type: 'CHANGE_NAME',
    text: text
  }
}
//#endregion

//#region subCategories
export function getSubCategories(subCategories) {
  return {
    type: 'GET_SUB',
    subCategories: subCategories
  }
}

export function updateSubCategories(subCategory) {
  return {
    type: 'UPDATE_SUB',
    subCategory: subCategory
  }
}

export function getSubCategoriesBeforeEditing(subCategories) {
  return {
    type: 'BACK_BEFORE_EDITING',
    subCategories: subCategories
  }
}
//#endregion

//#region addedSubCategories
export function addSubCategory(subCategory) {
  return {
    type: 'ADD_SUB',
    subCategory: subCategory
  }
}

export function reloadAddedSubCategories() {
  return {
    type: 'RELOAD'
  }
}
//#endregion

//#region editedSubCategories
export function editSubCategory(subCategory) {
  return {
    type: 'EDIT_SUB',
    subCategory: subCategory
  }
}

export function reloadEditedSubCategories() {
  return {
    type: 'RELOAD_EDIT'
  }
}
//#endregion

//#region isVisible
export function openDialog() {
  return {
    type: 'OPEN_DIALOG',
    visible: true,
  }
}

export function closeDialog() {
  return {
    type: 'CLOSE_DIALOG',
    visible: false,
  }
}
//#endregion

//#region isVisibleIconDialog
export function openIconDialog() {
  return {
    type: 'OPEN_ICON_DIALOG',
  }
}

export function closeIconDialog() {
  return {
    type: 'CLOSE_ICON_DIALOG',
  }
}
//#endregion

//#region editableButtonGroup
export function showType(selectedType) {
  return {
    type: 'SHOW_TYPE',
    selectedType: selectedType,
  }
}

export function editType() {
  return {
    type: 'EDIT_TYPE'
  }
}
//#endregion

//#region isSignedIn
export function signIn() {
  return {
    type: 'SIGNIN'
  }
}

export function signOut() {
  return {
    type: 'SIGNOUT'
  }
}
//#endregion

//#region selectedIcon
export function selectIcon(index) {
  return {
    type: 'SELECT_ICON',
    selectedIndex: index
  }
}

export function setAddingIcon(index) {
  return {
    type: 'ADDING_ICON',
    addIndex: index
  }
}

export function setEditingIcon(index) {
  return {
    type: 'EDITING_ICON',
    editIndex: index
  }
}

export function setSubIcon(index) {
  return {
    type: 'SUB_ICON',
    subIndex: index
  }
}
//#endregion

//#region isWorkingWithSub
export function workWithCategory() {
  return {
    type: 'WORKING_CATE',
  }
}

export function workWithSubCategory() {
  return {
    type: 'WORKING_SUBCATE',
  }
}
//#endregion

//#region userName
export function editUserName(name) {
  return {
    type: 'EDIT_NAME',
    name: name
  }
}
//#endregion

//#region subcategoryName
export function editSubName(name) {
  return {
    type: 'EDIT_SUBNAME',
    name: name
  }
}
//#endregion

export const deleteWallet = (walletId) => {
  return {
    type: DELETEWALLET,
    walletId
  };
};

//#endregion

export const resetSubCategories = () => ({
  type: RESET_SUBCATEGORIES
});