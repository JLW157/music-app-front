import { useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";
import { getNewlyListedSongs, getPopularSongs } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";

const NewlyListedSection = () => {
    const [songs, setSongs] = useState<ISong[]>([]);

    useEffect(() => {
        axios.get<Array<ISong>>(getNewlyListedSongs).then(res => {
            setSongs(res.data);
        }, rej => {

        });    
    }, []);
    
    return <>
        <Section title={"Newly listened"} songs={songs}></Section>
    </>
};

export default NewlyListedSection;