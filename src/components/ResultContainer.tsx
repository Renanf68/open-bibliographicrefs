import { Box, Heading, Text } from "@chakra-ui/react"

export const ResultContainer = ({children}) => {
  return (
    <Box
      mt="4"
      w="100%"
      p="8"
      borderWidth="1px"
      borderColor="purple.600"
      borderRadius="lg"
    >
      <Heading as="h2" fontSize="22px" fontWeight="medium" color="purple.600">
        Sua referência formatada
      </Heading>
      <Box mt="4">{children}</Box>
      <Text mt="8" fontSize="xs">* Para colar no seu editor de textos, use a opção "mesclar formatação".</Text>
      <Text mt="4" fontSize="xs">** Algumas regras da norma escolhida podem ainda não estar cobertas por esta ferramenta.</Text>
    </Box>
  )
}