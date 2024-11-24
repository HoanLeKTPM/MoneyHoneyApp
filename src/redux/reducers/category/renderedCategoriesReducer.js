import { firebase, userRef } from '../../../database'; 

const defaultCategories = () => {
    const categories = [];
    let uid = 'none';
    if(firebase.auth().currentUser) {
        uid = firebase.auth().currentUser.uid;
    }
    const userCategoryRef = userRef.child(uid).child('Category')
    userCategoryRef.orderByChild('TypeID').equalTo('002').on('value', (snapshot) => {
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
        //console.log("rer " + categories[2].isDeleted);
    });
    return categories;
}

const renderedCategoriesReducer = (state = defaultCategories(), action) => {
    if(action.type === 'RELOAD_CATEGORY') {
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