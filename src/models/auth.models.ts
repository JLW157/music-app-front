export interface IRegisterRequest{
    Username: string;
    Email:string;
    Password:string;
};

export interface ILoginRequest{
    Email:string;
    Password:string;
};

export interface IGoogleRequest{
    IdToken: string | undefined;
};

export interface IAuthenticatedUserResponse{
    token: string;
    expiration: Date;
};

export interface IUser{
    roles: IRole[];
    email: string;
    userName: string;
};

export interface IClaim{
    name: string;
    value: string;
}

export interface claim{
    name: string;
    value: string;
};

export interface userCredentionals{
    email:string;
    password: string;
};

export interface registerCredentionals{
    email:string;
    username:string;
    password: string;
};

export interface authenticationResponse{
    token: string;
    expiration: Date;
}

export interface userDTO{
    id: string;
    email:string;
};

export interface IRole{
    role: "Admin" | "User" | "Artist";
};