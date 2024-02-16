import React, { useEffect, useState } from "react";
import { useAccount, useAlert, useApi } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { programIDFT, programMeta } from "consts";
import {
  HexString,
  ProgramMetadata,
  StateMetadata,
  getStateMetadata,
} from "@gear-js/api";
import styles from "../../layout/cards/Card.module.scss";
import { useNavigate } from "react-router-dom";
//import stateWasm from "./../../../assets/state/nft_state.meta.wasm";

const QueryVacancy = () => {
  const { account } = useAccount();
  const { api } = useApi();
  const [vacancyId, setVacancyId] = useState("");
  const [vacancyDetails, setVacancyDetails] = useState(null);
  const metadata = ProgramMetadata.from(`0x${programMeta}`);
  const queryVacancy = async () => {
    window.location.href = "/vacancy/" + vacancyId;
    return;
    api.programState
      .read(
        {
          programId: programIDFT,
          payload: null, //{ vacancies: null },
        } as any,
        metadata
        // {
        //   programId: programIDFT,
        //   wasm: contractBuffer as any,
        //   payload: "0x",
        //   fn_name: "vacancy_info",
        //   argument: 0,
        // },
        // stateMetadata as any,
        // metadata as any
      )
      //.then((codec) => codec.toHuman() as any)
      .then((result) => {
        console.log({ result });
        console.log({ result });
        console.log({ result });
      })
      .catch(({ message }: Error) => console.log({ message }));
  };

  console.log({ vacancyDetails });
  return (
    <>
      <ModalBody>
        <Input
          placeholder="Enter Vacancy ID"
          value={vacancyId}
          ringColor="orange.400"
          focusBorderColor="orange.400"
          onChange={(e) => setVacancyId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              queryVacancy();
            }
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="orange" w="100%" onClick={queryVacancy}>
          🧐 Search Vacancy
        </Button>
      </ModalFooter>
    </>
  );
};

export default QueryVacancy;
