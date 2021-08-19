import React, {useState} from 'react';
import Constants from 'expo-constants';
import {useAssets} from 'expo-asset';
import {
  TopNavigation,
  TopNavigationAction,
  MenuItem,
  OverflowMenu,
  useTheme
} from '@ui-kitten/components';
import {Ionicons} from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${Constants.statusBarHeight + 64}px;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: ${Constants.statusBarHeight}px;
  box-shadow: 0px 2px 1px rgba(0,0,0,0.22);
  background-color: white;
`;

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 120px;
`;

const TopBar: React.FC = () => {
  const theme = useTheme();
  const [menuVisible, toggleMenu] = useState<boolean>(false);
  useAssets([require('../../assets/coodesh-logo.png')]);

  const renderTitle = () => (
    <Image source={require('../../assets/coodesh-logo.png')}/>
  );

  const renderMenuAction = () => (
    <TopNavigationAction
      icon={() => (
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={theme['color-primary-500']}
        />
      )}
      onPress={() => toggleMenu(!menuVisible)}
    />
  );

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={() => toggleMenu(!menuVisible)}
      >
        <MenuItem
          accessoryLeft={(props) => <Ionicons {...props} size={22} name="person-outline" />}
          title="My Account"
        />
        <MenuItem
          accessoryLeft={(props) => <Ionicons {...props} size={22} name="exit-outline" />}
          title="Logout"
        />
      </OverflowMenu>
    </React.Fragment>
  );

  return (
    <Container>
      <TopNavigation
        title={renderTitle}
        accessoryRight={renderOverflowMenuAction}
      />
    </Container>
  );
}

export default TopBar;
