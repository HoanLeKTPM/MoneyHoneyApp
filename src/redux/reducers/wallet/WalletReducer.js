const {UPDATEWALLETLIST, DELETEWALLET } = require("../../actions/actionType");

const WalletReducer = (wallet = [], action) => {
    switch(action.type){
        case UPDATEWALLETLIST:
            try {
                let newWallet = [];
                
                if (!action.snap) return wallet;
                
                action.snap.forEach(element => {
                    const data = element.val();
                    if (!data) return;
                    
                    if (!data.isDeleted) {
                        newWallet.push({
                            key: element.key || '',
                            name: data.name || '',
                            color: data.color || '',
                            date: data.date || '',
                            isDefault: data.isDefault || false,
                            money: data.money || 0,
                            transactionList: data.transactionList || {},
                            isDeleted: false
                        });
                    }
                });

                return newWallet.sort((a, b) => {
                    if (a.isDefault === true) return -1;
                    if (b.isDefault === true) return 1;
                    return 0;
                });
                
            } catch (error) {
                console.error("Lỗi trong WalletReducer:", error);
                return wallet;
            }
        case DELETEWALLET:
            try {
                return wallet.map(w => {
                    if (w.key === action.walletId) {
                        return { ...w, isDeleted: true };
                    }
                    return w;
                }).filter(w => !w.isDeleted);
            } catch (error) {
                console.error("Lỗi khi xóa ví:", error);
                return wallet;
            }

        default:
            return wallet;
    }
}

export default WalletReducer;