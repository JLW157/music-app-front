import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faHome, faPlusSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import classes from "./Sidebar.module.css";
import { Link } from 'react-router-dom';

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
                        <Link to={"home"}>
                            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"search"}>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            <span>Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"playlists"}>
                            <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                            <span>Your library</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={classes.navigation}>
                <ul>
                    <li>
                        <Link to={"playlists/create"}>
                            <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
                            <span>Create Playlist</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"liked"}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            <span>Liked songs</span>
                        </Link>
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