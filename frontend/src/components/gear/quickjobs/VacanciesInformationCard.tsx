import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import styles from "../../layout/cards/Card.module.scss";
import { programIDFT, programMeta, varaAddress } from "consts";
import { GearApi, ProgramMetadata } from "@gear-js/api";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useState } from "react";

function VacanciesInformationCard() {
  const { account } = useAccount();
  const { api } = useApi();

  const [vacancyId, setVacancyId] = useState("");
  const [vacancyDetails, setVacancyDetails] = useState(null);
  const metadata = ProgramMetadata.from(`${programMeta}`);
  const queryVacancy = async () => {
    api.programState
      .read(
        {
          programId: programIDFT,
          payload: "",
        },
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
    <Box className={styles.Moduleborderwrap}>
      <Box className={styles.module}>
        <Heading>Vacancies Data</Heading>
        <Text fontWeight="light">List of created vacancies</Text>
        <Flex mt="1rem">
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
            <VStack spacing={4}>
              <Input
                placeholder="Enter Vacancy ID"
                value={vacancyId}
                onChange={(e) => setVacancyId(e.target.value)}
              />
              <Button onClick={queryVacancy}>Query Vacancy</Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export { VacanciesInformationCard };
