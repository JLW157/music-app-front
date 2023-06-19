import { Link } from "react-router-dom";
import { ISearchGetMainSearchResultItem, ISearchItem, IUserSearchResponse } from "../../../../models/track-models";
import "./UserSearchItem.css"

const UserSearchItem = (props: {user?:IUserSearchResponse}) => {
    return <>
        {props.user &&
            <li className="artist-list-item">
                <div className="artist-item">
                    <Link className="aritst-item-link" to={props.user.profileRelativeUrl}>
                        <div className="artist-item-img">
                            <img src={props.user.userImageUrl} alt="Artist" />
                        </div>
                    </Link>
                    <div className="artist-item-content">
                        <h2>{props.user.username}</h2>
                    </div>
                </div>
            </li>
        }
    </>
};

export default UserSearchItem;