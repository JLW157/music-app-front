import { useEffect, useState } from "react";
import Section from "./Section";
import axios from "axios";
import { getPopularSongs } from "../../utils/endpoints";
import { ISong } from "../../models/track-models";

const PopularSection = () => {
    const [songs, setSongs] = useState<ISong[]>([]);

    useEffect(() => {
        axios.get<Array<ISong>>(getPopularSongs).then(res => {
            setSongs(res.data);
        }, rej => {
            
        });    
    }, []);
    
    return <>
        <Section title={"Most listened"} songs={songs}></Section>
    </>
};

export default PopularSection;