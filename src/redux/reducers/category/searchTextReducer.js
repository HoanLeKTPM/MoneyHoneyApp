const searchTextReducer = (state = "", action) => {
  switch(action.type) {
      case 'CHANGE_SEARCH_TEXT':
          return action.text;
      case 'CLEAR_SEARCH_TEXT':
          state = "";
          return state;
      default:
          return state;
  }
}

export default searchTextReducer;