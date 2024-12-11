const {CHANGESODU_TRANS} = require("../../actions/actionType");

const sodu_transReducer = (state = "", action) => {
    if(action.type === CHANGESODU_TRANS) {
        state = action.sodu;
        return state;
    }
    return state;
}

export default sodu_transReducer;