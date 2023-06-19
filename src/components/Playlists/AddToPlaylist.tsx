import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import SearchPlaylistInput from "./SearchPlaylistInput";
import PlaylistSearchList from "./PlaylistSearchList";
import { ISetDTO } from "../../models/set.models";
import axios from "axios";
import { getUserSetsUrl } from "../../utils/endpoints";
import { setSearchTerm } from "../../store/features/searchSlice";

interface IAddToPlaylist {
    audioId?: string;
}
const AddToPlaylist = ({ audioId }: IAddToPlaylist) => {
    const [input, setInput] = useState<string>("");
    const [sets, setSets] = useState<Array<ISetDTO>>([]);
    const [error, setErorr] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [queriedSets, setQuariedSets] = useState<Array<ISetDTO>>(sets);

    useEffect(() => {
        try {
            setLoading(true);
            axios.get<Array<ISetDTO>>(getUserSetsUrl).then(
                res => {
                    setSets(res.data);
                    setQuariedSets(res.data);
                },
                rej => {
                    setSets([]);
                    setErorr(rej.response.data.message);
                }
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, []);

    const onTermInput = (term: string) => {
        term = term.toLowerCase();
        setSearchTerm(term);
        
        setQuariedSets(sets.filter(x => x.name.toLocaleLowerCase().includes(term)));
    }

    return <>
        <div>
            <SearchPlaylistInput onChange={onTermInput} />
            {audioId &&
                <PlaylistSearchList audioId={audioId} sets={queriedSets} />
            }
        </div>

    </>
};

export default AddToPlaylist;