import urls from "../assets/network/ServerUrls";

const object1 = {
    postList: [
        {
            postId: "",
            userId: "",
            regionId: "",
            title: "",
            contents: [
                {
                    value: "",
                    type: "TEXT"
                }
            ],
            mediaIds: [
                {
                    id: "",
                    type: "PHOTO"
                }
            ],
            postCounter: {
                likeCount: 0,
                commentCount: 0,
                bookmarkCount: 0,
                viewCount: 0,
            },
            viewerLike: {
                likeId: "",
                postId: "",
                actor: {
                    actorId: "",
                    profileImageUrl: "",
                    relationType: "ME"
                }
            },
            visible: "true",
            createdAt: "",
            updatedAt: "",
            deletedAt: ""
        }
    ]
}

const initialState = {
    postIds: [],
    posts: {}
}

export const PostReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}


const LOAD_POST = "[Post] Calling /posts to load paginated posts";

export const loadNextBatchOfPosts = (size = 20) => {
    console.log("creating an action")
    return {
        type: LOAD_POST,
        size: size
    }
}

const addPaginationToLoadPostsMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log("md1")
    if (action.type !== LOAD_POST) return next(action);

    const postIds = getState().post.postIds;
    if (postIds.length === 0) {
        return next(action);
    }
    action.lastPostId = postIds[postIds.length - 1];
    return next(action);
}

const loadPostMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log("md2")
    if (action.type !== LOAD_POST) return next(action);


    let requestInfo = urls.postServer + "?size=" + action.size + "&";
    if (action.lastPostId != undefined) {
        requestInfo += "lastPostId=" + action.lastPostId + "&";
    }

    fetch(requestInfo)
        .then(response => response.json())
        .then(responseJson => {
            action.payload = {};

            // TODO when server has no posts
            const postIds = responseJson.data.map(post => post.postId);
            const posts = {};
            responseJson.data.forEach(post => {
                posts[post.postId] = post
            })
            action.payload.postIds = postIds;
            action.payload.posts = posts;

            console.log("good")
            return next(action);
        })
        .catch(error => {
            alert(error);
        });
}

export const PostMiddleware = [
    addPaginationToLoadPostsMiddleware,
    loadPostMiddleware,
]


