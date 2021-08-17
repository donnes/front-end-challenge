import {VStack, Container} from '@chakra-ui/react';
import {Navbar} from '@/components';

const Page: React.FC = ({children}) => {
  return (
    <>
      <Navbar/>
      <VStack width="full" flex="1" paddingY="lg">
        <Container maxWidth="container.xl">
          {children}
        </Container>
      </VStack>
    </>
  );
}

export default Page;
