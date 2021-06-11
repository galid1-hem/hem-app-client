import urls from "../assets/network/ServerUrls";
import {DEFAULT_FECTH_POST_SIZE, DEFAULT_FETCH_COMMENT_SIZE} from "../const/FetchSize";

// const object1 = {
//     postList: [
//         {
//             postId: "",
//             userId: "",
//             regionId: "",
//             title: "",
//             contents: [
//                 {
//                     value: "",
//                     type: "TEXT"
//                 }
//             ],
//             mediaIds: [
//                 {
//                     id: "",
//                     type: "PHOTO"
//                 }
//             ],
//             postCounter: {
//                 likeCount: 0,
//                 commentCount: 0,
//                 bookmarkCount: 0,
//                 viewCount: 0,
//             },
//             viewerLike: {
//                 likeId: "",
//                 postId: "",
//                 actor: {
//                     actorId: "",
//                     profileImageUrl: "",
//                     relationType: "ME"
//                 }
//             },
//             visible: "true",
//             createdAt: "",
//             updatedAt: "",
//             deletedAt: ""
//         }
//     ]
// }

const initialState = {
    postIds: [],
    posts: {}, // postId: Post
    comments: {} // postId: Comments
};

export const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_POST:
            return {
                ...state,
                postIds: [
                    action.payload.post.postId,
                    ...state.postIds,
                ],
                posts: {
                    [action.payload.post.postId]: action.payload.post,
                    ...state.posts
                }
            };
        case LOAD_POST:
            return {
                ...state,
                postIds: [
                    ...state.postIds,
                    ...action.payload.postIds
                ],
                posts: {
                    ...state.posts,
                    ...action.payload.posts
                }

            }
        case DO_LIKE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                }
            }
        case LOAD_COMMENT:
            return {
                ...state,
                comments: {
                    ...action.payload.comments
                }
            };
        case CREATE_COMMENT:
            const posts = {
                ...state.posts,
            }
            posts[action.postId].postCounter.commentCount += 1;
            return {
                ...state,
                ...posts,
                comments: {
                    ...state.comments,
                    [action.postId]: {
                        comments: {
                            ...state.comments[action.postId].comments,
                            [action.payload.comment.commentId]: action.payload.comment
                        },
                        commentIds: [
                            ...state.comments[action.postId].commentIds,
                            action.payload.comment.commentId
                        ]
                    }
                }
            };
        default:
            return state;
    }
}

const UPLOAD_POST = "[Post] Calling /posts to upload post";
const LOAD_POST = "[Post] Calling /posts to load paginated posts";
const DO_LIKE = "[Like] Calling /posts/{postId}/likes to create or delete like";
const LOAD_COMMENT = "[Comment] Calling /posts/{postId}/comments to load comments of a post";
const CREATE_COMMENT = "[Comment] Calling /posts/{postId}/comments to create comment";

// ======== upload post
export const uploadPost = (requestBody) => {
    return {
        type: UPLOAD_POST,
        requestBody: requestBody
    }
}

const uploadPostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== UPLOAD_POST) return next(action);

    const requestInfo = urls.postServer;
    fetch(requestInfo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(action.requestBody)
    })
        .then(response => response.json())
        .then(responseJson => {
            const createdPost = responseJson.data;

            action.payload = {};
            action.payload.post = createdPost;

            return next(action);
        })
        .catch(error => {
            alert(error.message + "(으)로 인해 업로드에 실패했습니다.");
        })
}

// ======== load post
export const loadNextBatchOfPosts = (size = DEFAULT_FECTH_POST_SIZE) => {
    return {
        type: LOAD_POST,
        size: size
    }
}

const addPaginationToLoadPostsMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_POST) return next(action);

    const postIds = getState().post.postIds;
    if (postIds.length === 0) {
        return next(action);
    }
    action.lastPostId = postIds[postIds.length - 1];
    return next(action);
}

const loadPostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_POST) return next(action);

    let requestInfo = urls.postServer + "?size=" + action.size + "&";
    if (action.lastPostId != undefined) {
        requestInfo += "lastPostId=" + action.lastPostId + "&";
    }

    fetch(requestInfo)
        .then(response => response.json())
        .then(responseJson => {
            action.payload = {};

            // TODO add process when server has no posts
            const postIds = responseJson.data.map(post => post.postId);
            const posts = {};
            responseJson.data.forEach(post => {
                posts[post.postId] = post
            })
            action.payload.postIds = postIds;
            action.payload.posts = posts;

            return next(action);
        })
        .catch(error => {
            alert(error);
        });
}

