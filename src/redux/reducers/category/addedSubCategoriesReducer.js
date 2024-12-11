const addedSubCategoriesReducer = (state = [], action) => {
  switch(action.type) {
      case 'ADD_SUB':
          state.push(action.subCategory);
          return state;
      case 'RELOAD':
          state = [];
          return state;
      default:
          return state;
  }
}

export default addedSubCategoriesReducer;