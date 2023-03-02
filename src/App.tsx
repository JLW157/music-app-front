import MyRouter from './router/router-config';
import SectionMusicProvider from './stores/sections/SectionMusicProvider';

function App() {
  return (
    <>
    <SectionMusicProvider>
      <MyRouter/>
    </SectionMusicProvider>
    </>
  );
}

export default App;
