import React, {useState} from 'react';
import Constants from 'expo-constants';
import {useNavigation} from '@react-navigation/native';
import {
  TopNavigation,
  TopNavigationAction,
  MenuItem,
  OverflowMenu,
  TopNavigationProps,
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

interface TopBarProps extends TopNavigationProps {
  hasBack: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ hasBack = false, ...props }) => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const [menuVisible, toggleMenu] = useState<boolean>(false);

  const BackAction = () => (
    <TopNavigationAction
      onPress={goBack}
      icon={(props) => <Ionicons {...props} name="arrow-back" size={24} />}
    />
  );

  const renderMenuAction = () => (
    <TopNavigationAction
      onPress={() => toggleMenu(!menuVisible)}
      icon={() => (
        <Ionicons
          name="person-circle-outline"
          size={40}
          color={theme['color-primary-500']}
        />
      )}
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
        {...props}
        style={{flex: 1}}
        alignment="center"
        accessoryLeft={hasBack ? BackAction : undefined}
        accessoryRight={renderOverflowMenuAction}
      />
    </Container>
  );
}

export default TopBar;
