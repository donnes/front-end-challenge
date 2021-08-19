import React from 'react';
import styled from 'styled-components/native';
import {TopBar} from '../components';

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 24,
  }
})`
  flex-grow: 1;
`;

type ScreenProps = {
  title?: string;
  hasBack?: boolean;
  onScrollReachingEnd?: () => void;
};

const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  hasBack = false,
  onScrollReachingEnd = () => null
}) => {
  return (
    <Container>
      <TopBar title={title} hasBack={hasBack}/>

      <Content
        onScroll={({nativeEvent}) => {
          const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
          const hasReachingEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
          if (hasReachingEnd) {
            onScrollReachingEnd();
          }
        }}
        scrollEventThrottle={20}
      >
        {children}
      </Content>
    </Container>
  );
}

export default Screen;
