import { SemanticClassificationFormat } from "typescript";
import { IAuthenticatedUserResponse, IClaim } from "../models/auth.models";
import { setIsLoggedIn } from "../store/features/authSlice";
import { useAppDispatch } from "../store/store";

const tokenKey = "token";
const tokenExpirationKey = "token-expiration";

const setToken = (authData: IAuthenticatedUserResponse) => {
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(tokenExpirationKey, authData.expiration.toString());
};

const getToken = () => {
    return localStorage.getItem("token");
};


const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(tokenExpirationKey);
};


const getInfoFromJwt = () => {
    const token = localStorage.getItem(tokenKey);
    
    if (!token) {
        return [];
    }
    
    const expiration = localStorage.getItem(tokenExpirationKey);

    const expirationDate = new Date(expiration!);

    if (expirationDate <= new Date()) {
        
        return []; // that`s means token expired
    }

    const dataToken = JSON.parse(atob(token.split(".")[1]));
    const response: IClaim[] = [];

    for (const property in dataToken) {
        response.push({name: property, value: dataToken[property]});
    }

    console.log("Claims", response);

    return response;
};

const authService = {
    setToken,
    getToken,
    logout,
    getInfoFromJwt,
};

export default authService;