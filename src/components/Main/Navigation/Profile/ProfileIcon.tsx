import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../../../Profile/Profile";
import classes from "../MainNavigation.module.css";

interface IProfileIconProps{
    profileToggler: () => void;
    isProfileOpen: boolean;
}

const ProfileIcon = ({profileToggler, isProfileOpen}:IProfileIconProps) => {
    return <>
        <button onClick={profileToggler} className={`${classes['user-pic']} ${isProfileOpen ? classes.open : ''}`}>
            <div className={classes["user-pic-photo"]} >
                <FontAwesomeIcon style={{ color: "#FFF" }} icon={faUser} />
            </div>
        </button>
    </>
};

export default ProfileIcon;