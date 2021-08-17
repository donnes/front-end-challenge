import {VStack, Text, Spinner} from '@chakra-ui/react';
import RDataTable, {TableProps} from 'react-data-table-component';
import {BiDownArrowAlt} from 'react-icons/bi';
import theme from '@/theme';

const customStyles = {
  header: {
    style: {
      minHeight: '56px',
    },
  },
  headRow: {
    style: {
      overflow: 'hidden',
      borderRadius: theme.sizes['2'],
      borderTopWidth: '0px',
    },
  },
  headCells: {
    style: {
      backgroundColor: theme.colors.dark[700],

      'div, span': {
        fontFamily: theme.fonts.body,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.md,
        color: theme.colors.white,
      },

      '&:hover': {
        color: theme.colors.white,
      },
    },
  },
  cells: {
    style: {},
  },
};

const DataTable: React.FC<TableProps> = (props) => {
  return (
    <RDataTable
      {...props}
      customStyles={customStyles}
      sortIcon={<BiDownArrowAlt size={20} color="white"/>}
      noDataComponent={(
        <VStack paddingY="lg">
          <Text>No clients found.</Text>
        </VStack>
      )}
      progressComponent={(
        <VStack paddingY="lg">
          <Spinner size="sm"/>
        </VStack>
      )}
      persistTableHead
    />
  );
};

export default DataTable;
