import React, {useState} from 'react';
import {Text, Button, Spinner, Input, Select, SelectItem, IndexPath} from '@ui-kitten/components';
import {DataTable} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {format} from 'date-fns';
import {Ionicons} from '@expo/vector-icons';
import {Screen} from '../../layouts';
import {useClients} from '../../hooks';
import {RootStackParamList} from '../../types';

import {Header, DataTableCell, LoadMoreContainer} from './styles';

const GENDER_OPTIONS = ['Gender', 'Male', 'Female'];

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [searchText, setSearchText] = useState<string>('');
  const [gender, setGender] = useState<IndexPath>(new IndexPath(0));
  const {
    results: clients,
    page,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    setPage,
  } = useClients({gender: GENDER_OPTIONS[gender.row].toLowerCase(), page: 1});

  const filteredClients = () => {
    const keyword = searchText.toLowerCase();
    return clients.filter((client) => {
      return client.name.first.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.name.last.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.nat.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.email.toLowerCase().match(new RegExp(keyword, 'g'));
    });
  }

  const clientsList = filteredClients();

  const handleLoadMore = () => {
    if (isLoadingMore || isReachingEnd) {
      return;
    }
    setPage(page + 1);
  }

  return (
    <Screen
      title="Home"
      onScrollReachingEnd={handleLoadMore}
    >
      <Text category="h4">Find clients</Text>

      <Header>
        <Input
          style={{flex: 0.65, marginRight: 12}}
          value={searchText}
          placeholder="Search by name, email or nationality..."
          accessoryRight={() => (
            <Ionicons name="search" size={24}/>
          )}
          onChangeText={nextValue => setSearchText(nextValue)}
        />

        <Select
          style={{flex: 0.35}}
          placeholder="Gender"
          selectedIndex={gender}
          value={GENDER_OPTIONS[gender.row]}
          onSelect={(index) => setGender(index as IndexPath)}
        >
          <SelectItem title='Gender'/>
          <SelectItem title='Male'/>
          <SelectItem title='Female'/>
        </Select>
      </Header>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Gender</DataTable.Title>
          <DataTable.Title>Birth</DataTable.Title>
          <DataTable.Title numeric>Actions</DataTable.Title>
        </DataTable.Header>

        {clientsList.map((client) => {
          return (
            <DataTable.Row key={client.login.uuid}>
              <DataTableCell>
                <Text>{client.name.first}</Text>
              </DataTableCell>
              <DataTableCell>
                <Text>{client.gender === 'male' ? 'Male' : 'Female'}</Text>
              </DataTableCell>
              <DataTableCell>
                <Text>{format(new Date(client.dob.date), 'MM/dd/yyyy')}</Text>
              </DataTableCell>
              <DataTableCell numeric>
                <Button
                  size="small"
                  onPress={() => {
                    navigation.navigate('Client', {
                      client,
                    })
                  }}
                >
                  <Text>View</Text>
                </Button>
              </DataTableCell>
            </DataTable.Row>
          );
        })}

        {(isLoading || isLoadingMore) && (
          <LoadMoreContainer>
            <Spinner/>
          </LoadMoreContainer>
        )}
      </DataTable>
    </Screen>
  );
}

export default Home;
