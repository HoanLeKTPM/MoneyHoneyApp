const { SELECTSUB, DESELECTSUB } = require("../../actions/actionType");

const selectedSubReducer = (state = { key: "" }, action) => {
  if (action.type === SELECTSUB) {
    state = "";
    state = {
      key: action.category.key,
      categoryName: action.category.categoryName,
      icon: action.category.icon,
    };
    return state;
  }
  if (action.type === DESELECTSUB) {
    state = "";
    state = {
      key: "",
    };
    return state;
  }
  return state;
};

export default selectedSubReducer;
