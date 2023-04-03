import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classes from "./MainNavigation.module.css";
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logout } from '../../../store/features/authSlice';

const MainNavigation = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
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
            <li>Hello, User</li>
          </ul>
          <button type='button' onClick={() => dispatch(logout())}></button>
        </>
          : <>
            <ul>
              <li>
                <a href="#">Sign Up</a>
              </li>
              <li className="divider">|</li>
            </ul>
            <button type="button">Log in</button>
          </>
        }
      </div>
    </div>
  </>
};

export default MainNavigation;