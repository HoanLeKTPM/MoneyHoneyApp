import * as firebase from "firebase";
import { userRef } from "../../../database";

let uid = "none";
if (firebase.auth().currentUser) {
  uid = firebase.auth().currentUser.uid;
}
// const categoryRef = rootRef.child('users').child(uid).child('Category');
// console.log(categoryRef);
const userCategoryRef = userRef.child(uid).child("Category");

const defaultCategories = () => {
  const categories = [];
  userCategoryRef.on("value", (snapshot) => {
    snapshot.forEach((element) => {
      categories.push({
        key: element.key,
        categoryName: element.toJSON().CategoryName,
        icon: element.toJSON().Icon,
        parentID: element.toJSON().ParentID,
        typeID: element.toJSON().TypeID,
        isDeleted: element.toJSON().IsDeleted,
      });
      // console.log("e " + element.toJSON().IsDeleted)
      // console.log("ek " + element.toJSON().TypeID)
    });
  });
  //console.log(userCategoryRef);
  return categories;
};

const allCategoriesReducer = (state = defaultCategories(), action) => {
  if (action.type === "UPDATE_CATEGORIES") {
    state = [];
    action.categories.forEach((element) => {
      state.push({
        key: element.key,
        categoryName: element.toJSON().CategoryName,
        icon: element.toJSON().Icon,
        parentID: element.toJSON().ParentID,
        typeID: element.toJSON().TypeID,
        isDeleted: element.toJSON().IsDeleted,
      });
    });
    return state;
  }
  return state;
};

export default allCategoriesReducer;
