const {UPDATESUBCATEGORY } = require("../../actions/actionType");
//import {userCategoryRef} from "../../../components/DataConnect"
import {rootRef} from "../../../components/DataConnect"
//firebase
import * as firebase from "firebase";

const allSubReducer = (state = [], action) => {
    switch(action.type){
        case UPDATESUBCATEGORY:
            state = [];
            let uid = 'none';
            if(firebase.auth().currentUser) {
                uid = firebase.auth().currentUser.uid;
            }
            const userRef = rootRef.child('users');
            const userCategoryRef = userRef.child(uid).child('Category/');
            userCategoryRef.child(action.category.key + "/SubCategories/").on('value',(snap) => {
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