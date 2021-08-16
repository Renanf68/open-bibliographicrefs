import React from "react";
import { Box, Text, Icon } from "@chakra-ui/react";

export const ExtraInputsBox = ({ children }) => {
  return (
    <Box w="100%" mt="1rem" bg="gray.100" py="2rem" px="2rem" borderRadius="sm">
      <Text as="p">
        <Icon name="info-outline" mr="1rem" mb="0.3rem" /> Preencha os campos
        abaixo para concluir a formatação da referência:
      </Text>
      {children}
    </Box>
  );
};