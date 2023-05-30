import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { IGenre } from "../../models/genres-models";
import { getGenres } from "../../services/tracks-service";
import { Options } from "react-select";
import { useForm, Controller } from "react-hook-form";
import "./Search.css";
import axios from "axios";
import { searchAllAudiosEndpoint } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";
import { Link } from "react-router-dom";

interface ISearchRequest {
  term: string;
  genre: string;
}

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ISong[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, register } = useForm<ISearchRequest>();

  useEffect(() => {
    getGenres().then((res) => {
      setGenres(res);
    });

  }, []);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    axios
      .get<ISong[]>(`${searchAllAudiosEndpoint}/?searchTerm=${query}`)
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
    // Perform search or any other necessary logic
    console.log(data);
  };

  return (
    <div>
      {/* Search component */}
      <div className="search-wrapper">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="search-input">
            <FontAwesomeIcon icon={faSearch} style={{ color: "#000" }} />
            <Controller
              control={control}
              name="term"
              render={({ field }) => (
                <AsyncTypeahead
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                  {...field}
                  isLoading={isLoading}
                  onSearch={handleSearch}
                  options={searchResults}
                  labelKey={(option) => (option as ISong).name}
                  placeholder="what are you looking for?"
                  minLength={3}
                  emptyLabel="No results found"
                  renderMenuItemChildren={(song) => {
                    const newSong = song as ISong;
                    return (
                      <>
                        <Link to={`/${newSong.artists[0]}/${newSong.name}`}>
                          <div className="renderItem">
                            <div className="renderItem-img">
                              <img src={newSong.posterUrl} />
                            </div>
                            <div className="renderItem-content">
                              {newSong.name}
                            </div>
                          </div>
                        </Link>

                      </>
                    );
                  }}
                  onChange={(selected) => {
                    console.log(selected);
                    // Handle selection of an autocomplete suggestion
                    // Example: setSelectedSong(selected[0]);
                  }}
                />
              )}
            />
            <div className={"select-box"}>
              <select
                {...register("genre", {
                  required: "Genre is required!",
                })}
              >
                <option value="">Select genre</option>
                {genres.map((g, index) => (
                  <option key={g.id} value={g.id}>
                    {g.genre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;
