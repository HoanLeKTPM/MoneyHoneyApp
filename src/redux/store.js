// redux
import { createStore, applyMiddleware } from "redux";

// reducers
import allReducers from "./reducers/allReducers";

const storeApp = createStore(
    allReducers,
    // Thêm middleware nếu cần
);

export default storeApp;