import { Box, Flex } from "@chakra-ui/react"

export const ResultBox = ({children}) => {
  return (
    <Flex p="6" bg="gray.200" borderRadius="lg">
      <Box>{children}</Box>
    </Flex>
  )
}