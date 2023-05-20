import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { BsChatLeftText } from "react-icons/bs";
import React, { useEffect } from "react";
import { FormInformation } from "./FormSubmission";
import { COMPANIES, CompanyInfo } from "@/data/JobDescriptions";
import { useRouter } from "next/navigation";

export interface ApplicationData {
  formInformation: FormInformation;
  jobOpening: CompanyJobOpening;
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

const JobApplicationCard: React.FC<ApplicationData> = ({
  formInformation,
  jobOpening,
}) => {
  const [company, setCompany] = React.useState<CompanyInfo | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    if (company === undefined) {
      // Grab company information from jobOpening.id
      const company = COMPANIES.find((company) =>
        company.jobOpenings.some((job) => job.jobId === jobOpening.jobId)
      );
      setCompany(company);
    }
  });

  return (
    <Box
      border="1px solid #e2e8f0"
      maxW={"800px"}
      w="full"
      borderRadius="md"
      p={4}
    >
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Heading as="h2" size="sm">
            {jobOpening.jobTitle}
          </Heading>
          {formInformation.submittedOn && (
            <Badge variant={"subtle"}>
              Submitted on {formInformation.submittedOn.toLocaleDateString()}
            </Badge>
          )}
        </HStack>
        <Button
          aria-label={"Chat button to initiate virtual interview"}
          leftIcon={<BsChatLeftText />}
          onClick={() => {
            router.push(`/applications/${jobOpening.jobId}`);
          }}
          fontSize={"sm"}
        >
          Initiate Virtual Interview
        </Button>
      </HStack>
      {company && <Text color={"gray.500"}>{company.name}</Text>}
      <Text mt="5">{jobOpening.jobDescription}</Text>
    </Box>
  );
};

export default JobApplicationCard;
