import styled from 'styled-components';

import { useSearchTextContext } from '../contexts/searchText';
import SearchList from '../components/SearchList';

const Container = styled.div`
  padding: 50px 40px;
`;

const Home = () => {
  const searchText = useSearchTextContext();
  console.log(searchText);
  return (
    <Container>
      {searchText.searchText && (
        <SearchList searchText={searchText.searchText} />
      )}
    </Container>
  );
};

export default Home;
