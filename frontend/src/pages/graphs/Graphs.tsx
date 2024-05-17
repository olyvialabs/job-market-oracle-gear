import {
  Box,
  Text,
  VStack,
  Select,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { PageInnerContent } from "components/page-display/components/PageInnerContent";
import { useVacanciesData } from "pages/Vacancy/useVacanciesData";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { categories, subcategories } from "data/categories";

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

const initialFilterData = {
  vacancyType: "",
  location: "",
  category: "",
  subcategory: "",
};
function Graphs() {
  const [currentOpened, setCurrentOopened] = useState<number | undefined>(0);
  const { vacancies, loading } = useVacanciesData();
  const [filters, setFilters] = useState(initialFilterData);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    if (filters.category) {
      setFilters((prevFilters) => ({ ...prevFilters, subcategory: "" }));
    }
  }, [filters.category]);

  const filteredVacancies = vacancies.filter((vacancy: any) => {
    return (
      (filters.vacancyType
        ? vacancy.vacancyType === filters.vacancyType
        : true) &&
      (filters.location ? vacancy.location === filters.location : true) &&
      (filters.category
        ? vacancy.category === parseInt(filters.category)
        : true) &&
      (filters.subcategory
        ? vacancy.subcategory === parseInt(filters.subcategory)
        : true)
    );
  });

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
              <Text fontSize="2xl" fontWeight="bold" color="orange.400">
                Vacancy Salary Ranges
              </Text>
              <Alert alignItems="start" rounded="lg" status="info">
                <div>
                  <AlertIcon />
                </div>
                This visualization provides insights into the distribution of
                salary ranges across all listed vacancies. It highlights the
                current market trends for compensation in various roles, aiding
                job seekers and employers in making informed decisions. Explore
                the graph to understand how salaries are distributed and to
                gauge the competitive landscape of job compensation.
              </Alert>
            </Box>
            <Accordion
              index={currentOpened}
              border="1px solid #d3d3d3"
              borderRadius="lg"
            >
              <AccordionItem border="none">
                <h2>
                  <AccordionButton
                    border="none"
                    onClick={() => {
                      setCurrentOopened(currentOpened ? 0 : 1);
                    }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      <span style={{ fontWeight: "bold", marginRight: 15 }}>
                        Filters
                      </span>
                      {(filters.category ||
                        filters.location ||
                        filters.subcategory ||
                        filters.vacancyType) && (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFilters(initialFilterData);
                          }}
                        >
                          Clear filters
                        </Button>
                      )}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                    <GridItem w="100%">
                      <label htmlFor="vacancyType">Vacancy Type</label>
                      <Select
                        name="vacancyType"
                        mt={2}
                        placeholder="All"
                        value={filters.vacancyType}
                        onChange={handleFilterChange}
                      >
                        <option value="FullTime">Full Time</option>
                        <option value="PartTime">Part Time</option>
                        <option value="Contract">Contract</option>
                      </Select>
                    </GridItem>
                    <GridItem w="100%">
                      <label htmlFor="location">Location</label>
                      <Select
                        name="location"
                        placeholder="All"
                        value={filters.location}
                        onChange={handleFilterChange}
                        mt={2}
                      >
                        <option value="Remote">Remote</option>
                        <option value="US">US</option>
                        <option value="Europe">Europe</option>
                      </Select>
                    </GridItem>
                    <GridItem w="100%">
                      <label htmlFor="category">Category</label>
                      <Select
                        name="category"
                        placeholder="All"
                        value={filters.category}
                        onChange={handleFilterChange}
                        mt={2}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                      </Select>
                    </GridItem>
                    <GridItem w="100%">
                      <label htmlFor="subcategory">Subcategory</label>
                      <Select
                        name="subcategory"
                        placeholder="All"
                        value={filters.subcategory}
                        onChange={handleFilterChange}
                        mt={2}
                        isDisabled={!filters.category}
                      >
                        {filters.category &&
                          subcategories[filters.category].map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                              {subcategory.title}
                            </option>
                          ))}
                      </Select>
                    </GridItem>
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Box w="100%">
              <SalaryRangeGraph vacancies={filteredVacancies} />
            </Box>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export { Graphs };
