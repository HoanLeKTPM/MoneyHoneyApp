const editableButtonGroupReducer = (state=[], action) => {
  switch(action.type) {
      case 'SHOW_TYPE':
          // this array show which button is disabled in button group 
          state=[0, 1, 2];
          // remove button which represent selectedType to enable
          state.splice(action.selectedType, 1);
          return state;
      case 'EDIT_TYPE':
          // enable all buttons to select type
          state = [];
          return state;
      default: 
          return state;
  }
}

export default editableButtonGroupReducer;