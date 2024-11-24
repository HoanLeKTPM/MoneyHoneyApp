// redux
import { createStore } from "redux";

// reducers
import allReducers from "./reducers/allReducers";

const configureStore = createStore(allReducers)
export default configureStore