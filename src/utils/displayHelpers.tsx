import React from "react";
import { Link } from "react-router-dom";

export function formatArtists(artists: string[] | undefined) {
    if (artists === undefined || artists?.length === 0) {
        return <p>No artist</p>
    }

    const linkElements = artists.map((artist: string, index: number) => {
        const separator = index === artists.length - 1 ? <></> : <span>, </span>
        return (
            <React.Fragment key={index}>
                <Link to={`/${artist}`}>{artist}</Link>{separator}
            </React.Fragment>
        );
    });


    return <>{linkElements}</>;
}