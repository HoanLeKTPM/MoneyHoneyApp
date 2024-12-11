const subcategoryNameReducer = (state = "", action) => {
  switch (action.type) {
    case "EDIT_SUBNAME":
      state = action.name;
      return state;
    default:
      return state;
  }
};

export default subcategoryNameReducer;
