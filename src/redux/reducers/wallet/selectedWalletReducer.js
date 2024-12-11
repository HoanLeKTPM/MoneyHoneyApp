const {SELECTWALLET } = require("../../actions/actionType");

const initialState = {
  key: "",
  name: "",
  color: "",
  date: "",
  isDefault: false,
  money: 0,
  transactionList: {}
};

const selectedWalletReducer = (wallet = initialState, action) => {
    switch(action.type){
        case SELECTWALLET:
            if (!action.value) return wallet;
            
            const element = action.value;
            return {
                key: element.key || "",
                name: element.name || "",
                color: element.color || "",
                date: element.date || "",
                isDefault: element.isDefault || false,
                money: element.money || 0,
                transactionList: element.transactionList || {},
            }
        default:
            return wallet;
    }
}

export default selectedWalletReducer;