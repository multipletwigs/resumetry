import { Avatar, Box } from '@chakra-ui/react'
import React from 'react'

export type ChatRole = 'system' | 'user' | 'assistant'
export interface ChatMessage{
  role: ChatRole;
  content: string;
}

export interface ChatItemProps {
  time: string;
  message: ChatMessage;
}

const ChatItem = (props: ChatItemProps) => {
  return (
    <Box>
      <Avatar name={props.message.role} />
      {props.message.content}
    </Box>
  )
}

export default ChatItem