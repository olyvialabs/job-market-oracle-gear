import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { categories, subcategories } from "data/categories";

const VacancyCreatorForm = ({
  onSubmit,
}: {
  onSubmit: (e: any, cb: () => void) => void;
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [vacancy, setVacancy] = useState({
    vacancyName: "",
    vacancyType: "",
    price: "",
    category: "",
    subcategory: "",
    location: "",
    url: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setVacancy({ ...vacancy, [name]: value });
    if (name === "category") {
      setVacancy((prev) => ({ ...prev, subcategory: "" }));
    }
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
    setIsLoading(true);
    toast({
      title: "Vacancy Prepared",
      description:
        "All values are ready for insertion into the smart contract.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    onSubmit(vacancy, () => {
      setIsLoading(false);
    });

    // Reset form or navigate to another page as needed
  };

  return (
    <>
      <ModalBody>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isRequired>
              <FormLabel htmlFor="vacancyName">Vacancy Name</FormLabel>
              <Input
                id="vacancyName"
                name="vacancyName"
                value={vacancy.vacancyName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                name="description"
                value={vacancy.description}
                onChange={handleChange}
                placeholder="Enter the job description"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
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

            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="price">Price</FormLabel>
              <NumberInput
                defaultValue={0}
                min={0}
                onChange={(valueAsString, valueAsNumber) =>
                  handleNumberChange(valueAsString, valueAsNumber, "price")
                }
              >
                <NumberInputField
                  id="price"
                  name="price"
                  value={vacancy.price}
                />
              </NumberInput>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select
                id="category"
                name="category"
                value={vacancy.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="subcategory">Subcategory</FormLabel>
              <Select
                id="subcategory"
                name="subcategory"
                value={vacancy.subcategory}
                onChange={handleChange}
                isDisabled={!vacancy.category} // Disable until a category is selected
              >
                <option value="">Select a subcategory</option>
                {subcategories[vacancy.category]?.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                id="location"
                name="location"
                value={vacancy.location}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel htmlFor="url">URL</FormLabel>
              <Input
                id="url"
                name="url"
                value={vacancy.url}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="orange"
          mt={4}
          onClick={handleSubmit}
          w="100%"
          isLoading={isLoading}
        >
          💼 Create Vacancy
        </Button>
      </ModalFooter>
    </>
  );
};

export default VacancyCreatorForm;
