import { getAuth } from "firebase/auth";
import { userRef } from "../../../database/firebase/firebase"
import { ref, onValue, child } from "firebase/database";

let uid = "none";
if (getAuth().currentUser) {
  uid = getAuth().currentUser.uid;
}
// const categoryRef = rootRef.child('users').child(uid).child('Category');
// console.log(categoryRef);
const userCategoryRef = child(userRef, `${uid}/Category`);

const defaultCategories = () => {
  const categories = [];
  onValue(userCategoryRef, (snapshot) => {
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
