import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { trackCountSignalRUrl } from '../../utils/endpoints';

interface SignalRState {
  connection: HubConnection | null;
  isConnected: boolean;
}

const initialState: SignalRState = {
  connection: null,
  isConnected: false,
};

const signalRSlice = createSlice({
  name: 'signalR',
  initialState,
  reducers: {
    connect(state) {
      state.connection = new HubConnectionBuilder()
        .withUrl(trackCountSignalRUrl)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      state.connection.start().then(() => {
        state.isConnected = true;
      });
    },
    disconnect(state) {
      if (state.connection) {
        state.connection.stop();
        state.connection = null;
        state.isConnected = false;
      }
    },
    // Additional actions and reducers can be added here based on your requirements
  },
});

export const { connect, disconnect } = signalRSlice.actions;

export default signalRSlice.reducer;
