import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSearchTextContext } from '../contexts/searchText';

const Container = styled.div`
  padding: 50px 40px;
  background-color: #181818;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  min-width: 300px;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px;
  position: relative;
  background-color: #202020;
  border-bottom: 1px solid dimgray;
`;

const InputPlaylist = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  & > p{
    text-decoration: underline;
    color: antiquewhite;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin:0;
};
  & > input{
    border: none;
    outline: none;
    background-color: #202020;
    border-bottom: 1px solid white;
    color:white;
  }
  & > button{
    height: 30px;
    margin-top:-5px;
  }

  }
`;

const Button = styled.button`
  height: 100%;
  background-color: #313131;
  outline: none;
  border: none;
  color: antiquewhite;
`;

const Layout = ({ children }) => {
  let navigate = useNavigate();

  const inputRef = useRef(null);
  const [newPlaylist, setNewPlaylist] = useState(false);
  const searchText = useSearchTextContext();
  function handleSubmit(e) {
    e.preventDefault();
    searchText.setSearchText(e.target.search.value);
  }

  const handleNewPlaylist = async () => {
    const value = inputRef.current.value;
    inputRef.current.disabled = true;
    console.log(value);
    if (!value) {
      alert('Please enter a name for the playlist');
      return;
    }

    // create a post request with axios to create a new playlist with name
    const response = await axios.post(
      'https://youtube.thorsteinsson.is/api/playlists',
      {
        name: value,
      }
    );
    console.log(response);
    if (response.data.id) {
      navigate(`/playlist/${response.data.id}`);
    } else {
      alert('Error, Please try again!');
      inputRef.current.disabled = false;
    }
  };

  return (
    <>
      <Flex>
        <form onSubmit={handleSubmit}>
          <Input name="search" type="text" placeholder="Search" required />
          <Button type="submit">Search</Button>
        </form>
        {newPlaylist ? (
          <InputPlaylist>
            <input type="text" placeholder="Playlist Name" ref={inputRef} />
            <Button onClick={handleNewPlaylist}>Create</Button>
          </InputPlaylist>
        ) : (
          <InputPlaylist>
            <p onClick={() => setNewPlaylist(true)}>New Playlist</p>
          </InputPlaylist>
        )}
      </Flex>

      <Container>{children}</Container>
    </>
  );
};

export default Layout;
