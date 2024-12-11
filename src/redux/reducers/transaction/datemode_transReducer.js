const {CHANGEDATEMODE_TRANS} = require("../../actions/actionType");

const datemode_transReducer = (state = "Today", action) => {
    if(action.type === CHANGEDATEMODE_TRANS) {
        state = action.datemode;
        return state;
    }
    return state;
}

export default datemode_transReducer;