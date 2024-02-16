import { Box, Button, Text } from "@chakra-ui/react";
import { GearApi, ProgramMetadata } from "@gear-js/api";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { VacancyCardContent } from "components/gear/display-quickjob/VacancyCard";
import { PageInnerContent } from "components/page-display/components/PageInnerContent";
import { programIDFT, programMeta } from "consts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useVacanciesData } from "./useVacanciesData";

function VacancyInformation() {
  let { id } = useParams();
  const { vacancies, loading } = useVacanciesData();

  if (loading) {
    return (
      <Box>
        <PageInnerContent title="Vacancy Information" goBack />
        <Box p={4}>
          <Text textAlign="center">Vacancy is loading...</Text>
        </Box>
      </Box>
    );
  }

  console.log({ vacancies });
  const vacancyItem = vacancies.find(
    (item: any) => item.id === parseInt(id as unknown as any)
  );

  if (!vacancyItem) {
    return (
      <Box>
        <PageInnerContent title="Vacancy Information" goBack />
        <Box p={4}>
          <Text textAlign="center">Nothing found with this ID...</Text>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <PageInnerContent title="Vacancy Information" goBack />
      <Box p={{ base: 6, md: 10 }}>
        <VacancyCardContent item={vacancyItem} />
        <Button
          w="100%"
          mt={8}
          variant="solid"
          colorScheme="orange"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = (vacancyItem as any).url;
          }}
          leftIcon={
            <svg
              style={{ marginTop: 3 }}
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m5 2c.55228 0 1 .44772 1 1s-.44772 1-1 1h-1v8h8v-1c0-.5523.4477-1 1-1s1 .4477 1 1v1c0 1.1046-.8954 2-2 2h-8c-1.10457 0-2-.8954-2-2v-8c0-1.10457.89543-2 2-2zm10-1v4.99814453c0 .55229-.4477 1-1 1s-1-.44771-1-1v-1.58395453l-4.28429 4.28427c-.39052.39053-1.02369.39053-1.41421 0-.39053-.39052-.39053-1.02369 0-1.41421l4.2843-4.28425h-1.58960859c-.55228 0-1-.44772-1-1s.44772-1 1-1z"
                fillRule="evenodd"
                color="white"
                fill="white"
              />
            </svg>
          }
        >
          Apply now
        </Button>
      </Box>
    </Box>
  );
}

export { VacancyInformation };
