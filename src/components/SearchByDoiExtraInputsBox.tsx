import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface ExtraInputsBoxProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export const ExtraInputsBox = ({ title, children }: ExtraInputsBoxProps) => {
  return (
    <Box w="100%" mt="8">
      <Text mb="2" fontSize="md" fontWeight="medium">{title}</Text>
      {children}
    </Box>
  );
};