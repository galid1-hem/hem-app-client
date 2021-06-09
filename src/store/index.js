import {applyMiddleware, combineReducers, createStore} from "redux";
import {PostMiddleware, LikeMiddleware, PostReducer} from "./post";

const reducer = combineReducers({
    post: PostReducer
})

const middleware = [
    ...PostMiddleware,
    ...LikeMiddleware
]

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;