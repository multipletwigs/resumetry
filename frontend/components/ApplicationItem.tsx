import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export interface ApplicationData {
  formInformation: FormInformation;
  jobOpening: CompanyJobOpening;
}

export interface FormInformation {
  name: string;
  resume: File | null;
  phoneNumber: string;
  email: string;
  coverLetter: string;
}

export interface CompanyJobOpening {
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string[];
  jobType: string;
  jobSeniority: string;
  jobLocation: string;
  jobSalary: number;
}

const JobApplicationCard: React.FC<ApplicationData> = ({ formInformation, jobOpening }) => {
  return (
    <Box
      border="1px solid #e2e8f0"
      borderRadius="md"
      p={4}
    >
      <Heading as="h2" size="md" mb={2}>
        {jobOpening.jobTitle}
      </Heading>
    </Box>
  );
};

export default JobApplicationCard;