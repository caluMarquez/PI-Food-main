import rootReducer from "../reducer/reducer.js";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;


const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;