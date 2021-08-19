import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Text} from '@ui-kitten/components';
import {find} from 'lodash';
import {Screen} from '../../layouts';
import {useClients} from '../../hooks';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [gender, setGender] = useState<'male'|'female'|string>('');
  const [selectedClientId, setSelectedClientId] = useState<string|null>(null);
  const {
    results: clients,
    page,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    setPage,
  } = useClients({ gender, page: 1 });

  const selectedClient = find(clients, (client) => client.login.uuid === selectedClientId);
  const shouldRenderLoadMore = !isLoading && !isEmpty && !searchText;

  const filteredClients = () => {
    const keyword = searchText.toLowerCase();
    return clients.filter((client) => {
      return client.name.first.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.name.last.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.nat.toLowerCase().match(new RegExp(keyword, 'g')) ||
        client.email.toLowerCase().match(new RegExp(keyword, 'g'));
    });
  }

  return (
    <Screen>
      <Text>Home screen</Text>
    </Screen>
  );
}

export default Home;
