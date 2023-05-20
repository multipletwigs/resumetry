"use client";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  VStack,
  InputGroup,
  InputLeftAddon,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FiFile, FiPaperclip } from "react-icons/fi";

interface FormInformation {
  name: string;
  resume: File | null;
  phoneNumber: string;
  email: string;
  coverLetter: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormInformation>({
    name: "",
    resume: null,
    phoneNumber: "",
    email: "",
    coverLetter: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
  };

  const handleSubmit = (formData: FormInformation) => {
    console.log(formData);

    // Logic to send form data to backend
  };

  return (
    <Box w="full">
      <VStack alignItems={"start"} gap="5">
        <FormControl flex="true" flexDir={"row"} id="resume">
          <HStack>
            <Button
              leftIcon={<FiPaperclip />}
              aria-label="Resume Submission"
              as="label"
            >
              Upload Resume
              <Input
                type="file"
                name="resume"
                onChange={handleFileChange}
                display={"none"}
                required
              />
            </Button>
            <Text size="lg">
              {formData.resume ? formData.resume.name : "No file selected"}
            </Text>
          </HStack>
          <Text fontSize="sm" mt="4" color={"gray.400"}>
            Accepted file types: .pdf | Max file size: 5MB
          </Text>
        </FormControl>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="phoneNumber">
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon children="+60" />
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="coverLetter">
          <FormLabel>Additional Cover Letter</FormLabel>
          <Textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={4}
          />
        </FormControl>
        <Button
          onClick={() => {
            handleSubmit(formData);
          }}
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Submit your application
        </Button>
      </VStack>
    </Box>
  );
};

export default Form;
