import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faHome, faPlusSquare, faHeart, faBars, faUpload } from '@fortawesome/free-solid-svg-icons';
import classes from "./Sidebar.module.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../store/store';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const toggle = () => setIsOpen(!isOpen);
    const { isLoggedIn } = useAppSelector(x => x.auth);

    const menuItems = [
        {
            to: "home",
            icon: faHome,
            name: "Home"
        },
        {
            to: "search",
            icon: faSearch,
            name: "Search"
        },
        {
            to: "/me/tracks",
            icon: faBook,
            name: "Your library"
        },
    ];

    return <>
        <div style={{ width: isOpen ? "200px" : "50px", alignItems: isOpen ? "flex-start" : "center" }} className={classes.sidebar}>
            <div className={classes["top-section"]}>
                <a style={{ display: isOpen ? "block" : "none" }} className={classes.logo}>Amigo</a>
                <div style={{ marginLeft: isOpen ? "70px" : "0px" }} className={classes["bars"]}>
                    <FontAwesomeIcon onClick={toggle} icon={faBars} />
                </div>
            </div>

            <div className={classes.navigation}>
                <ul>
                    {menuItems.map((s, index) => {
                        return <li key={index}>
                            <Link to={s.to}>
                                <FontAwesomeIcon icon={s.icon}></FontAwesomeIcon>
                                <span style={{ display: isOpen ? "inline-block" : "none" }}>{s.name}</span>
                            </Link>
                        </li>
                    })}
                </ul>
            </div>

            <div className={classes.navigation}>
                <ul>
                    <li>
                        <Link to={"playlists/create"}>
                            <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
                            <span style={{ display: isOpen ? "inline-block" : "none" }}>Create Playlist</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"liked"}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            <span style={{ display: isOpen ? "inline-block" : "none" }}>Liked songs</span>
                        </Link>
                    </li>
                    {isLoggedIn &&
                        <li>

                            <Link to={"tracks/upload"}>
                                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                                <span style={{ display: isOpen ? "inline-block" : "none" }}>Upload track</span>
                            </Link>
                        </li>
                    }
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