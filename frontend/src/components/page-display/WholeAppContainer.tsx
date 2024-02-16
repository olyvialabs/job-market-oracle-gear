import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Sidenav } from "./components/Sidenav";
import { Account } from "components/layout/header/account";

function WholeAppContaniner({ children }: { children: React.ReactNode }) {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={0} h={138}>
      <GridItem
        display={{ base: "none", md: "block" }}
        colSpan={{ base: 0, md: 1 }}
        borderRight={"1px solid var(--chakra-colors-chakra-border-color)"}
      >
        <Sidenav />
      </GridItem>
      <GridItem colSpan={{ base: 5, md: 3 }}>{children}</GridItem>
      <GridItem
        display={{ base: "none", md: "block" }}
        colSpan={{ base: 0, md: 1 }}
        minH="100vh"
        borderLeft={"1px solid var(--chakra-colors-chakra-border-color)"}
      >
        <Box
          pb={3.5}
          px={2}
          borderBottom={"1px solid var(--chakra-colors-chakra-border-color)"}
        >
          <Text fontSize="xl" mt={4} fontWeight="semibold">
            Account
          </Text>
        </Box>
        <Box display={"flex"} flexDir="column" p={2}>
          <Account />
          <Box w="100%" flex={1} mt={12}>
            <Text fontWeight="bold" fontSize="lg">
              Powered by
            </Text>
            <Box flex={1} display="flex" flexDir="row">
              <a href="https://vara.network/">
                <Image
                  w={10}
                  h={10}
                  src="https://img.cryptorank.io/coins/vara_network1695313579900.png"
                />
              </a>
              <a href="https://gear-tech.io/">
                <Image
                  w={12}
                  h={12}
                  src="https://miro.medium.com/v2/resize:fit:2400/1*qYGZ6sP8phkHii-kTU7sgA.png"
                />
              </a>
            </Box>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
}

export { WholeAppContaniner };
