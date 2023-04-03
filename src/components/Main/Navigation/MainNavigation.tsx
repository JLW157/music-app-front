import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import classes from "./MainNavigation.module.css";
import { Link } from 'react-router-dom';

const MainNavigation = () => {
    return <>
       <div className={classes.topbar}>
          <div className={classes["prev-next-buttons"]}>
            <button type="button" className={classes["fas"]}>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </button>
            <button type="button" className={classes["fas"]}>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </button>
          </div>
          <div className={classes.navbar}>
            <ul>
              <li>
                <a href="#">Premium</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Download</a>
              </li>
              <li className="divider">|</li>
              <li>
                <a href="#">Sign Up</a>
              </li>
            </ul>
            <Link type="button" to={'/login'}>Log in</Link>
          </div>
        </div>
    </>
};

export default MainNavigation;