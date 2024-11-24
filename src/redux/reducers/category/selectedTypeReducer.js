const selectedTypeReducer = (state = 1, action) => {
  if(action.type === 'CHANGE_TYPE') {
      return action.selectedType
  }
  return state;
}

export default selectedTypeReducer;