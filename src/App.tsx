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
