import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../context/AuthContext'
import Card from "./Card"
import { Flex, Heading } from '@chakra-ui/react'

const CreditCards = () => {
  const { userId } = useContext(AuthContext)

  const getCreditCards = () => {
    const accessToken = localStorage.getItem("petexec_access_token")

    return fetch(`https://secure.petexec.net/api/user-card/owner/${userId}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
      .then(res => res.json())
      .then(data => data)
  }

  const { isLoading, data } = useQuery({
    queryKey: ["credit_cards"],
    queryFn: getCreditCards,
    enabled: !!userId,
  })

  return (
    <>
      <Heading>Credit Cards</Heading>
      {isLoading ? (
        <Flex>Loading...</Flex>
      ) : (
        <Flex flexDirection="column">
          {data.cards.map(card => <Card key={card.usercardid} card={card} />)}
        </Flex>
      )}
    </>
  )
}

export default CreditCards
