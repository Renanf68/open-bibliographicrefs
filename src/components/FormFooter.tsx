import React from "react";
import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { MdArrowDownward } from 'react-icons/md';
import { useMainContext } from "../context";

export const FormFooter = () => {
  // context
  const { searchResponse } = useMainContext();
  // helpers
  const isResponse = Object.keys(searchResponse).length > 0;
  // handlers
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  // UI
  return (
    <Flex mt="6" justifyContent="space-between">
      <Text>
        * Campos obrigatórios.
      </Text>
      {
        isResponse && (
          <HStack 
            spacing={2} 
            color="purple.600" 
            fontWeight="medium"
            cursor="pointer" 
            onClick={scrollToBottom} 
          >
            <Text>Ver resultado</Text>
            <Icon as={MdArrowDownward} />
          </HStack>
        )
      }
    </Flex>
  )
}