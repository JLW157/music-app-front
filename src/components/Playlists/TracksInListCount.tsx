import { ISetDTO } from "../../models/set.models";

interface ITracksInListCountProps {
    className?: string;
    set: ISetDTO;
}

const TracksInListCount = ({ set, className }: ITracksInListCountProps) => {
    return <>
        <span className={className ?? ""}>{set.audios.length}</span>
    </>
};

export default TracksInListCount;