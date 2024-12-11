const userNameReducer = (state = "", action) => {
  switch (action.type) {
    case "EDIT_NAME":
      state = action.name;
      return state;
    default:
      return state;
  }
};

export default userNameReducer;
