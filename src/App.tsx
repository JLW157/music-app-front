import React from 'react';
import Main from './components/Main/Main';

import Sidebar from './components/Sidebar/Sidebar';
import SectionMusicProvider from './stores/sections/SectionMusicProvider';

function App() {
  return (
    <>
      <Sidebar />
      <SectionMusicProvider>
        <Main />
      </SectionMusicProvider>
    </>
  );
}

export default App;
