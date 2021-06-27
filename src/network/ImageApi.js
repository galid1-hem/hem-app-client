import axios from "axios";
import urls from "./ServerUrls";
import {tokenStorage} from "../utils/TokenStorage";

class ImageApi {
    constructor(domain: String) {
        this.req = axios.create({
            baseURL: domain,
            headers: {
                "X-Auth-Token": tokenStorage.authToken
            }
        })
    }

    uploadImage = (body) =>
        this.req.post(
            `/api/v1/images`,
            body,
            {
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
}

export const imageApi = new ImageApi(urls.imageServer)