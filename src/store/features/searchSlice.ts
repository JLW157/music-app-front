import { Action, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { audiosUploadUrl, audiosUrl, getMainSearchResultsUrl } from "../../utils/endpoints";
import { ISearchGetMainSearchResultItem, ISearchItem, ISong, IUploadTrackDTO } from "../../models/track-models";
import { IGetMainSearchRequest, IGetMainSearchResultsResponse, IGoToPageRequest } from "../../models/search.models";

export interface ISearchSlice {
    searchResults: ISearchGetMainSearchResultItem[] | null;
    searchTerm: string | null;
    pageSize: number | null;
    currentPage: number | null;
    totalPages: number | null;
    totalResultCount: number | null;
    loading: boolean;
};


const initialState: ISearchSlice = {
    searchResults: null,
    searchTerm: null,
    pageSize: 10,
    currentPage: null,
    totalPages: null,
    totalResultCount: null,
    loading: false
};

export const getMainSearchResults = createAsyncThunk<IGetMainSearchResultsResponse, IGetMainSearchRequest, { rejectValue: string }>(
    "search/getMainSearchResults",
    async (request, thunkAPI) => {
        try {
            const response = await axios.post<IGetMainSearchResultsResponse>(getMainSearchResultsUrl, request);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Something went wrong!");
        }
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        goToNext: (state) => {
            if (state.currentPage && state.totalResultCount && state.totalPages) {
                if (validatePageChange(state.currentPage, state.currentPage + 1, state.totalPages)) {
                    state.currentPage += 1;
                }
                console.error("Incorrect paging");
            }
        },
        goBack: (state) => {
            if (state.currentPage && state.totalResultCount && state.totalPages) {
                if (validatePageChange(state.currentPage, state.currentPage + 1, state.totalPages)) {
                    state.currentPage -= 1;
                }
                console.error("Incorrect paging");
            }
        },
        goToPage: (state, action: PayloadAction<number>) => {
            console.log("Want to change ", state.currentPage, action.payload);
            if (!state.currentPage) {
                state.currentPage = action.payload;                
            }
            
            if (state.currentPage && state.totalResultCount && state.totalPages) {
                
                if (validatePageChange(state.currentPage, action.payload, state.totalPages)) {
                    state.currentPage = action.payload;
                }
            }
        },
        setSearchTerm: (state, action: PayloadAction<string>) =>{
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMainSearchResults.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Success from get main search results - ", action.payload);

            state.pageSize = action.payload.pageSize;
            state.searchResults = action.payload.searchResultItems;
            state.totalPages = action.payload.totalPages;
            state.totalResultCount = action.payload.totalResultsCount;
        }).addCase(getMainSearchResults.pending, (action) => {
            action.loading = true;
        }).addCase(getMainSearchResults.rejected, (action) => {
            action.loading = false;
        })
    }
});

const validatePageChange = (currentPage?: number, pageToMove?: number, totalPages?: number): boolean => {
    if (totalPages && pageToMove && totalPages) {
        if (totalPages >= pageToMove && pageToMove > 0) {
            return true
        }

        return false;
    }
    return false;
}

export const { goBack, goToNext, goToPage, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;