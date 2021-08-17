import React from "react"
import { Box, Text, Icon } from "@chakra-ui/react"
import { FaInfoCircle } from "react-icons/fa"

export const FormFooter = () => {
  return (
    <Box
      display="flex"
      flexDir="row"
      w="100%"
      backgroundColor="gray.50"
      mt="1rem"
      py="1rem"
      px="2rem"
      borderRadius="sm"
    >
      <Box w="50%">
        <Text as="p" fontSize="sm" fontWeight="bold">
          <Icon as={FaInfoCircle} w="12px" h="12px" mr="2" mb="1"/>
          Campos obrigatórios *
        </Text>
      </Box>
      {/*<Box w="50%" display="flex" flexDir="column">
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
      </Box>*/}
    </Box>
  )
}