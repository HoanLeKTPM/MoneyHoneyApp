import { RESET_SUBCATEGORIES } from '../../actions/actionType';

const initialState = [];

export default function subCategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_SUB':
      return Array.isArray(action.subCategories) ? action.subCategories : state;
    case 'UPDATE_SUB':
      return action.subCategory ? [...state, action.subCategory] : state;
    case 'BACK_BEFORE_EDITING':
      return Array.isArray(action.subCategories) ? action.subCategories : state;
    case RESET_SUBCATEGORIES:
      return [];
    default:
      return state;
  }
}

