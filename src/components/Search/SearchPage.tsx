import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getMainSearchResults, goToPage } from "../../store/features/searchSlice";
import { Link, useLocation } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Pagination from "../Pagination/Pagination";
import { ISearchGetMainSearchResultItem, ISearchItem, ItemType } from "../../models/track-models";
import UserProfile from "../Profile/UserProfile/UserProfile";
import UserSearchItem from "./SearchItems/UserSearchItem/UserSearchItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import "./SearchPage.css";
import { IGetMainSearchRequest, SearchType } from "../../models/search.models";
import MusicSearchItem from "./SearchItems/MusicSearchItem/MusicSearchItem";
import { NavLink } from "react-router-dom";
import Loader from "../UI/Loader";
import { ModalContext } from "../../contexts/ModalContext";
import Modal from "../UI/Modal";

type Tabs = "all" | "tracks" | "people";

const SearchPage = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search);
    const location = useLocation();
    const [tabSelected, setTabSelected] = useState<Tabs>("all");
    const { showModal, isModalShown, typeOfModal, children } = useContext(ModalContext);

    const pageChange = (page: number) => {
        dispatch(goToPage(page))
    };

    const renderPagination = () => {
        if (search.totalResultCount) {
            if (search.totalResultCount >= 1) {
                return <Pagination currentPage={search.currentPage ?? 1} totalPages={search.totalPages ?? 1} onPageChange={pageChange}></Pagination>
            }
            return <></>
        }
        return <></>;
    };

    const renderList = () => {
        if (search.loading) {
            return <div className="search-page-loader-container">
                <Loader height={50} width={50} />
            </div>
        }

        if (search.totalResultCount! >= 1) {
            console.log("Success item in render list - ", search.searchResults);
            return <ul className="searchResults-list">
                {search.searchResults?.map((x) => {
                    return showItemBasedOnItemType(x.itemType, x);
                })}
            </ul>
        }
        return <>
            <div className="not-found-search-results">
                <div className="not-found-search-header">
                    <h3>Search term:  {(search.searchTerm?.length! < 1 ? "empty" : search.searchTerm) ?? "empty"}</h3>
                    <div className="not-found-search-header-icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div className="not-found-search-body">
                    Search results not found
                </div>
            </div >
        </>;
    }

    useEffect(() => {
        console.log("Page changed");

        const changeRequest: IGetMainSearchRequest = {
            term: search.searchTerm ?? '',
            currentPage: search.currentPage ?? 1,
            pageSize: 10,
            searchResultType: SearchType.All,
        };

        switch (tabSelected) {
            case "all":
                {
                    console.log("IN all tab");
                    changeRequest.searchResultType = SearchType.All;
                    dispatch(getMainSearchResults(changeRequest));
                    break;
                }
            case "tracks": {
                console.log("IN tracks tab");
                changeRequest.searchResultType = SearchType.Tracks;
                dispatch(getMainSearchResults(changeRequest));
                break;
            }
            case "people": {
                console.log("IN people tab");
                changeRequest.searchResultType = SearchType.People;
                dispatch(getMainSearchResults(changeRequest));
                break;
            }
            default:
                break;

        }

        dispatch(getMainSearchResults(changeRequest));

    }, [search.currentPage, search.searchTerm]);

    return (
        <>
            <div className="search-page">
                <hr />
                <div className="search-page-main">
                    <div className="searchResults">
                        {renderList()}
                    </div>
                    <div className="searchResults-options-panel">
                        <div className="search-result-options-content">
                            <h3>Search category</h3>
                            <br />
                            <ul className="options-content-list">
                                <li className={tabSelected === "all" ? "options-content-list-item active" : "options-content-list-item"}>
                                    <button className="tab-button" onClick={() => setTabSelected("all")}><span><FontAwesomeIcon icon={faSearch} />Everything</span></button>
                                </li>
                                <li className={tabSelected === "tracks" ? "options-content-list-item active" : "options-content-list-item"}>
                                    <button className="tab-button" onClick={() => setTabSelected("tracks")}><span><FontAwesomeIcon icon={faWaveSquare} />Tracks</span></button>
                                </li>
                                <li className={tabSelected === "people" ? "options-content-list-item active" : "options-content-list-item"}>
                                    <button className="tab-button" onClick={() => setTabSelected("people")}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> People</button>
                                </li>
                            </ul>
                            <br />
                        </div>
                        <hr />
                    </div>
                </div>
                {renderPagination()}
                {isModalShown &&
                    <Modal>
                        {children}
                    </Modal>
                }
            </div>
        </>
    );
};

export default SearchPage;


function showItemBasedOnItemType(itemType: number, searchItem: ISearchGetMainSearchResultItem) {
    console.log("Show item on ", searchItem);
    switch (itemType) {
        case ItemType.Artist: {
            return <UserSearchItem key={searchItem.userItem?.id} user={searchItem.userItem} />;
        }
        case ItemType.Audio: {
            return <MusicSearchItem key={searchItem.audioItem?.id} audio={searchItem.audioItem} />
        }
    }
}
