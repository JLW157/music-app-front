export interface IUploadTrackDTO{
    track: File;
    image: File;
    title:string;
    genre: string;
}

export interface ISong{
    id: string;
    posterUrl: string;
    genre: string;
    artists: string[];
    name:string;
    audioUrl:string;
};
