import { faUser, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userInfo } from 'os'
import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import classes from "../../MainNavigation.module.css";
import { useAppDispatch } from '../../../../../store/store'
import { logout } from '../../../../../store/features/authSlice'

interface IProfileSubMenuProps {
  emailToDisplay: string | undefined;
}

export const ProfileSubMenu = forwardRef<HTMLDivElement, IProfileSubMenuProps>(({ emailToDisplay }, ref) => {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <div ref={ref} className={classes['sub-menu-wrap']}>
        <div className={classes['sub-menu']}>
          <div className={classes['user-info']}>
            <h5>{emailToDisplay ? emailToDisplay : "User"}</h5>
          </div>
          <hr></hr>
          <Link to={"/me"} className={classes["sub-menu-link"]}>
            <FontAwesomeIcon icon={faUser} />
            <p>Profile</p>
          </Link>
          <Link to={"/"} className={classes["sub-menu-link"]}>
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>Edit Profile</p>
          </Link>
          <button type='button' className={classes["sub-menu-link"]} onClick={() => dispatch(logout())}>
            <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
            <p>Logout</p>
          </button>
        </div>
      </div>
    </>
  );
});
