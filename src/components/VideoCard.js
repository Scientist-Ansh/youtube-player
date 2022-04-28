import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Card = styled.div`
  padding: 15px;
  max-width: 300px;
  min-width: 250px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
`;

const CustomLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const VideoCard = ({ data, type, handleAddVideo }) => {
  let navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/video/${data.id.videoId}`)}>
      <Image src={data.snippet.thumbnails.default.url} alt="thumbnail" />
      <h3>{data.title}</h3>
      <p>
        <span>{data.views} views.</span> <span>{data.snippet.publishedAt}</span>
      </p>
      {type && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddVideo(data.id.videoId);
          }}
        >
          Add to Playlist
        </button>
      )}
    </Card>
  );
};

export default VideoCard;
