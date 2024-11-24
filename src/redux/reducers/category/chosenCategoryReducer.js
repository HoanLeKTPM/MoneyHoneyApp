const { DESELECTCATEGORY } = require("../../actions/actionType");

const chosenCategoryReducer = (state = { key: "" }, action) => {
  if (action.type === "CHOOSE_CATEGORY") {
    state = "";
    state = {
      key: action.category.key,
      categoryName: action.category.categoryName,
      icon: action.category.icon,
      parentID: action.category.parentID,
      typeID: action.category?.typeID,
      isDeleted: action.category.isDeleted,
    };
    console.log(state);
    return state;
  }
  if (action.type === DESELECTCATEGORY) {
    state = "";
    state = {
      key: "",
    };
    return state;
  }
  return state;
};

export default chosenCategoryReducer;
