export interface IUploadTrackDTO{
    track: File;
    image: File;
    title:string;
    genre: string;
}

export interface ISong{
    id: string | undefined;
    posterUrl: string;
    genre: string;
    artists: string[];
    name:string;
    audioUrl:string;
};
