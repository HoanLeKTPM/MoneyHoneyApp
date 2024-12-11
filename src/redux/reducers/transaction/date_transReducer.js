const {CHANGEDATE_TRANS} = require("../../actions/actionType");

const date_transReducer = (state = new Date(), action) => {
    if(action.type === CHANGEDATE_TRANS) {
        state = action.date;
        return state;
    }
    return state;
}

export default date_transReducer;