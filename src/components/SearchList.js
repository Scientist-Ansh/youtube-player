import useSWR from 'swr';
import styled from 'styled-components';

import { fetcher } from '../utils/fetcher';

import VideoCard from './VideoCard';

const VideoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SearchList = ({ searchText }) => {
  const { data, error } = useSWR(
    `https://youtube.thorsteinsson.is/api/search?q=${searchText}`,
    fetcher
  );

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data);
  return (
    <VideoList>
      {data.map((video) => (
        <VideoCard data={video} key={video.id.videoId} />
      ))}
    </VideoList>
  );
};
export default SearchList;
