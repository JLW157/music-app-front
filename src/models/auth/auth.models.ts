export interface ILoginRequest{
    Username: string;
    Password: string;
};

export interface IRegisterRequest{
    Username:string;
    Email: string;
    Password: string;
}

export interface IGoogleAuthRequest{
    IdToken: string;
}

export interface IAuthResponse{
    Token: string;
    Expiration: Date;
};