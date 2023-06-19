import { ISearchGetMainSearchResultItem, ISearchItem } from "./track-models";

export interface IGetMainSearchRequest{
    term: string;
    currentPage: number;
    pageSize: number;
    searchResultType: number;
}

export interface IGetMainSearchResultsResponse{
    totalResultsCount: number;
    pageSize: number;
    totalPages: number;
    searchResultItems: ISearchGetMainSearchResultItem[];
}

export const SearchType = {
    "All" : 0,
    "Tracks" : 1,
    "People" : 2,
};

export interface IGoToPageRequest{
    page: number;
}