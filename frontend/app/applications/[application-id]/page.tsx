"use client";
import { ChatItemProps } from "@/components/ChatItem";
import { ApplicationData, APPLICATION_DATA } from "@/data/ApplicationData";
import { Box, VStack } from "@chakra-ui/react";
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
  console.log(data);

  return data.completion;
};

const Page = () => {
  const params = useParams();
  const [applicationData, setApplicationData] = useState<
    ApplicationData | undefined
  >(undefined);
  const [chat, setChat] = useState<OpenAIChat[]>([]);

  const prompt =
    "You will ask me only 3 questions about my resume, one question at a time to me. You do not answer as a candidate. I will first provide you a resume, then you ask the question. Once the interview is completed, respond with an underscore";

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
      });
    }
  }, [applicationData, chat]);

  return (
    <Box>
      <VStack h="80vh">
        {chat.filter((item)=>{
          return item.role !== 'system'
        }).map((item, idx)=>{
          return <Box key={idx}>{item.content}</Box>
        })}
      </VStack>
    </Box>
  );
};
export default Page;
