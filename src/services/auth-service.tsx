import { IAuthenticatedUserResponse, IClaim } from "../models/auth.models";
import { IUserInfo } from "../store/features/authSlice";
import { ClaimConstants } from "../utils/constants/claims";

const tokenKey = "token";
const tokenExpirationKey = "token-expiration";

const setToken = (authData: IAuthenticatedUserResponse) => {
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(tokenExpirationKey, authData.expiration.toString());
};

const getToken = () => {
    return localStorage.getItem(tokenKey);
};

const getExpirtion = () => {
    return localStorage.getItem(tokenExpirationKey);
}


const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(tokenExpirationKey);
};


const getInfoFromJwt = (token: string | null): IUserInfo => {
    const userInfo: IUserInfo = {
        roles: [],
        email: '',
        username: ""
    };

    if (!token) {
        return userInfo;
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    console.log(dataToken);
    const response: IClaim[] = [];

    for (const property in dataToken) {
        if (property === ClaimConstants.EmailClaim()) {
            userInfo.email = dataToken[property];
        }

        if (property === ClaimConstants.RoleClaim()) {
            userInfo.roles.push({ role: dataToken[property] });
        }

        if (property === ClaimConstants.UsernameClaim()) {
            userInfo.username = dataToken[property]
        };
    }

    return userInfo;
};



const handleExpiration = (token: string | null, expiration: string | null): boolean => {
    if (token && expiration) {
        const expirationDate = new Date(expiration!);
        if (expirationDate <= new Date()) {

            return true; // that`s means token expired
        }

        return false;
    }
    return false;
}




const authService = {
    setToken,
    getToken,
    logout,
    getInfoFromJwt,
    handleExpiration,
    getExpirtion,
};

export default authService;