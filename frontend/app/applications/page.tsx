'use client'

import JobApplicationCard from '@/components/ApplicationItem'
import { APPLICATION_DATA, ApplicationData } from '@/data/ApplicationData'
import { VStack, Text, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const page = () => {

  const [applicationData, setApplicationData] = React.useState<ApplicationData[] | null>(null)

  useEffect(()=>{
    if(applicationData === null){
      setApplicationData(APPLICATION_DATA)
    }
  })

  return (
    <VStack>
      <Box>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        Applications
      </Text>
      <Text fontSize="md" color={"gray.400"} mb={8} textAlign="center">
        Here are the companies that have received your application!
      </Text>
      </Box>
      {
        applicationData && applicationData.map((application: ApplicationData) => (
          <JobApplicationCard {...application} />
        ))
      }
    </VStack>
  )
}

export default page
