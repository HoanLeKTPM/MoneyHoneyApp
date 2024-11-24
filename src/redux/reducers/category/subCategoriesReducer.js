const subCategoriesReducer = (state = [], action) => {
  switch(action.type) {
      case 'GET_SUB':
          return action.subCategories;
      case 'UPDATE_SUB':
          state.push(action.subCategory);
          return state;
      case 'BACK_BEFORE_EDITING':
          return action.subCategories;
      default: 
          return state;
  }
}

export default subCategoriesReducer;