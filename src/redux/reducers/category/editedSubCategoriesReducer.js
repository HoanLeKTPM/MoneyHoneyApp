const editedSubCategoriesReducer = (state = [], action) => {
  switch(action.type) {
      case 'EDIT_SUB':
          state.push(action.subCategory);
          return state;
      case 'RELOAD_EDIT':
          state = [];
          return state;
      default:
          return state;
  }
}

export default editedSubCategoriesReducer;