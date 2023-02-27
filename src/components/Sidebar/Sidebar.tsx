import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faHome, faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import classes from "./Sidebar.module.css";

const Sidebar = () => {
    return <>
        <div className={classes.sidebar}>
            <div className={classes.logo}>
                <a href='#!'>
                    Music App
                </a>
            </div>

            <div className={classes.navigation}>
                <ul>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            <span>Search</span>
                        </a>
                    </li>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                            <span>Your library</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className={classes.navigation}>
                <ul>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
                            <span>Create Playlist</span>
                        </a>
                    </li>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            <span>Liked songs</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className={classes.policies}>
                <ul>
                    <li>
                        <a href="#!">Cookies</a>
                    </li>
                    <li>
                        <a href="#!">Privacy</a>
                    </li>
                </ul>
            </div>
        </div>
    </>
};

export default Sidebar;