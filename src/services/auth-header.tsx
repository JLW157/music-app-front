import { IAuthenticatedUserResponse } from "../models/auth.models";

export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("user")!) as IAuthenticatedUserResponse;

    if (user && user.token) {
        return {Authorization: `Bearer ${user.token}`};
    }
    else{
        return {};
    }

}