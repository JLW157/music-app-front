const baseUrlLocal: string = "https://localhost:7143";
const baseUrl: string = "https://localhost:7143";

export const popularAudioUrl = `${baseUrl}/api/audio/popular`;
export const audiosUrl = `${baseUrl}/api/audio`;
export const audiosUploadUrl = `${baseUrl}/api/audio/upload`;
export const getUserAudiosUrl = `${baseUrl}/api/audio/userAudios`;
export const loginUrl = `${baseUrl}/api/account/login`;
export const registerUrl = `${baseUrl}/api/account/register`;
export const googleUrl = `${baseUrl}/api/account/google`;

export const genresAllUrl = `${baseUrl}/api/genres`;


// get
export const confirmEmailUrl = `${baseUrl}/api/account/ConfirmEmail`;

// post
export const verifyEmailAgainUrl = `${baseUrl}/api/account/VerifyEmail`;

// search
export const searchAllAudiosEndpoint = `${baseUrl}/api/search/audios`;