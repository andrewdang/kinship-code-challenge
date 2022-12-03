import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const UserProfile = () => {
  const getProfile = () => {
    const accessToken = localStorage.getItem("petexec_access_token")

    return fetch("https://secure.petexec.net/api/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => data)
  }

  const { isLoading, data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  return (
    <>
      <Heading>Profile</Heading>
      <TableContainer mb={10}>
        <Table variant='simple'>
          <Tbody>
            <Tr>
              <Td>User ID</Td>
              <Td>{isLoading ? "loading..." : user.userid}</Td>
            </Tr>
            <Tr>
              <Td>First Name</Td>
              <Td>{isLoading ? "loading..." : user.firstname}</Td>
            </Tr>
            <Tr>
              <Td>Last Name</Td>
              <Td>{isLoading ? "loading..." : user.lastname}</Td>
            </Tr>
            <Tr>
              <Td>Company Name</Td>
              <Td>{isLoading ? "loading..." : user.companyname}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserProfile
