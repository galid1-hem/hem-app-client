import urls from "./ServerUrls";
import axios from "axios";
import {tokenStorage} from "@app/utils/TokenStorage";

class PostApi {
    constructor(domain: String) {
        this.req = axios.create({
            baseURL: domain,
            headers: {
                "X-Auth-Token": tokenStorage.authToken
            }
        })
    }

    loadPost = (size = DEFAULT_FETCH_POST_SIZE, lastPostId = null) =>
        this.req.get(
            "/api/v1/posts",
            {
                params: {size: size, lastPostId: lastPostId}
            }
        );

    createPost = (body) =>
        this.req.post(
            "/api/v1/posts",
            {
                ...body
            }
        );

    deletePost = (postId) =>
        this.req.delete(
            `/api/v1/posts/${postId}`
        )

    createLike = (postId) =>
        this.req.post(
            `/api/v1/posts/${postId}/likes`
        );

    deleteLike = (postId, likeId) =>
        this.req.delete(
            `/api/v1/posts/${postId}/likes/${likeId}`
        );

    createComment = (postId, body) =>
        this.req.post(
            `/api/v1/posts/${postId}/comments`,
            {
                ...body
            }
        );

    loadComment = (postId, parentCommentId, size = DEFAULT_FETCH_COMMENT_SIZE, lastCommentId = null) => {
        let url = `/api/v1/posts/${postId}/comments/`;
        if (parentCommentId !== undefined) {
            url += parentCommentId
        }
        
        return this.req.get(
            url,
            {
                params: {size: size, lastCommentId: lastCommentId}
            }
        );
    }

}

const DEFAULT_FETCH_POST_SIZE = 20;
const DEFAULT_FETCH_COMMENT_SIZE = 20;

export const postApi = new PostApi(urls.postServer);