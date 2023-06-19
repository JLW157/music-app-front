interface IAudioSetRequest {
    audioId: string;
    setId: string;
}

export interface IAddAudioToSetRequest extends IAudioSetRequest {

};


export interface IRemoveAudioFromSetRequest extends IAudioSetRequest {

};