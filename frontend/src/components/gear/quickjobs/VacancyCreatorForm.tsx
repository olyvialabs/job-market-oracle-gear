import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

const VacancyCreatorForm = ({ onSubmit }: { onSubmit: (e: any) => void }) => {
  const toast = useToast();
  const [vacancy, setVacancy] = useState({
    vacancyName: "",
    vacancyType: "", // Initializing without default to ensure user selection
    price: "",
    category: "",
    subcategory: "",
    location: "",
    applicantsNumber: "",
    url: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVacancy({ ...vacancy, [name]: value });
  };

  const handleNumberChange = (
    valueAsString: string,
    valueAsNumber: any,
    name: any
  ) => {
    setVacancy({ ...vacancy, [name]: valueAsString });
  };

  const handleSubmit = () => {
    // Here, you would typically interact with your smart contract
    console.log("Vacancy to be created:", vacancy);
    toast({
      title: "Vacancy Prepared",
      description:
        "All values are ready for insertion into the smart contract.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    onSubmit(vacancy);

    // Reset form or navigate to another page as needed
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="vacancyName">Vacancy Name</FormLabel>
          <Input
            id="vacancyName"
            name="vacancyName"
            value={vacancy.vacancyName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="vacancyType">Vacancy Type</FormLabel>
          <Select
            id="vacancyType"
            name="vacancyType"
            value={vacancy.vacancyType}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Freelance">Freelance</option>
            <option value="Contractor">Contractor</option>
            <option value="PartTime">Part Time</option>
            <option value="FullTime">Full Time</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            onChange={(valueAsString, valueAsNumber) =>
              handleNumberChange(valueAsString, valueAsNumber, "price")
            }
          >
            <NumberInputField id="price" name="price" value={vacancy.price} />
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Input
            id="category"
            name="category"
            value={vacancy.category}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="subcategory">Subcategory</FormLabel>
          <Input
            id="subcategory"
            name="subcategory"
            value={vacancy.subcategory}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            name="location"
            value={vacancy.location}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="applicantsNumber">Applicants Number</FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            onChange={(valueAsString, valueAsNumber) =>
              handleNumberChange(
                valueAsString,
                valueAsNumber,
                "applicantsNumber"
              )
            }
          >
            <NumberInputField
              id="applicantsNumber"
              name="applicantsNumber"
              value={vacancy.applicantsNumber}
            />
          </NumberInput>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="url">URL</FormLabel>
          <Input
            id="url"
            name="url"
            value={vacancy.url}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          mt={4}
          backgroundColor={"black"}
          color="white"
          onClick={handleSubmit}
          w="100%"
        >
          💼 Create Vacancy
        </Button>
      </VStack>
    </Box>
  );
};

export default VacancyCreatorForm;
