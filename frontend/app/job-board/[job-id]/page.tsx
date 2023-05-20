"use client";

import Form from "@/components/FormSubmission";
import {
  COMPANIES,
  CompanyInfo,
  CompanyJobOpening,
} from "@/data/JobDescriptions";
import {
  Box,
  Container,
  Input,
  OrderedList,
  Skeleton,
  ListItem,
  SkeletonText,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface JobDisplay {
  company: CompanyInfo | undefined;
  job: CompanyJobOpening | undefined;
}

const jobSeniorityStyleMap: any = {
  junior: "green",
  "mid-level": "purple",
  senior: "red",
};

export default function Home() {
  const params = useParams();
  const [jobItem, setJobItem] = useState<JobDisplay | null>(null);

  useEffect(() => {
    // Searching for the correct job from list of companies
    if (jobItem === null) {
      // Find company with job opening
      const company = COMPANIES.find((company) =>
        company.jobOpenings.some(
          (job) => job.jobId === Number(params["job-id"])
        )
      );

      const jobItem = COMPANIES.flatMap((company) => company.jobOpenings).find(
        (job) => job.jobId === Number(params["job-id"])
      );
      setJobItem({
        company: company,
        job: jobItem,
      });
    }
  }, [jobItem]);

  return (
    // Centered container
    jobItem &&
    jobItem.company &&
    jobItem.job && (
      <Stack
        direction="column"
        spacing="0"
        align="center"
        justify="center"
        gap="5"
        mx="5"
      >
        <Container maxW="700px" centerContent gap="5">
          <SkeletonText isLoaded={jobItem !== null}>
            <Text fontSize={"2xl"} fontWeight={"700"}>
              {jobItem.job.jobTitle}
            </Text>
            <Text textAlign={"center"} color="gray.500">
              {jobItem.company.name}
            </Text>
          </SkeletonText>
          <Tag
            size="lg"
            variant="subtle"
            colorScheme={
              jobSeniorityStyleMap[jobItem.job.jobSeniority.toLowerCase()]
            }
          >
            {jobItem.job.jobSeniority} Level
          </Tag>
          <VStack alignItems={'start'} w="full" gap="5">
            <Box>
              <Text fontSize={"md"} fontWeight={"700"}>
                About the company
              </Text>
              <Text textAlign={'justify'} fontSize={"md"}>{jobItem.company.description}</Text>
            </Box>

            <Box>
              <Text textAlign={'justify'} fontSize={"md"} fontWeight={"700"}>
                About the job
              </Text>
              <Text fontSize={"md"}>{jobItem.job.jobDescription}</Text>
            </Box>

            <Box w="full">
              <Text fontSize={"md"} fontWeight={"700"}>
                Requirements for the job
              </Text>
              <OrderedList fontSize={"md"}>{
                jobItem.job.jobRequirements.map((requirement, idx) => (
                  <ListItem key={idx}>{requirement}</ListItem>
                ))
              }</OrderedList>
            </Box>
          </VStack>
          <VStack w="full">
            <Form/>
          </VStack>
        </Container>
      </Stack>
    )
  );
}
