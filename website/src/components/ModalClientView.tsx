import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  VStack,
  Heading,
  Avatar,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import {format} from 'date-fns';
import {Client} from "@/types";

type ModalClientViewProps = {
  isOpen: boolean;
  client?: Client;
  onClose: () => void;
};

const ModalClientView: React.FC<ModalClientViewProps> = ({ isOpen, client, onClose }) => {
  const fullName = `${client?.name.first} ${client?.name.last}`;
  const address = `${client?.location.street.name} ${client?.location.street.number}`

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent position="relative" padding="md">
        <ModalCloseButton
          position="absolute"
          right={4}
          top={4}
          onClick={onClose}
        />

        <VStack spacing="md" marginTop={-70}>
          <VStack align="center" justify="center" spacing="md">
            <Avatar size="2xl" name={fullName} src={client?.picture.medium}/>
            <Heading as="h4" size="md">
              {fullName}
            </Heading>
          </VStack>
          <List width="full" spacing="sm">
            <ListItem borderBottom="1px solid" borderColor="gray.300" paddingBottom="sm">
              <Text fontWeight="bold">Email:</Text>
              <Text>{client?.email}</Text>
            </ListItem>
            <ListItem borderBottom="1px solid" borderColor="gray.300" paddingBottom="sm">
              <Text fontWeight="bold">Gender:</Text>
              <Text>{client?.gender === 'male' ? 'Male' : 'Female'}</Text>
            </ListItem>
            <ListItem borderBottom="1px solid" borderColor="gray.300" paddingBottom="sm">
              <Text fontWeight="bold">Birth:</Text>
              <Text>{format(new Date(client?.dob.date || null), 'MM/dd/yyyy')}</Text>
            </ListItem>
            <ListItem borderBottom="1px solid" borderColor="gray.300" paddingBottom="sm">
              <Text fontWeight="bold">Phone:</Text>
              <Text>{client?.phone}</Text>
            </ListItem>
            <ListItem borderBottom="1px solid" borderColor="gray.300" paddingBottom="sm">
              <Text fontWeight="bold">Nationality:</Text>
              <Text>{client?.nat}</Text>
            </ListItem>
            <ListItem borderBottom="1px solid" borderColor="gray.300" paddingBottom="sm">
              <Text fontWeight="bold">Address:</Text>
              <Text>{address}</Text>
            </ListItem>
            <ListItem color="gray.600">
              <Text fontWeight="bold">ID:</Text>
              <Text>{client?.login.uuid}</Text>
            </ListItem>
          </List>
        </VStack>
      </ModalContent>
    </Modal>
  );
}

export default ModalClientView;
