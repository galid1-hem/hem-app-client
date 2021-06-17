import urls from "./ServerUrls";
import axios from "axios";
import {tokenStorage} from "../utils/TokenStorage";

class PushApi {
    constructor(domain: String) {
        this.req = axios.create({
           baseURL: domain,
           headers: {
               "X-Auth-Token": tokenStorage.authToken
           }
        });
    }

    registerPushToken = (userId, deviceId, pushToken, os) => {
        this.req.post(
            "/api/v1/push/tokens",
            {
                user_id: userId,
                device_id: deviceId,
                push_token: pushToken,
                os: os
            }
        )
    }
}

export const pushApi = new PushApi(urls.pushServer);