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
  useToast,
} from "@chakra-ui/react";
import { FiFile, FiPaperclip } from "react-icons/fi";
import { CompanyJobOpening } from "@/data/JobDescriptions";
import { APPLICATION_DATA } from "@/data/ApplicationData";

interface FormProps {
  job: CompanyJobOpening;
}

export interface FormInformation {
  name: string;
  resume: File | null;
  phoneNumber: string;
  email: string;
  coverLetter: string;
  submittedOn?: Date;
}

const Form = (props: FormProps) => {
  const [formData, setFormData] = useState<FormInformation>({
    name: "",
    resume: null,
    phoneNumber: "",
    email: "",
    coverLetter: "",
  });

  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    // if any of the fields are empty, return
    if (
      formData.name === "" ||
      formData.resume === null ||
      formData.phoneNumber === "" ||
      formData.email === "" 
    ) {
      toast({
        title: "Form incomplete",
        description: "There are fields that are empty. Please ensure everything is filled in.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsSubmitting(true);
    APPLICATION_DATA.push({
      formInformation: formData,
      jobOpening: props.job,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
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
                accept=".pdf"
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
            <InputLeftAddon>+60</InputLeftAddon>
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
          isLoading={isSubmitting}
        >
          Submit your application
        </Button>
      </VStack>
    </Box>
  );
};

export default Form;
