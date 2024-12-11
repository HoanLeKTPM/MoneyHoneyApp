const categoryNameReducer = (state = "", action) => {
  switch(action.type) {
      case 'CHANGE_NAME':
          return action.text;
      default:
          return state;
  }
}

export default categoryNameReducer;