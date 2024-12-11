import { getAuth } from "firebase/auth";
import { userRef } from "../../../database/firebase/firebase"
import { ref, onValue, child, query, orderByChild, equalTo } from "firebase/database";

const defaultCategories = () => {
    const categories = [];
    let uid = 'none';
    if (getAuth().currentUser) {
        uid = getAuth().currentUser.uid;
    }
    const userCategoryRef = child(userRef, `${uid}/Category`);
    const categoryQuery = query(userCategoryRef, orderByChild('TypeID'), equalTo('002'));
    onValue(categoryQuery, (snapshot) => {
        snapshot.forEach(element => {
            categories.push({
                key: element.key,
                categoryName: element.toJSON().CategoryName,
                icon: element.toJSON().Icon,
                parentID: element.toJSON().ParentID,
                typeID: element.toJSON().TypeID,
                isDeleted: element.IsDeleted
            });
        });
    });
    return categories;
}

const renderedCategoriesReducer = (state = defaultCategories(), action) => {
    if (action.type === 'RELOAD_CATEGORY') {
        state = [];
        action.categories.forEach(element => {
            state.push({
                key: element.key,
                categoryName: element.categoryName,
                icon: element.icon,
                parentID: element.parentID,
                typeID: element.typeID,
                isDeleted: element.isDeleted
            });
        });
        //console.log("rr " + state[2].isDeleted);
        return state;
    }
    return state;
}

export default renderedCategoriesReducer;