"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

interface NavItem {
  name: string;
  href: string;
  isActive: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Job Board",
    href: "/job-board",
    isActive: false,
  },
  {
    name: "Applications",
    href: "/applications",
    isActive: false,
  },
  {
    name: "Interviews",
    href: "#",
    isActive: false,
  },
];

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const router = useRouter();
  const pathname = usePathname();

  // Based on router pathname, set the active nav item
  const navItemsWithActive = navItems.map((item) => {
    return {
      ...item,
      isActive: pathname === item.href,
    };
  });

  return (
    <Box as="section" pb={12}>
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <Container maxW="90%" py={{ base: "4", lg: "5" }}>
          <HStack spacing="10" justifyContent={"space-between"}>
            <Box>resumetry</Box>
            {isDesktop ? (
              <Flex justify="space-between">
                <ButtonGroup variant="link" spacing="8">
                  {navItemsWithActive.map((item: NavItem) => (
                    <Button
                      px={4}
                      py={2}
                      bg={item.isActive ? "blue.100" : "none"}
                      color={item.isActive ? "blue.700" : "blue.500"}
                      onClick={() => {
                        router.push(item.href);
                      }}
                      key={item.name}
                      _hover={{
                        bg: "blue.100",
                        underline: "none",
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </ButtonGroup>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
            <HStack
              spacing="3"
              display={{
                base: "none",
                lg: "flex",
              }}
            >
              <Avatar src="user-pfp.gif" size="md" />
              <Box>
                <Box fontWeight="semibold">Zach Khong</Box>
                <Box fontSize="sm" color="text-secondary">
                  Candidate
                </Box>
              </Box>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;
