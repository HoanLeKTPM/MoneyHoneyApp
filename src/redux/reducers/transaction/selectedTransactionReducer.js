
const selectedTransactionReducer = (value = "", action) => {
    switch(action.type){
        case "SELECT_TRANS":
            return action.value;
        default:
            return value;
    }
}

export default selectedTransactionReducer;