import {DataTable} from 'react-native-paper';
import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
`;

export const LoadMoreContainer = styled.View`
  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;

export const DataTableCell = styled(DataTable.Cell)`
  justify-content: ${({numeric, centered}) => numeric ? 'flex-end' : centered ? 'center' : 'flex-start'};
  align-items: center;
`;
