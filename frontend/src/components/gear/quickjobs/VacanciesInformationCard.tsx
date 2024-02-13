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
  const [isLoading, setIsLoading] = useState(false);
  const [vacancyDetails, setVacancyDetails] = useState<any>(null);
  const [searchedResults, setSearchedResults] = useState({
    error: "",
    message: "",
  });
  const metadata = ProgramMetadata.from(`${programMeta}`);
  const queryVacancy = async () => {
    setIsLoading(true);
    const query = `
    query {
      vacancy(id: "${vacancyId}") {
        id
        date
        price
        vacancyName
      }
    }
  `;

    const url = "https://api.subquery.network/sq/0xPasho/test-varav4";
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data); // See the console for the query result
        setVacancyDetails(result.data.vacancy as any);
        setSearchedResults({ message: "Success", error: "" });
      })
      .catch((error) => {
        setSearchedResults({ error, message: "" });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              <Button isLoading={isLoading} onClick={queryVacancy}>
                Query Vacancy
              </Button>
              {searchedResults.error ? (
                <span style={{ color: "red" }}>{searchedResults.error}</span>
              ) : null}
              {searchedResults.message ? (
                <span>
                  {vacancyDetails
                    ? vacancyDetails?.name
                    : "Nothing found with this ID"}
                </span>
              ) : null}
              {isLoading ? <span>Loading data...</span> : null}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export { VacanciesInformationCard };
