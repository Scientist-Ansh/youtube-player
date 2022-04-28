import styled from 'styled-components';

const VideoList = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: auto;
  width: 100%;
`;

const Card = styled.div`
  padding: 15px;
  max-width: 300px;
  min-width: 250px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
`;

const PlaylistContainer = ({ data, name }) => {
  console.log(data);
  return (
    <>
      {data[0] && (
        <>
          <div>
            <iframe
              title="video"
              width="600"
              height="380"
              src={`https://www.youtube.com/embed/${data[0].videoId}`}
            ></iframe>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h2>{data[0].title}</h2>
            <p>{data[0].description}</p>
            <p>
              <span>{data[0].views} views.</span>
            </p>
          </div>
        </>
      )}

      <h3>{name}</h3>
      <VideoList>
        {data.map((video) => (
          <Card key={video.videoId}>
            <Image src={video.thumbnailUrl} alt="thumbnail" />
            <h3>{video.title}</h3>
            <p>
              <span>{video.views} views.</span>{' '}
            </p>
          </Card>
        ))}
      </VideoList>
    </>
  );
};
export default PlaylistContainer;
