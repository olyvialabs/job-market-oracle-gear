import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const truncateAddress = (address: string) => {
  const start = address.slice(0, 6);
  const end = address.slice(-4);
  return `${start}...${end}`;
};

const LikesListModal = ({
  likesQuantity,
  likes,
}: {
  likesQuantity: number;
  likes: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000); // Convertir timestamp a milisegundos
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const uniqueData = (likes || []).reduce((acc: any, current: any) => {
    // Contar las ocurrencias primero
    const occurrences = (likes || []).reduce((acc: any, { user }: any) => {
      acc[user] = (acc[user] || 0) + 1;
      return acc;
    }, {});

    // Filtrar por usuarios con un número impar de "likes"
    const imparLikesUsers = Object.entries(occurrences)
      .filter(([_, count]) => (count as any) % 2 !== 0)
      .map(([user, _]) => user);

    // Añadir la entrada actual si el usuario está en imparLikesUsers y no ha sido añadido aún
    if (
      imparLikesUsers.includes(current.user) &&
      !acc.some(({ user }: any) => user === current.user)
    ) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <>
      <Button
        variant="link"
        mt={2}
        fontSize="sm"
        textAlign="center"
        onClick={onOpen}
      >
        Liked by {likesQuantity}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Liked by</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {!uniqueData.length ? (
                <Text>Nobody has liked this vacancy...</Text>
              ) : (
                uniqueData.map((item: any, index: any) => (
                  <ListItem
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => {}}
                    cursor="pointer"
                  >
                    <Box flexDir="row" display="flex">
                      <Tooltip label={item.user} aria-label="the user address">
                        <Text fontWeight="bold" cursor="pointer">
                          ♥️ {truncateAddress(item.user)}
                        </Text>
                      </Tooltip>
                    </Box>
                  </ListItem>
                ))
              )}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LikesListModal;
