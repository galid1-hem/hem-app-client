import {applyMiddleware, combineReducers, createStore} from "redux";
import {PostMiddleware, PostReducer} from "./post";

const reducer = combineReducers({
    post: PostReducer
})

const middleware = [
    ...PostMiddleware
]

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;