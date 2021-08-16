import React from "react"
import { Box, Text, Icon } from "@chakra-ui/react"

export const FormFooter = () => {
  return (
    <Box
      display="flex"
      flexDir="row"
      w="100%"
      backgroundColor="gray.50"
      mt="1rem"
      pt="2rem"
      pb="1rem"
      px="2rem"
      borderRadius="sm"
    >
      <Box w="50%">
        <Text as="p" fontSize="sm" fontWeight="bold">
          <Icon name="info-outline" mr="1rem" mb="0.2rem" />
          Campos obrigatórios *
        </Text>
      </Box>
      <Box w="50%" display="flex" flexDir="column">
        <Text as="p" fontSize="sm" fontWeight="bold">
          Documentos suportados:
        </Text>
        <Text as="p" fontSize="xs">
          Artigos publicados em journals; <br />
          Teses e dissertações;
          <br />
          Livros; <br />
          Capítulos de livros.
        </Text>
      </Box>
    </Box>
  )
}