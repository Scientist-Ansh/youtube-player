import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './Pages/Home';
import SingleVideo from './Pages/SingleVideo';
import Playlist from './Pages/Playlist';

import { SearchTextProvider } from './contexts/searchText';

function App() {
  return (
    <SearchTextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="video">
            <Route path=":videoId" element={<SingleVideo />} />
          </Route>
          <Route path="playlist">
            <Route path=":playlistId" element={<Playlist />} />
          </Route>
        </Routes>
      </Layout>
    </SearchTextProvider>
  );
}

export default App;
