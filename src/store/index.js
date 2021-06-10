import {applyMiddleware, combineReducers, createStore} from "redux";
import {PostMiddleware, LikeMiddleware, PostReducer, CommentMiddleware} from "./post";

const reducer = combineReducers({
    post: PostReducer
})

const middleware = [
    ...PostMiddleware,
    ...LikeMiddleware,
    ...CommentMiddleware
]

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;