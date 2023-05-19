import { UserData } from '@/data/UserData'
import { Box, Avatar, Text, VStack } from '@chakra-ui/react'
import React from 'react'

interface SideProfileProps {
  user: UserData
}

const SideProfile = (props: SideProfileProps) => {
  return (
    // Side profile for a job applicant in chakra ui
    <VStack px={20}>
      <Avatar src="user-pfp.gif" size="md"/>
      <Text>Zach Khong</Text>
    </VStack>
  )
}

export default SideProfile