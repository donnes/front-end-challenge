import {VStack, HStack, Container} from '@chakra-ui/react';
import UserNav from './UserNav';

const Navbar: React.FC = () => {

  return (
    <VStack
      boxShadow="base"
      backgroundColor="white"
    >
      <Container maxWidth="container.xl">
        <HStack
          height="16"
          align="center"
          justify="space-between"
        >
          <img src="/coodesh-logo.svg" width={110}/>

          <UserNav/>
        </HStack>
      </Container>
    </VStack>
  );
}

export default Navbar;
