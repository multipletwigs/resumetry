"use client";

import { Container, Input, Stack, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    // Centered container
    <Stack
      direction="column"
      spacing="0"
      align="center"
      justify="center"
      gap="5"
      minH="100vh"
    >
      <Container maxW="700px" centerContent gap="5">
        <Text fontSize={"2xl"} fontWeight={"700"}>Hi Hackoyaki</Text>
        <Tag size="lg" variant="subtle" colorScheme="green">Hi there guys! Lappy here hehe</Tag>
        <Input placeholder="Type here..." size="lg" width="400px" />
      </Container>
    </Stack>
  );
}
