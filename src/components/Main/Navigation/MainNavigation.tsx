import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowDown, faChevronLeft, faChevronRight, faPenToSquare, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import classes from "./MainNavigation.module.css";
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logout } from '../../../store/features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ProfileSubMenu } from './Profile/ProfileSubmenu/ProfileSubMenu';
import ProfileIcon from './Profile/ProfileIcon';
import { useState } from 'react';
import SearchInput from '../../Search/SearchInput';

const MainNavigation = () => {
  const { isLoggedIn, userInfo } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  return <>
    <div className={classes.topbar}>
      <div className={classes["prev-next-buttons"]}>
        <button onClick={() => navigate(-1)} type="button" className={classes["fas"]}>
          <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
        </button>
        <button onClick={() => navigate(1)} type="button" className={classes["fas"]}>
          <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
        </button>
      </div>

      <SearchInput />

      <div className={classes.navbar}>
        {isLoggedIn
          ? <>
            <ul>
              <li>
                <ProfileIcon isProfileOpen={isProfileOpen} profileToggler={() => setIsProfileOpen(!isProfileOpen)} />
              </li>
              {isProfileOpen && <>
                <ProfileSubMenu emailToDisplay={userInfo?.email} />
              </>}
            </ul>
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