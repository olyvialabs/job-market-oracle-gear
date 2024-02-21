import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { categories, subcategories } from "data/categories";
import { VacancyLikes } from "pages/Vacancy/VacancyLikes";
import { useNavigate } from "react-router-dom";

type VacancyType = "Freelance" | "Contractor" | "PartTime" | "FullTime";

const vacancyTypeTitles: Record<VacancyType, string> = {
  Freelance: "Freelance",
  Contractor: "Contractor",
  PartTime: "Part Time",
  FullTime: "Full Time",
};

const VacancyCardContent = ({
  item,
  bigger,
  onRefresh,
}: {
  item: any;
  bigger?: boolean;
  onRefresh?: any;
}) => {
  const category = categories.find((c) => c.id === String(item.category));
  const subcategoryArray = subcategories[String(item.category)];
  const subcategory = subcategoryArray?.find(
    (sc) => sc.id === String(item.subcategory)
  );

  function getVacancyTypeTitle(value: VacancyType): string {
    return vacancyTypeTitles[value] || "Contractor";
  }

  const countOccurrences = (item.likes || []).reduce(
    (acc: any, { user }: any) => {
      acc[user] = acc[user] ? 0 : 1;
      return acc;
    },
    {}
  );

  // Filtrar direcciones que aparecen un número impar de veces y obtener sus claves (direcciones)
  const uniqueImparAddresses = Object.entries(countOccurrences)
    .filter(([_, count]) => (count as any) % 2 !== 0)
    .map(([address, _]) => address);

  return (
    <Stack spacing="3">
      {bigger ? (
        <Box display="flex" flexDir="row" justifyContent="space-between">
          <Heading size="lg" color="orange.400">
            {item.vacancyName}
          </Heading>
          <Box display="flex" flexDir="column">
            <VacancyLikes
              likes={item.likes}
              refresh={onRefresh}
              vacancyId={item.id}
            />
          </Box>
        </Box>
      ) : (
        <Heading size="lg" color="orange.400">
          {item.vacancyName}
        </Heading>
      )}

      <Text>{item.description}</Text>
      <Text fontWeight="bold" fontSize="xl">
        {getVacancyTypeTitle(item.vacancyType)} for ${"" + item.price}.
      </Text>
      <Text fontSize="lg">📍 Location: {item.location}</Text>
      {!bigger ? (
        <Text>
          {uniqueImparAddresses.length || 0} likes ·{" "}
          {item.comments?.length || 0} comments
        </Text>
      ) : null}
      <Box>
        {category && (
          <Tag size={"sm"} variant="outline" colorScheme="orange">
            {category.title}
          </Tag>
        )}
        {subcategory && (
          <Tag ml={2} size={"sm"} variant="outline" colorScheme="orange">
            {subcategory.title}
          </Tag>
        )}
      </Box>
    </Stack>
  );
};

const VacancyCard = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  const handleMoreInfoClick = () => {
    navigate("/vacancy/" + item.id);
  };

  return (
    <Card
      mt="6"
      borderColor="gray.300"
      onClick={handleMoreInfoClick}
      cursor="pointer"
    >
      <CardBody>
        <VacancyCardContent item={item} />
      </CardBody>
      <Divider borderColor="gray.300" />
      <CardFooter>
        <ButtonGroup spacing="2" flexWrap={"wrap"}>
          <Button
            variant="solid"
            colorScheme="orange"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = item.url;
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
          <Button
            variant="ghost"
            colorScheme="orange"
            onClick={(e) => {
              e.preventDefault();
              handleMoreInfoClick();
            }}
            leftIcon={
              <svg
                height={16}
                width={16}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#C05621"
                  d="m256 8c-136.957 0-248 111.083-248 248 0 136.997 111.043 248 248 248s248-111.003 248-248c0-136.917-111.043-248-248-248zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12z"
                />
              </svg>
            }
          >
            More information
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export { VacancyCard, VacancyCardContent };
