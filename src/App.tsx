import { useEffect } from 'react';
import MyRouter from './router/router-config';
import { useAppDispatch, useAppSelector } from './store/store';
import authService from './services/auth-service';
import { logout, setIsLoggedIn } from './store/features/authSlice';

function App() {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  // todo fix issue with re-rendering and persistion token in localstorage
  useEffect(() => {
      const response = authService.getInfoFromJwt();
      if (response) {
        dispatch(setIsLoggedIn(true));
      }
      dispatch(setIsLoggedIn(false));
  }, [dispatch]);
  
  return (
    <>
      <MyRouter/>
    </>
  );
}

export default App;
