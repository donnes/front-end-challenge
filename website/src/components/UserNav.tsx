import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Avatar } from "@chakra-ui/react";

const UserNav: React.FC = () => {
  return (
    <Menu>
      <MenuButton>
        <Avatar width={38} height={38} backgroundColor="primary"/>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserNav;
