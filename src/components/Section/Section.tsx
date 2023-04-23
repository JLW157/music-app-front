import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useAppSelector } from '../../store/store';
import SectionItem from '../SectionItem/SectionItem';
import "./Section.css"

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1900 },
        items: 5,
        partialVisibilityGutter: 20, // this adds padding to the sides of the items
        slidesToSlide: 3, // number of slides to slide at once
    },
    tablet: {
        breakpoint: { max: 1900, min: 1000 },
        items: 4,
        partialVisibilityGutter: 20,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 1000, min: 0 },
        items: 2,
        partialVisibilityGutter: 20,
        slidesToSlide: 1,
    },
};

const Section = ({ title }: sectionProps) => {
    const songs = useAppSelector(state => state.player.songs);

    let itemsToDisplay: any = songs?.map((song, index) => {
        return <SectionItem key={song.id} song={song} />
    });

    return <>
        <div className='section-wrapper'>
            <div className='section-info'>
                <h2 className='section-title'>{title}</h2>
                <a href='#!' className='section-more'><span>Show All</span></a>
            </div>

            {itemsToDisplay ? <Carousel containerClass='react-multi-carousel-list' centerMode={true} responsive={responsive}>
                {itemsToDisplay && itemsToDisplay}
            </Carousel> : <div style={{textAlign: "center", padding: "10px"}}>
                    There is no audios to display.
                </div>}
            
        </div>
    </>
};

interface sectionProps {
    title: string;
    // songs: ISong[],

};

export default Section;