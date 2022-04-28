import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

import { useParams } from 'react-router-dom';
import { useSearchTextContext } from '../contexts/searchText';

import SearchList from '../components/SearchList';
import styled from 'styled-components';
import PlaylistContainer from '../components/PlaylistContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const Playlist = () => {
  const [videos, setVideos] = useState([]);
  const searchText = useSearchTextContext();

  let urlParams = useParams();
  const { data, error } = useSWR(
    ` https://youtube.thorsteinsson.is/api/playlists/${urlParams.playlistId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log('runnign useEffect');
      getVideos();
    }
  }, [data]);

  async function getVideos() {
    console.log('');
    // loop from data.videos and return a promise for each video
    const promises = data.videos.map((videoId) =>
      fetcher(`https://youtube.thorsteinsson.is/api/videos/${videoId}`)
    );
    const result = await Promise.all(promises);
    setVideos(result);
  }

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data);

  return (
    <Container>
      <PlaylistContainer name={data.name} data={videos} />

      {searchText.searchText && (
        <SearchList searchText={searchText.searchText} />
      )}
    </Container>
  );
};

export default Playlist;
