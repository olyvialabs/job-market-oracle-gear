import {
  Box,
  Text,
  Center,
  Heading,
  Container,
  Stack,
  Flex,
  Image,
  Grid,
} from "@chakra-ui/react";
import { useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";
import { useAccount, useAlert } from "@gear-js/react-hooks";

import { DepositFunds } from "components/gear/DepositFunds";
import { CollateralBalanceToken } from "components/gear/CollateralBalance";
import { ReadState } from "components/gear/ReadState";
import { Blocknumber } from "components/gear/blockNumber";
import { CardDeposit } from "components/layout/cards/CardDeposit";

import { DepositSynthetic } from "components/gear/DepositSynthetic";
import { UserLockedBalances } from "components/gear/UserLockedBalances";

import { Footer } from "pages/home/sections/Footer";
import { WithdrawFunds } from "components/gear/WithdrawFunds";
import Shilling from "../../assets/images/backgrounds/Vara shillingBG.svg";
import BgFooter from "../../assets/images/Liquid Footer.svg";
import { VacancyCreatorCard } from "components/gear/quickjobs/VacancyCreatorCard";
import QueryVacancy from "components/gear/quickjobs/VacancyQueryCard";
import { VacanciesInformationCard } from "components/gear/quickjobs/VacanciesInformationCard";

function Dapp() {
  return (
    <Container p="0" maxW="100vw">
      <Box /*bgRepeat="no-repeat" bgPos="center"*/>
        {/* <Flex
          border="1px"
          borderBottomColor="#4FFF4B"
          p="1rem"
          justify="space-evenly"
          // bgImage={BgFooter}
        >
          <Blocknumber />
          <ReadState />
        </Flex>  //bgImage={Shilling} bgSize="cover" bgRepeat="no-repeat">  */}
        <Box w="100%">
          <Grid templateColumns="repeat(2, 1fr) " gap={6}>
            <VacancyCreatorCard />
            <VacanciesInformationCard />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export { Dapp };
