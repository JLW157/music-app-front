import axios from "axios";
import { genresAllUrl } from "../utils/endpoints";

export const getGenres = async () => {
    try {
        const response = await axios.get(genresAllUrl);
        return response.data;        
    } catch (error) {
        return [];
    }
};