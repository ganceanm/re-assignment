import { createStore } from 'redux';
import rootReducer from "./rootReducer";

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //TODO: remove
export default store;