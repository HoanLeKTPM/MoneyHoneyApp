const {SELECTWALLET } = require("../../actions/actionType");

const selectedWalletReducer = (wallet = "", action) => {
    switch(action.type){
        case SELECTWALLET:
            var element = action.value;
            wallet = 
            {
                key: element.key,
                name: element.name,
                color: element.color,
                date: element.date,
                isDefault:element.isDefault,
                money: element.money,
                transactionList: element.transactionList,
            }
            return wallet;
        default:
            return wallet;
    }
}

export default selectedWalletReducer;