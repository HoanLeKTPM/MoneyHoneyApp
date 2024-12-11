const isVisibleIconDialogReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_ICON_DIALOG":
      state = true;
      return state;
    case "CLOSE_ICON_DIALOG":
      state = false;
      return state;
    default:
      return state;
  }
};

export default isVisibleIconDialogReducer;
