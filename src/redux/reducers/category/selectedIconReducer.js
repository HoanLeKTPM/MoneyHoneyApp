const defaultState = {
  addIndex: 9,
  editIndex: 9,
  subIndex: 9,
  selectedIndex: 9
}
const selectedIconReducer = (state = defaultState, action) => {
  switch(action.type) {
      case 'SELECT_ICON':
          state = {
              ...state,
              selectedIndex: action.selectedIndex,
          }
          return state;
      case 'ADDING_ICON':
          state = {
              ...state,
              addIndex: action.addIndex,
          }
          return state;
      case 'EDITING_ICON':
          state = {
              ...state,
              editIndex: action.editIndex,
          }
          return state;
      case 'SUB_ICON':
          state = {
              ...state,
              subIndex: action.subIndex,
          }
          return state;
      default:
          return state;
  }
}

export default selectedIconReducer;