import React from "react";
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa"

export const ExtraInputsBox = ({ children }) => {
  return (
    <Box w="100%" mt="1rem" bg="gray.100" py="2rem" px="2rem" borderRadius="sm">
      <Text mb="4">
        <Icon as={FaInfoCircle} mr="1" mb="0.3rem" /> Preencha os campos
        abaixo para concluir a formatação da referência:
      </Text>
      {children}
    </Box>
  );
};