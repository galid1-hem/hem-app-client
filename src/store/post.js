import urls from "../assets/network/ServerUrls";

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
    posts: {}
}

export const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_POST:
            return {
                ...state,
                postIds: [
                    ...state.postIds,
                    ...action.payload.postId
                ],
                posts: {
                    ...state.posts,
                    ...action.payload.posts
                }
            }
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
        default:
            return state;
    }
}

const UPLOAD_POST = "[Post] Calling /posts to upload post";
const LOAD_POST = "[Post] Calling /posts to load paginated posts";
const DO_LIKE = "[Like] Calling /posts/{postId}/likes to create or delete like"


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
            const posts = getState().post.posts;
            posts[createdPost.postId] = createdPost;

            action.payload = {};
            action.payload.postId = createdPost.postId;
            action.payload.posts = posts;

            return next(action);
        })
        .catch(error => {
            alert(error.message + "(으)로 인해 업로드에 실패했습니다.");
        })
}

// ======== load post
export const loadNextBatchOfPosts = (size = 20) => {
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

    const postViewerLike = getState().post.posts[action.postId].viewerLike;

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
            console.log("error !: ", error)
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