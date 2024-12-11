const isVisibleReducer = (state=false, action) => {
  switch(action.type){
      case 'OPEN_DIALOG':
          state = true;
          return state;
      case 'CLOSE_DIALOG':
          state = false;
          return state;
      default:
          return state;
  }
}

export default isVisibleReducer;