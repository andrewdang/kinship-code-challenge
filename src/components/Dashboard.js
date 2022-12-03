import React from 'react'
import { Box } from '@chakra-ui/react'
import UserProfile from './UserProfile'
import CreditCards from './CreditCards'

const Dashboard = () => {
  return (
    <Box>
      <UserProfile />
      <CreditCards />
    </Box>
  )
}

export default Dashboard
