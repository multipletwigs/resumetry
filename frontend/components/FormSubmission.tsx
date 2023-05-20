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
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FiPaperclip } from "react-icons/fi";
import { CompanyJobOpening } from "@/data/JobDescriptions";
import { APPLICATION_DATA } from "@/data/ApplicationData";
import { useResumeContext } from "@/context/ResumeContext";

interface FormProps {
  job: CompanyJobOpening;
}

export interface FormInformation {
  name: string;
  resume: File | null;
  phoneNumber: string;
  email: string;
  coverLetter: string;
  submittedOn: Date;
}

const Form = (props: FormProps) => {
  const [formData, setFormData] = useState<FormInformation>({
    name: "",
    resume: null,
    phoneNumber: "",
    email: "",
    coverLetter: "",
    submittedOn: new Date(),
  });

  const toast = useToast();
  const [_, setResume] = useResumeContext().useResume; 
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

  const handleSubmit = async (formData: FormInformation) => {
    // if any of the fields are empty, return
    if (
      // formData.name === "" ||
      formData.resume === null 
      // formData.phoneNumber === "" ||
      // formData.email === "" 
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
    const postFormData = new FormData(); 
    postFormData.append("file", formData.resume);
    
    const res = await fetch("http://127.0.0.1:5000/api/accounts/26d81d8a-1d26-4877-bc23-adc9488846c1/jobs/123/upload", {
      method: "POST",
      body: postFormData,
    })

    if (res.status === 200) {

      // Get JSON response
      const parsedResume = await res.json(); 

      // Save the parsed resume to a context variable
      setResume((prevResume) => [...prevResume, {
        resume: parsedResume.data,
        job: props.job,
      }]);

      APPLICATION_DATA.push({
        applicationId: APPLICATION_DATA.length + 1,
        formInformation: {...formData, submittedOn: new Date()},
        jobOpening: props.job,
        resumeParsed: parsedResume.data, 
      });

      // Toast success upload
      toast({
        title: "Resume uploaded",
        description: "Your resume has been parsed successfully. You may proceed with a virtual interview!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      
    } else {
      // Toast error
      toast({
        title: "Resume upload failed",
        description: "Your resume failed to upload. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setIsSubmitting(false);
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
          onClick={async () => {
            await handleSubmit(formData);
          }}
          mt={4}
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          Submit your application
        </Button>
      </VStack>
    </Box>
  );
};

export default Form;
