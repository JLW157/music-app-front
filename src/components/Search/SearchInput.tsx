import { faSearch, faUser, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ISearchItem, ISong, ItemType } from "../../models/track-models";
import { useAppDispatch } from "../../store/store";
import { searchAllAudiosEndpoint } from "../../utils/endpoints";
import "./Search.css";
import { setSearchTerm } from "../../store/features/searchSlice";

interface ISearchRequest {
  term: string;
  genre: string;
}

const SearchInput = () => {
  const [searchResults, setSearchResults] = useState<Array<ISearchItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const location = useLocation();

  const isOnSearchPage = location.pathname === "/search";

  const { handleSubmit, control, setValue } = useForm<ISearchRequest>();

  const handleSearch = (query: string) => {
    setIsLoading(true);
    axios.get<Array<ISearchItem>>(`${searchAllAudiosEndpoint}/?searchTerm=${query}`)
      .then(
        (res) => {
          setSearchResults(res.data);
          setIsLoading(false);
        },
        (rej) => {
          setIsLoading(false);
        }
      );
  };

  const onSubmit = (data: ISearchRequest) => {
    dispatch(setSearchTerm(data.term));

    if (!isOnSearchPage) {
      navigate(`/search`);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/* Search component */}
      <div className="search-wrapper">
        <form className="search-wrapper-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="search-input">
            <div className="search-input-buttons">
              <Controller
                control={control}
                name="term"
                render={({ field }) => (
                  <AsyncTypeahead
                    className="search-input-term"
                    {...field}
                    onInputChange={(text) => {
                      setValue("term", text);
                      console.log(`Here is term value - ${text}`);
                    }}
                    id="search-input"
                    style={{
                      width: "100%",
                      display: "flex",
                    }}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    options={searchResults}
                    labelKey={(option) => (option as ISong).name}
                    placeholder="what are you looking for?"
                    minLength={1}
                    maxHeight="600px"
                    emptyLabel="No results found"
                    renderMenuItemChildren={(song) => {
                      const newSong = song as ISearchItem;
                      return (
                        <>
                          <Link to={newSong.itemRelativeUrl}>
                            <div className="renderItem">
                              <div className="renderItem-img">
                                <img src={newSong.imageUrl} alt="img" />
                              </div>
                              <div className="renderItem-content">{newSong.name}</div>
                              <div className="renderItem-icon">{setIconBasedOnItemType(newSong.itemType)}</div>
                            </div>
                          </Link>
                        </>
                      );
                    }}
                    onChange={(selected) => {
                      console.log(selected);

                    }}
                  />
                )}
              />
            </div>
            <button className="search-submit-button" type="submit"><FontAwesomeIcon icon={faSearch} style={{ color: "#FFF" }} /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;


const setIconBasedOnItemType = (itemType: number) => {
  switch (itemType) {
    case ItemType.Artist:
      {
        return <>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </>
        break;
      }
    case ItemType.Audio: {
      return <>
        <FontAwesomeIcon icon={faWaveSquare}></FontAwesomeIcon>
      </>
      break;
    }
    default: {
      return <FontAwesomeIcon icon={"alarm-snooze"}></FontAwesomeIcon>
    }
  }
};