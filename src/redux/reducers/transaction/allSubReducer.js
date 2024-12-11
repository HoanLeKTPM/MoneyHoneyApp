const { UPDATESUBCATEGORY } = require("../../actions/actionType");
import { getAuth } from "firebase/auth";
import { userRef } from "@/src/database/firebase/firebase";
import { child, onValue } from "firebase/database";

const allSubReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATESUBCATEGORY:
            state = [];
            let uid = 'none';
            if (getAuth().currentUser) {
                uid = getAuth().currentUser.uid;
            }
            const userCategoryRef = child(userRef, `${uid}/Category/${action.category.key}/SubCategories/`);
            onValue(userCategoryRef, (snap) => {
                snap.forEach(element => {
                    state.push({
                        key: element.key,
                        categoryName: element.toJSON().CategoryName,
                        icon: element.toJSON().Icon,
                    })
                })
            });
            return state;
        default:
            return state;
    }
}

export default allSubReducer;