// ======== do like
export const doLike = (postId) => {
    return {
        type: DO_LIKE,
        postId: postId
    }
}

const likeMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== DO_LIKE) return next(action);

    let httpMethod = {method: "POST"};
    let requestInfo = urls.postServer + "/" + action.postId + "/likes";

    const postViewerLike = getState().post.posts ? [action.postId]?.viewerLike : {};
    console.log("postVIewerlike : ", postViewerLike);

    if (postViewerLike != null) {
        httpMethod.method = "DELETE";
        requestInfo += "/" + postViewerLike.likeId;
    }

    fetch(requestInfo, httpMethod)
        .then(response => response.json())
        .then(responseJson => {
            action.payload = {};
            const posts = getState().post.posts;
            const viewerLike = responseJson.data;

            // createLike
            if (viewerLike != null) {
                posts[action.postId].viewerLike = viewerLike;
                posts[action.postId].postCounter.likeCount += 1;
            }
            // deleteLike
            else {
                posts[action.postId].viewerLike = null;
                posts[action.postId].postCounter.likeCount -= 1;
            }

            action.payload.posts = posts;
            return next(action);
        })
        .catch(error => {
            alert("error occur when do like : ", error);
        })

}

// ======= load Comment
export const loadNextBatchOfComments = (postId, size = DEFAULT_FETCH_COMMENT_SIZE) => {
    return {
        type: LOAD_COMMENT,
        postId: postId,
        size: size
    }
}

const addPaginationToLoadCommentsMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_COMMENT) return next(action);

    const commentIds = getState().post.comments ? [action.postId]?.commentIds : [];
    if (commentIds === undefined || commentIds.length === 0) {
        return next(action);
    }

    action.lastCommentId = commentIds[commentIds.length - 1];
    return next(action);
}

const loadCommentsMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_COMMENT) return next(action);

    let requestInfo = urls.postServer + "/" + action.postId + "/comments?size=" + action.size + "&";
    if (action.lastCommentId !== undefined) {
        requestInfo += "lastCommentId=" + action.lastCommentId + "&";
    }

    fetch(requestInfo)
        .then(response => response.json())
        .then(responseJson => {
            const loadedComments = responseJson.data;
            const loadedCommentIds = loadedComments.map(comment => comment.commentId);
            const loadedCommentIdToCommentMap = {};
            loadedComments.forEach(comment => loadedCommentIdToCommentMap[comment.commentId] = comment);

            const allComments = getState().post.comments;
            let postComments = allComments[action.postId]?.comment;
            let postCommentIds = allComments[action.postId]?.commentIds;
            if (postComments === undefined) {
                postComments = {};
                postCommentIds = [];
            }

            allComments[action.postId] = {
                comments: {
                    ...postComments,
                    ...loadedCommentIdToCommentMap
                },
                commentIds: [
                    ...postCommentIds,
                    ...loadedCommentIds
                ]
            };

            action.payload = {};
            action.payload.comments = allComments;

            return next(action);
        })
        .catch(error => alert("error occur when loading comments! : " + error));
}

// ===== CREATE COMMENT
export const createComment = (postId, requestBody) => {
    return {
        type: CREATE_COMMENT,
        postId: postId,
        requestBody: requestBody
    }
}

const createCommentMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== CREATE_COMMENT) return next(action);

    const requestInfo = urls.postServer + "/" + action.postId + "/comments";
    fetch(requestInfo, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(action.requestBody)
    })
        .then(response => response.json())
        .then(responseJson => {
            const createdComment = responseJson.data;

            action.payload = {};
            action.payload.comment = createdComment;

            return next(action);
        })
        .catch(error => {
            alert(error.message + "(으)로 인해 댓글 작성에 실패했습니다.");
        })
}


export const PostMiddleware = [
    uploadPostMiddleware,
    addPaginationToLoadPostsMiddleware,
    loadPostMiddleware,
]

export const LikeMiddleware = [
    likeMiddleware
]

export const CommentMiddleware = [
    addPaginationToLoadCommentsMiddleware,
    loadCommentsMiddleware,
    createCommentMiddleware
]