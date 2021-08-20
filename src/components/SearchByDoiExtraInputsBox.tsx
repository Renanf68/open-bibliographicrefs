import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const ExtraInputsBox = ({ children }) => {
  return (
    <Box w="100%" mt="8">
      <Text mb="2" fontSize="md" fontWeight="medium">
        Preencha os dados abaixo para concluir a formatação da referência:
      </Text>
      {children}
    </Box>
  );
};