const isWorkingWithSubReducer = (state = false, action) => {
  switch (action.type) {
    case "WORKING_CATE":
      state = false;
      return state;
    case "WORKING_SUBCATE":
      state = true;
      return state;
    default:
      return state;
  }
};

export default isWorkingWithSubReducer;
