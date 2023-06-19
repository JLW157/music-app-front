import axios from "axios";
import { IAddAudioToSetRequest, IRemoveAudioFromSetRequest } from "../models/Requests/sets-requests.models";
import { addAudioToSetUrl, removeAudioFromSetUrl } from "../utils/endpoints";
import { ISong } from "../models/track-models";

export const addAudioToSet = async (addAudioToSetRequest: IAddAudioToSetRequest) => {
    return await axios.post<ISong>(addAudioToSetUrl, addAudioToSetRequest);
};

export const removeAudioFromSet = async (removeAudioFromSetRequest: IRemoveAudioFromSetRequest) => {
    return await axios.delete<ISong>(removeAudioFromSetUrl, {
        data: removeAudioFromSetRequest
    });
};
