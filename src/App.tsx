import { useEffect } from 'react';
import MyRouter from './router/router-config';
import { useAppDispatch, useAppSelector } from './store/store';
import { handleAuth } from './store/features/authSlice';
import { configureAuthHeaders } from './services/auth-header';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    console.log("App re-render");
    dispatch(handleAuth());
    configureAuthHeaders()
  }, [dispatch]);

  return (
    <>
      <MyRouter />
    </>
  );
}

export default App;
