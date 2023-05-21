import { Avatar, Box, HStack, Badge } from '@chakra-ui/react'
import React from 'react'

export type ChatRole = 'system' | 'user' | 'assistant'
export interface ChatMessage{
  role: ChatRole;
  content: string;
}

export interface ChatItemProps {
  message: ChatMessage;
}

const roleMap: any = { 
  assistant: "Resumetry",
  user: "Zach Khong",
}

const roleVariantMap: any = {
  system: "purple",
  user: "blue",
  assistant: "green",
}

const ChatItem = (props: ChatItemProps) => {
  return (
    <Box bg={props.message.role === 'assistant' ? 'gray.100' : 'white'} py={4} px={2} rounded={'lg'}>
      <HStack>
        <Box fontWeight="bold">{roleMap[props.message.role]}</Box>
        <Badge variant={'subtle'} colorScheme={roleVariantMap[props.message.role]}>{props.message.role}</Badge>
      </HStack>
      {props.message.content}
    </Box>
  )
}

export default ChatItem