import { IUser } from "./auth.models";

export interface IUploadTrackDTO {
    track: File;
    image: File;
    title: string;
    genre: string;
}

export interface ISong {
    id: string | undefined;
    posterUrl: string;
    genre: string;
    artists: string[];
    name: string;
    audioUrl: string;
    playedCount: number
};

export const ItemType = {
    "Artist": 0,
    "Audio": 1
};

export interface IAudioSearchResponse extends ISong {
    itemRelativeUrl: string;
    itemAbsoluteUrl: string;
};

export interface IUserSearchResponse {
    id: string;
    username: string;
    userImageUrl: string;
    profileRelativeUrl: string;
    profileAbsoluteUrl: string;
}

export interface ISearchGetMainSearchResultItem {
    score: number;
    itemType: number;
    audioItem?: IAudioSearchResponse;
    userItem?: IUserSearchResponse;
}

export interface ISearchItem {
    id: string;
    imageUrl: string;
    name: string;
    itemRelativeUrl: string;
    itemAbsoluteUrl: string;
    itemType: number;
    score: number;
}