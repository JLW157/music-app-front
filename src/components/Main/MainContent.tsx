import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import Section from "../Section/Section";
import Container from "../UI/Container";
import { fetchSongs } from "../../store/features/appSlice";
import PopularSection from "../Section/PoularSection";
import NewlyListedSection from "../Section/NewlyListedSection";

const MainContent = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSongs());
    }, []);

    return <>
        <Container width={1990}>
            <PopularSection/>
            {/* <NewlyListedSection/> */}
        </Container>
    </>
};

export default MainContent;