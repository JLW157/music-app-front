// const baseUrlLocal: string = "https://localhost:7143";
const baseUrl: string = "https://music-app-api.azurewebsites.net";

export const popularAudioUrl = `${baseUrl}/api/audio/popular`;
export const audiosUrl = `${baseUrl}/api/audio`;
export const audiosUploadUrl = `${baseUrl}/api/audio/upload`;
export const getUserAudiosUrl = `${baseUrl}/api/audio/userAudios`;
export const getUserAudisByUsernameUrl = `${baseUrl}/api/audio/userAudiosByUsername`;
export const loginUrl = `${baseUrl}/api/account/login`;
export const registerUrl = `${baseUrl}/api/account/register`;
export const googleUrl = `${baseUrl}/api/account/google`;
export const genresAllUrl = `${baseUrl}/api/genres`;

export const getAudioByName = `${baseUrl}/api/audio/audioByName`;

// get
export const confirmEmailUrl = `${baseUrl}/api/account/ConfirmEmail`;

// post
export const verifyEmailAgainUrl = `${baseUrl}/api/account/VerifyEmail`;

// search
export const searchAllAudiosEndpoint = `${baseUrl}/api/search/audios`;
export const getMainSearchResultsUrl = `${baseUrl}/api/search/GetMainSearchResults`;

// profile

export const getUserProfileInfo = `${baseUrl}/api/profile`;

// trackCountUrl 
export const trackCountSignalRUrl = `${baseUrl}/trackCount`;

// sets

export const createSetUrl = `${baseUrl}/api/Sets/create`;
export const getUserSetsUrl = `${baseUrl}/api/Sets`;
export const addAudioToSetUrl = `${baseUrl}/api/Sets/addAudio`;
export const removeAudioFromSetUrl =  `${baseUrl}/api/Sets/removeAudio`;
export const getSetsByUsername = `${baseUrl}/api/Sets/getSetsByUsername`;

export const getAudiosSetsUrl = `${baseUrl}/api/Sets/getAudiosForSet`;

export const getSetsForProfileUser = `${baseUrl}/api/Sets/getSetsForProfileUser`;

// Sections
export const getPopularSongs = `${baseUrl}/api/audios/getPopularSongs`;
export const getNewlyListedSongs = `${baseUrl}/api/audios/getNewlyListedSongs`;