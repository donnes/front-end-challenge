import React from 'react';
import {Avatar, ListItem, Divider} from '@ui-kitten/components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {format} from 'date-fns';
import {Screen} from '../../layouts';
import {RootStackParamList} from '../../types';

import {Header, Name, List} from './styles';

type ClientScreenRouteProp = RouteProp<RootStackParamList, 'Client'>;

const ClientScreen: React.FC = () => {
  const route = useRoute<ClientScreenRouteProp>();
  const {client} = route.params;

  const listData = [
    {title: 'Email', description: client.email},
    {title: 'Gender', description: client.gender === 'male' ? 'Male' : 'Female'},
    {title: 'Birth', description: format(new Date(client.dob.date), 'MM/dd/yyyy')},
    {title: 'Phone', description: client.phone},
    {title: 'Nationality', description: client.nat},
    {title: 'Address', description: `${client.location.street.name} ${client.location.street.number}`},
    {title: 'ID', description: client.login.uuid},
  ]

  const renderItem = ({item}: any) => (
    <ListItem
      title={item.title}
      description={item.description}
    />
  );

  return (
    <Screen hasBack>
      <Header>
        <Avatar size="giant" source={{uri: client.picture.large}}/>
        <Name>
          {`${client.name.first} ${client.name.last}`}
        </Name>
      </Header>

      <List
        data={listData}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Screen>
  );
}

export default ClientScreen;
