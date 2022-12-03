import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Flex,
  Box,
  Button,
} from '@chakra-ui/react'

const CreditCards = ({ card }) => {
  const { cardname, card_num, usercardid } = card
  const queryClient = useQueryClient()

  const deleteCardFn = () => {
    const accessToken = localStorage.getItem("petexec_access_token")

    return fetch(`https://secure.petexec.net/api/user-card/${usercardid}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(data => data)
  }

  const { mutate: deleteCard } = useMutation({
    mutationFn: deleteCardFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["credit_cards"] }),
    onError: () => alert("could not delete card")
  })

  return (
    <Flex py={4} justifyContent="space-between">
      <Box>
        <strong>{cardname}</strong> {card_num}
      </Box>
      <Button
        onClick={deleteCard}
        size="sm"
        colorScheme="red"
      >
        Delete
      </Button>
    </Flex>
  )
}

export default CreditCards
