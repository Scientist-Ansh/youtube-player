import styled from 'styled-components';

import { useSearchTextContext } from '../contexts/searchText';

const Container = styled.div`
  padding: 50px 40px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  min-width: 300px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Layout = ({ children }) => {
  const searchText = useSearchTextContext();
  function handleSubmit(e) {
    e.preventDefault();
    searchText.setSearchText(e.target.search.value);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input name="search" type="text" placeholder="Search" required />
        <button type="submit">Search</button>
      </Form>
      {children}
    </Container>
  );
};

export default Layout;
