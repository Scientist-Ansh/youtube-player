import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

import { useParams } from 'react-router-dom';
import { useSearchTextContext } from '../contexts/searchText';

import SearchList from '../components/SearchList';
import styled from 'styled-components';
import PlaylistContainer from '../components/PlaylistContainer';
import axios from 'axios';

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
    console.log(data, 'inside the get Videos function');
    if (data && !data.videos) {
      return;
    }
    const promises = data.videos.map((videoId) =>
      fetcher(`https://youtube.thorsteinsson.is/api/videos/${videoId}`)
    );
    const result = await Promise.all(promises);
    setVideos(result);
  }

  const handleAddVideo = async (videoId) => {
    console.log(videoId);
    const newVideos = [...data.videos, videoId];
    // create a put request with featcher with newVideos
    const response = await axios.put(
      `https://youtube.thorsteinsson.is/api/playlists/${urlParams.playlistId}`,
      {
        name: data.name,
        videos: newVideos,
      }
    );

    console.log(response);
    if (response.data.success === true) {
      const newVideo = await fetcher(
        `https://youtube.thorsteinsson.is/api/videos/${videoId}`
      );
      setVideos([...videos, newVideo]);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    const newVideos = data.videos.filter((video) => video !== videoId);
    // create a put request with featcher with newVideos
    const response = await axios.put(
      `https://youtube.thorsteinsson.is/api/playlists/${urlParams.playlistId}`,
      {
        name: data.name,
        videos: newVideos,
      }
    );

    if (response.data.success) {
      setVideos(videos.filter((video) => video.videoId !== videoId));
    }
  };

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data);

  return (
    <Container>
      <h2>{data && !data.videos && 'Cannot Load playlist'}</h2>
      <PlaylistContainer
        name={data.name}
        data={videos}
        handleRemoveVideo={handleRemoveVideo}
      />

      {searchText.searchText && (
        <SearchList
          searchText={searchText.searchText}
          type={data.videos && 'playlist'}
          handleAddVideo={handleAddVideo}
        />
      )}
    </Container>
  );
};

export default Playlist;
