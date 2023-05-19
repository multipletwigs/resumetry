"use client";

import { COMPANIES, CompanyJobOpening } from "@/data/JobDescriptions";
import { Container, Input, Stack, Tag, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const params = useParams();
  const [jobItem, setJobItem] = useState<CompanyJobOpening | undefined>(undefined)

  useEffect(()=>{
    if (params.jobId) {
      const jobItem = COMPANIES.flatMap((company) => company.jobOpenings).find((job) => job.jobId === Number(params.jobId));
      setJobItem(jobItem);
    }
  }, [])

  return (
    // Centered container
    <Stack
      direction="column"
      spacing="0"
      align="center"
      justify="center"
      gap="5"
    >
      <Container maxW="700px" centerContent gap="5">
        <Text fontSize={"2xl"} fontWeight={"700"}>Hi Hackoyaki</Text>
        <Tag size="lg" variant="subtle" colorScheme="green">Hi there guys! Lappy here hehe {jobItem?.jobTitle}</Tag>
        <Input placeholder="Type here..." size="lg" width="400px" />
      </Container>
    </Stack>
  );
}
