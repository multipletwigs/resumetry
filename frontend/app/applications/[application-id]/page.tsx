"use client";
import ChatItem from "@/components/ChatItem";
import { ApplicationData, APPLICATION_DATA } from "@/data/ApplicationData";
import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  Input,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface OpenAIChat {
  role: "system" | "user" | "assistant";
  content: string;
}

const fetchChat = async (
  applicationData: ApplicationData,
  messages: OpenAIChat[]
) => {
  const response = await fetch(`http://localhost:3000/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resume: applicationData.resumeParsed,
      jobName: applicationData.jobOpening.jobTitle,
      jobDescription: applicationData.jobOpening.jobDescription,
      messages: messages,
    }),
  });

  const data = await response.json();

  return data.completion;
};

const checkTermination = (message: string) => {
  // Check if message string contains underscore
  return message.includes("_");
};

const Page = () => {
  const params = useParams();
  const [applicationData, setApplicationData] = useState<
    ApplicationData | undefined
  >(undefined);
  const [chat, setChat] = useState<OpenAIChat[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const prompt =
    "You will ask me only 3 questions about my resume, one question at a time to me. You do not answer as a candidate. I will first provide you a resume, then you ask the question. When the user answered all the questions, respond with a thank you note and mention the recruiter will get back soon.";

  useEffect(() => {
    if (applicationData === undefined) {
      // Find the application with the correct id
      const application = APPLICATION_DATA.find(
        (application) =>
          application.applicationId === Number(params["application-id"])
      );
      setApplicationData(application);
    }

    if (applicationData !== undefined && chat.length === 0) {
      const jobInfo = `Job Title: ${applicationData.jobOpening.jobTitle} \n Job Description: ${applicationData.jobOpening.jobDescription}`;
      setChat([
        { role: "system", content: prompt },
        { role: "system", content: jobInfo },
        { role: "system", content: applicationData.resumeParsed },
      ]);

      fetchChat(applicationData, [
        { role: "system", content: prompt },
        { role: "system", content: jobInfo },
        { role: "system", content: applicationData.resumeParsed },
      ]).then((response) => {
        setChat((prev) => [...prev, response]);
        setIsLoading(false);
      });
    }
  }, [applicationData, chat, isLoading]);

  return (
    <VStack w="full">
      <Text fontSize={"2xl"} fontWeight={"700"}>
        {applicationData?.jobOpening.jobTitle}
      </Text>
      <Text textAlign={"center"} color="gray.500">
        {applicationData?.jobOpening.jobDescription}
      </Text>
      <Container
        py="10"
        maxW={"800px"}
        flex="column"
        mb={5}
        overflowY={"scroll"}
        h="65vh"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {chat
          .filter((item) => {
            return item.role !== "system";
          })
          .map((item, idx) => {
            return <ChatItem key={idx} message={item} />;
          })}
        {isLoading && (
          <Box>
            <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
          </Box>
        )}
      </Container>
      <HStack maxW="800px" w="full">
        <Input
          value={chatInput}
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          placeholder="Enter your message here!"
        />
        <Button
          isLoading={isLoading}
          loadingText={"Please wait"}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              console.log("Enter");
              setChat((prev) => [
                ...prev,
                { role: "user", content: chatInput },
              ]);
              setChatInput("");
              setIsLoading(true);
              fetchChat(applicationData!, chat).then((response) => {
                setChat((prev) => [...prev, response]);
              });
              setIsLoading(false);
            }
          }}
          onClick={async () => {
            setChat((prev) => [...prev, { role: "user", content: chatInput }]);
            setChatInput("");
            setIsLoading(true);
            await fetchChat(applicationData!, chat).then((response) => {
              setChat((prev) => [...prev, response]);
            });
            setIsLoading(false);
          }}
        >
          Send
        </Button>
      </HStack>
    </VStack>
  );
};
export default Page;
