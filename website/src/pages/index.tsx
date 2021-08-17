import {useState} from 'react';
import {
  Container,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Button,
  Select,
  useTheme,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {RiRefreshLine, RiUserSearchLine} from 'react-icons/ri';
import {format} from 'date-fns';
import {find, omit} from 'lodash';
import {Page} from '@/layouts';
import {DataTable, ModalClientView} from '@/components';
import {AppTheme} from '@/theme';
import {useClients} from '@/hooks';
import {Client} from '@/types';

const Home: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>(router?.query.search as string || '');
  const {colors} = useTheme<AppTheme>();
  const {
    results: clients,
    page,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    setPage,
  } = useClients(router.query as any);
  const selectedClient = find(clients, (client) => client.login.uuid === router.query?.viewId);
  const shouldRenderLoadMore = !isLoading && !isEmpty && !router.query.search;

  const filteredClients = () => {
    const keyword = searchText.toLowerCase();
    return clients.filter((client) => {
      return client.name.first.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.name.last.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.nat.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.email.toLowerCase().match(new RegExp(keyword, 'g'));
    });
  }

  const openViewClient = (client: Client) => {
    router.push({
      pathname: '/',
      query: {...router.query, viewId: client.login.uuid}
    });
  }

  const columns = [
    {
      name: 'Name',
      selector: 'name.first',
      format: (row: Client) => `${row.name.first} ${row.name.last}`,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: 'gender',
      format: (row: Client) => row.gender === 'male' ? 'Male' : 'Female',
      sortable: true,
    },
    {
      name: 'Birth',
      selector: 'dob.date',
      format: (row: Client) => format(new Date(row.dob.date), 'MM/dd/yyyy'),
      sortable: true,
    },
    {
      name: 'Nationality',
      selector: 'nat',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Button colorScheme="blue" onClick={() => openViewClient(row)}>
          View
        </Button>
      ),
      button: true,
    },
  ];

  return (
    <Page>
      <Container maxWidth="container.md">
        <VStack spacing="md">
          <SimpleGrid width="full" gridTemplateColumns="1fr auto" gap="sm">
            <InputGroup size="lg">
              <Input
                type="text"
                placeholder="Search by name, nationality or email"
                paddingRight="12"
                focusBorderColor="primary"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  if (e.target.value) {
                    router.push({
                      pathname: '/',
                      query: {...router.query, search: e.target.value}
                    });
                  } else {
                    router.push({
                      pathname: '/',
                      query: omit(router.query, 'search'),
                    });
                  }
                }}
              />
              <InputRightElement paddingX="sm">
                <RiUserSearchLine size={20} color={colors.dark[400]}/>
              </InputRightElement>
            </InputGroup>
            <Select
              placeholder="Gender"
              size="lg"
              value={router.query.gender}
              onChange={(e) => {
                router.push({
                  pathname: '/',
                  query: {...router.query, gender: e.target.value}
                });
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </SimpleGrid>

          <DataTable
            columns={columns}
            data={filteredClients()}
            keyField="id.value"
            progressPending={isLoading}
          />

          {shouldRenderLoadMore && (
            <Button
              onClick={() => {
                setPage(page + 1);
                router.push({
                  pathname: '/',
                  query: {...router.query, page: String(page + 1)}
                });
              }}
              variant="ghost"
              color="primary"
              leftIcon={<RiRefreshLine size={24}/>}
              isDisabled={isLoadingMore || isReachingEnd}
            >
              {isLoadingMore ? 'Loading...' : isReachingEnd ? 'No more clients to load' : 'Load more'}
            </Button>
          )}
        </VStack>
      </Container>

      <ModalClientView
        isOpen={Boolean(selectedClient)}
        client={selectedClient}
        onClose={() => {
          router.push({
            pathname: '/',
            query: omit(router.query, 'viewId'),
          });
        }}
      />
    </Page>
  );
};

export default Home;
