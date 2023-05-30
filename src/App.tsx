import { useEffect } from 'react';
import MyRouter from './router/router-config';
import { useAppDispatch, useAppSelector } from './store/store';
import { handleAuth } from './store/features/authSlice';
import { configureAuthHeaders } from './services/auth-header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { connect, disconnect } from './store/features/signlaRSlice';
import { setNewCountForTrack } from './store/features/appSlice';

function App() {
  const dispatch = useAppDispatch();
  const { connection, isConnected } = useAppSelector(state => state.signalR);

  // Lab-4 code review by Vika Myron
  // 1. refactor big compoents into small one
  // 2. change from styles.css to module styles (in this case all styles will have unique name)
  // 3. add loading behavior for methods where you complete async request to api
  // 4. create service/services which will have methods to perform API requests (also you can create helpers in order to remove code repetion)
  
  useEffect(() => {
    console.log("App re-render");
    dispatch(handleAuth());
    configureAuthHeaders()
  }, [dispatch]);

  useEffect(() => {
    dispatch(connect());

    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);

  useEffect(() => {
    if (connection) {
      console.log("Event registered");

      connection.on("UpdateTrackCount", (audioCount: number, audioId: string) => {
        console.log("Setting the new count ", audioCount, audioId);
        dispatch(setNewCountForTrack({ idTrack: audioId, newCount: audioCount }));
      });
    }
    else {
      console.log("Event not registered");
    }

  }, [connection, dispatch])

  return (
    <>
      <MyRouter />
    </>
  );
}

export default App;
