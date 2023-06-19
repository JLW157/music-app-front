import { ISong } from "./track-models";

export interface ISetCreateResponse {
    isSuccess: boolean;
    message?: string;
    set: ISetDTO
};

export interface ISetDTO {
    id: string;
    name: string;
    posterUrl: string;
    createdDate: Date;
    user: string;
    audios: Array<ISong>
};