"use client";
import { CompanyInfo } from "@/data/JobDescriptions";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface CompanyCardProps {
  company: CompanyInfo;
}

const companyTypeStyleMap: any = {
  private: "orange",
  public: "teal",
  "non-profit": "blue",
};

const jobSeniorityStyleMap: any = {
  junior: "green",
  "mid-level": "purple",
  senior: "red",
};

const CompanyCard = (props: CompanyCardProps) => {
  const { name, location, industry, size, type, description, jobOpenings } =
    props.company;
  const router = useRouter();

  return (
    <VStack
      w="full"
      maxW={"800px"}
      borderWidth="1px"
      borderRadius="lg"
      py={6}
      px={4}
      gap={4}
    >
      <Box px={4} py={2}>
        <HStack alignItems={"center"} spacing={2}>
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Badge
            variant="subtle"
            colorScheme={companyTypeStyleMap[type.toLowerCase()]}
          >
            {type}
          </Badge>
        </HStack>
        <Text color="gray.500" fontSize="sm" mt={1}>
          {location}
        </Text>
        <Text color="gray.500" fontSize="sm">
          {industry} | {`${size} employees`}
        </Text>
        <Text mt={4}>{description}</Text>
      </Box>
      <Divider />
      <VStack w="full" align="start" spacing={4}>
        {jobOpenings.map((job) => (
          <Box
            rounded={"md"}
            onClick={() => {
              router.push(`/job-board/${job.jobId}`);
            }}
            w="full"
            px={4}
            py={2}
            key={job.jobTitle}
            _hover={{
              bg: "gray.100",
              cursor: "pointer",
            }}
          >
            <HStack>
              <Text fontWeight="bold" fontSize="md">
                {job.jobTitle}
              </Text>
              <Badge
                variant="subtle"
                colorScheme={
                  jobSeniorityStyleMap[job.jobSeniority.toLowerCase()]
                }
              >
                {job.jobSeniority}
              </Badge>
            </HStack>
            <Text color="gray.500" fontSize="sm">
              {job.jobLocation}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {job.jobType}
            </Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default CompanyCard;
