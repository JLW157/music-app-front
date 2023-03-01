import { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { song } from '../../data';
import SectionItem from '../SectionItem/SectionItem';
import "./Section.css"

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 2400 },
        items: 5,
        partialVisibilityGutter: 20, // this adds padding to the sides of the items
        slidesToSlide: 3, // number of slides to slide at once
    },
    tablet: {
        breakpoint: { max: 2400, min: 1200 },
        items: 3,
        partialVisibilityGutter: 20,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 1200, min: 0 },
        items: 2,
        partialVisibilityGutter: 20,
        slidesToSlide: 1,
    },
};

const Section = ({ title, songs}: sectionProps) => {
    
    const onPlayClick = (songId: number) => {
        console.log(songId);
    };

    let itemsToDisplay: any = songs.map((song, index) => {
        return <SectionItem songId={index} onPlayClick={onPlayClick} poster={song.poster} title={song.title} artitsts={song.artists} />
    });

    itemsToDisplay = (itemsToDisplay ? itemsToDisplay : <div>Empty</div>);


    return <>
        <div className='section-wrapper'>
            <div className='section-info'>
                <h2 className='section-title'>{title}</h2>
                <a href='#!' className='section-more'><span>Show All</span></a>
            </div>

            <Carousel containerClass='react-multi-carousel-list' centerMode={true} responsive={responsive}>
                {itemsToDisplay && itemsToDisplay}
            </Carousel>
        </div>
    </>
};

interface sectionProps {
    title: string;
    songs: song[]
};

export default Section;