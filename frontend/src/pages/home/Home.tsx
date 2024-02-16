import { Box, Text } from "@chakra-ui/react";
import { PageInnerContent } from "components/page-display/components/PageInnerContent";
import { VacancyCard } from "components/gear/display-quickjob/VacancyCard";
import { useVacanciesData } from "pages/Vacancy/useVacanciesData";

function Home() {
  const { vacancies, loading } = useVacanciesData();

  return (
    <Box>
      <PageInnerContent title="Explore" />
      <Box px={4} pb={4}>
        {loading ? (
          <Box p={4}>
            <Text>Information is loading...</Text>
          </Box>
        ) : (
          vacancies.map((item) => <VacancyCard item={item} />)
        )}
      </Box>
    </Box>
  );
}

export { Home };
