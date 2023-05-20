"use client";
import React from "react";
import { COMPANIES, CompanyInfo } from "@/data/JobDescriptions";
import CompanyCard from "@/components/CompanyItem";
import { Box, VStack, Text } from "@chakra-ui/react";

const page = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        Job Board
      </Text>
      <Text fontSize="md" color={"gray.400"} mb={8} textAlign="center">
        Here&apos;s a list of companies that are hiring!
      </Text>
      <VStack gap={4} mx={5}>
        {COMPANIES.map((company: CompanyInfo) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </VStack>
    </Box>
  );
};

export default page;
