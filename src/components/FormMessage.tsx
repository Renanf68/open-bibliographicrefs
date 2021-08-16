import React from "react"
import { Box, Text, Icon } from "@chakra-ui/react"

interface FormMsgProps {
  type: number
  message: string
}

export const FormMessage = ({ type, message }: FormMsgProps) => {
  return (
    <Box
      w="100%"
      backgroundColor={type === 1 ? "#F0FFF4" : "#FEFCBF"}
      mt="1rem"
      py="1rem"
      px="2rem"
      borderRadius="sm"
    >
      <Text
        as="p"
        fontSize="sm"
        fontWeight="bold"
        color={type === 1 ? "#38A169" : "#000"}
      >
        {type === 1 ? (
          <Icon name="check" mr="1rem" mb="0.2rem" />
        ) : (
          <Icon name="info-outline" mr="1rem" mb="0.2rem" />
        )}
        {message}
      </Text>
    </Box>
  )
}