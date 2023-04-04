import { useEffect } from 'react';
import MyRouter from './router/router-config';
import { useAppDispatch, useAppSelector } from './store/store';
import authService from './services/auth-service';
import { handleAuth, logout, setIsLoggedIn } from './store/features/authSlice';

function App() {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  // todo fix issue with re-rendering and persistion token in localstorage
  useEffect(() => {
    dispatch(handleAuth());
  }, [dispatch]);

  return (
    <>
      <MyRouter />
    </>
  );
}

export default App;
