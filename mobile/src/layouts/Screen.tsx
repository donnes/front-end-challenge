import React from 'react';
import styled from 'styled-components/native';
import {TopBar} from '../components';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
`;

const Page: React.FC = ({children}) => {
  return (
    <Container>
      <TopBar/>

      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default Page;
