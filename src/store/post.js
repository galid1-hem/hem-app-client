import {DEFAULT_FETCH_COMMENT_SIZE, DEFAULT_FETCH_POST_SIZE} from "../const/FetchSize";
import {postApi} from "../assets/network/PostApi";

const initialState = {
    postIds: [],
    posts: {}, // postId: Post
    comments: {}, // postId: Comments
    subComments: {}
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
        case DELETE_POST:
            return {
                ...state,
                postIds: action.payload.postIds,
                posts: action.payload.posts
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
        case LOAD_SUB_COMMENT:
            return {
                ...state,
                subComments: {...action.payload.subComments}
            }
        case CREATE_COMMENT:
            const posts = {
                ...state.posts,
            }
            posts[action.postId].postCounter.commentCount += 1;

            return {
                ...state,
                ...posts,
                ...action.payload.comments
            };
        default:
            return state;
    }
}

const UPLOAD_POST = "[Post] Calling /posts to upload post";
const DELETE_POST = "[Post] Calling /posts/{postId} to delete post";
const LOAD_POST = "[Post] Calling /posts to load paginated posts";
const DO_LIKE = "[Like] Calling /posts/{postId}/likes to create or delete like";
const LOAD_COMMENT = "[Comment] Calling /posts/{postId}/comments to load comments of a post";
const LOAD_SUB_COMMENT = "[Comment] Calling /posts/{postId}/comments/{commentId} to load sub comments of comments of a post";
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

    postApi.createPost(action.requestBody)
        .then(response => response.data.data)
        .then(createdPost => {
            action.payload = {
                post: createdPost
            };

            return next(action);
        })
        .catch(error => {
            alert(error.message + "(으)로 인해 업로드에 실패했습니다.");
        });
}

// ======== delete post
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId: postId
    }
}

const deletePostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== DELETE_POST) return next(action);

    postApi.deletePost(action.postId)
        .then(response => {
            const posts = getState().post.posts;
            const postIds = getState().post.postIds;

            // remove Id
            const index = postIds.indexOf(action.postId);
            if (index !== -1) {
                postIds.splice(index, 1);
            }
            ;
            // remove post
            delete posts[action.postId];

            action.payload = {
                posts: posts,
                postIds: postIds
            }

            return next(action);

        })
        .catch(error => {
            alert("error occur when delete post : ", error);
        })
}

// ======== load post
export const loadNextBatchOfPosts = (size = DEFAULT_FETCH_POST_SIZE) => {
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

    postApi.loadPost(action.size, action.lastPostId)
        .then(response => response.data.data)
        .then(loadedPosts => {
            // TODO add process when server has no posts
            const postIds = loadedPosts.map(post => post.postId);
            const posts = {};
            loadedPosts.forEach(post => {
                posts[post.postId] = post
            })

            action.payload = {};
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

    const postViewerLike = getState().post.posts[action.postId]?.viewerLike;

    if (postViewerLike == null) {
        postApi.createLike(action.postId)
            .then(response => response.data.data)
            .then(viewerLike => {
                action.payload = {};
                const posts = getState().post.posts;
                posts[action.postId].viewerLike = viewerLike;
                posts[action.postId].postCounter.likeCount += 1;
                action.payload.posts = posts;

                return next(action);
            })
            .catch(error => {
                alert("error occur when do like : ", error);
            })
    } else {
        postApi.deleteLike(action.postId, postViewerLike.likeId)
            .then(response => {
                action.payload = {};
                const posts = getState().post.posts;
                posts[action.postId].viewerLike = null;
                posts[action.postId].postCounter.likeCount -= 1;

                return next(action);
            })
            .catch(error => {
                alert("error occur when do like : ", error);
            })
    }
}

// ======= load Comment
const addPaginationToLoadCommentsMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_COMMENT && action.type !== LOAD_SUB_COMMENT) return next(action);

    const commentIds = getState().post.comments ? [action.postId]?.commentIds : [];
    if (commentIds === undefined || commentIds.length === 0) {
        return next(action);
    }

    action.lastCommentId = commentIds[commentIds.length - 1];
    return next(action);
}

export const loadNextBatchOfComments = (postId, size = DEFAULT_FETCH_COMMENT_SIZE) => {
    return {
        type: LOAD_COMMENT,
        postId: postId,
        size: size
    }
}

const loadCommentsMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_COMMENT) return next(action);

    postApi.loadComment(action.postId, undefined, action.size, action.lastCommentId)
        .then(response => response.data.data)
        .then(loadedComments => {
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

            action.payload = {
                comments: allComments
            };

            return next(action);
        })
        .catch(error => alert("error occur when loading comments! : " + error));
}

export const loadNextBatchOfSubComments = (postId, parentCommentId, size = DEFAULT_FETCH_COMMENT_SIZE) => {
    return {
        type: LOAD_SUB_COMMENT,
        postId: postId,
        parentCommentId: parentCommentId,
        size: size
    }
}

const loadSubCommentMiddleware = ({dispatch, getState}) => (next) => (action) => {
    if (action.type !== LOAD_SUB_COMMENT) return next(action);

    postApi.loadComment(action.postId, action.parentCommentId, action.size, action.lastCommentId)
        .then(response => response.data.data)
        .then(loadedComments => {
            const loadedSubCommentIds = loadedComments.map(comment => comment.commentId);
            const loadedSubCommentIdToCommentMap = {};
            loadedComments.forEach(comment => loadedSubCommentIdToCommentMap[comment.commentId] = comment)

            const subComments = getState().post.subComments;
            subComments[action.parentCommentId] = {
                comments: {},
                commentIds: []
            };

            subComments[action.parentCommentId].comments = {
                ...subComments[action.parentCommentId].comments,
                ...loadedSubCommentIdToCommentMap
            }

            subComments[action.parentCommentId].commentIds = [
                ...subComments[action.parentCommentId].commentIds,
                ...loadedSubCommentIds
            ]

            action.payload = {
                subComments: subComments
            };

            return next(action);
        })
        .catch(error => alert("error occur when load sub comments : ", error));
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

    postApi.createComment(action.postId, action.requestBody)
        .then(response => response.data.data)
        .then(createdComment => {
            action.payload = {};

            const parentCommentId = action.requestBody.parentCommentId;
            const comments = getState().post.comments;

            if (parentCommentId === undefined) {
                comments[action.postId] = {
                    comments: {
                        ...comments[action.postId].comments,
                        [createdComment.commentId]: createdComment
                    },
                    commentIds: [
                        ...comments[action.postId].commentIds,
                        createdComment.commentId
                    ]
                };
            }
            // create sub Comment
            else {
                comments[action.postId].comments[parentCommentId].subCommentCount += 1;
            }

            action.payload.comments = comments;

            return next(action);
        })
        .catch(error => {
            alert(error.message + "(으)로 인해 댓글 작성에 실패했습니다.");
        });
}

export const PostMiddleware = [
    uploadPostMiddleware,
    deletePostMiddleware,
    addPaginationToLoadPostsMiddleware,
    loadPostMiddleware,
]

export const LikeMiddleware = [
    likeMiddleware
]

export const CommentMiddleware = [
    addPaginationToLoadCommentsMiddleware,
    loadSubCommentMiddleware,
    loadCommentsMiddleware,
    createCommentMiddleware,
]