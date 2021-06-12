class TokenStorage {
    authToken = ""

    setToken = (token: String) => {
        this.authToken = token
    }
}

export const tokenStorage = new TokenStorage();