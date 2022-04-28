import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

import { useParams } from 'react-router-dom';
import { useSearchTextContext } from '../contexts/searchText';

import SearchList from '../components/SearchList';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const SingleVideo = () => {
  const searchText = useSearchTextContext();

  let urlParams = useParams();
  const { data, error } = useSWR(
    ` https://youtube.thorsteinsson.is/api/videos/${urlParams.videoId}`,
    fetcher
  );

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data);

  return (
    <Container>
      <div>
        <iframe
          title="video"
          width="600"
          height="380"
          src={`https://www.youtube.com/embed/${data.videoId}`}
        ></iframe>
      </div>
      <div style={{ textAlign: 'left' }}>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <p>
          <span>{data.views} views.</span> <span>{data.genre}</span>
        </p>
      </div>

      {searchText.searchText && (
        <SearchList searchText={searchText.searchText} />
      )}
    </Container>
  );
};

export default SingleVideo;
