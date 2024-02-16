import { Box, Text, VStack } from "@chakra-ui/react";
import { PageInnerContent } from "components/page-display/components/PageInnerContent";
import { VacancyCard } from "components/gear/display-quickjob/VacancyCard";
import { useVacanciesData } from "pages/Vacancy/useVacanciesData";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const SalaryRangeGraph = ({ vacancies }: any) => {
  // Calculate salary ranges
  const salaryBuckets = vacancies.reduce((acc: any, { price }: any) => {
    const bucket = Math.floor(price / 10000) * 10000; // Group by every 10,000
    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(salaryBuckets).map(
      (bucket) => `$${bucket} - $${parseInt(bucket) + 9999}`
    ),
    datasets: [
      {
        label: "Number of Vacancies",
        data: Object.values(salaryBuckets),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "#FFA500",
        font: {
          size: 20,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

function Graphs() {
  const { vacancies, loading } = useVacanciesData();

  return (
    <Box>
      <PageInnerContent title="Graphs" />
      <Box px={4} pb={4}>
        {loading ? (
          <Box p={4}>
            <Text>Information is loading...</Text>
          </Box>
        ) : (
          <VStack spacing={4} mt={4} align="stretch" w="100%">
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="orange.400"
                textAlign="center"
              >
                Vacancy Salary Ranges
              </Text>
              <Text fontSize="md" mt={2} textAlign="center">
                This visualization provides insights into the distribution of
                salary ranges across all listed vacancies. It highlights the
                current market trends for compensation in various roles, aiding
                job seekers and employers in making informed decisions. Explore
                the graph to understand how salaries are distributed and to
                gauge the competitive landscape of job compensation.
              </Text>
            </Box>
            <Box w="100%">
              <SalaryRangeGraph vacancies={vacancies} />
            </Box>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export { Graphs };
