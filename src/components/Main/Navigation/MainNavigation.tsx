import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./MainNavigation.module.css";
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logout } from '../../../store/features/authSlice';
import { Link } from 'react-router-dom';

const MainNavigation = () => {
  const { isLoggedIn, userInfo } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
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
        {isLoggedIn 
        ? <>
          <ul>
            <li>Hello, {userInfo?.email ? userInfo.email : "User"}</li>
          </ul>
          <button type='button' onClick={() => dispatch(logout())}>Logout</button>
        </>
          : <>
            <ul>
              <li>
                <Link to="register">Sign Up</Link>
              </li>
              <li className="divider">|</li>
            </ul>
            <Link className={classes["auth-button"]} to={"/login"}>Log in</Link>
          </>
        }
      </div>
    </div>
  </>
};

export default MainNavigation;