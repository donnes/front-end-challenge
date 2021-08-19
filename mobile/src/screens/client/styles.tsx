import {Text, List as UIList} from '@ui-kitten/components';
import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const Name = styled(Text).attrs({
  category: 'h3',
})`
  margin-left: 24px;
`;

export const List = styled(UIList)`
  flex-grow: 1;
  background-color: white;
`;
