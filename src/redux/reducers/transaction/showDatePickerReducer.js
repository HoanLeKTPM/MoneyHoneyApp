const {SETSHOWDATEPICKER} = require("../../actions/actionType");

const showDatePickerReducer = (state = false, action) => {
    if(action.type === SETSHOWDATEPICKER) {
        state = action.bool;
        return state;
    }
    return state;
}

export default showDatePickerReducer;