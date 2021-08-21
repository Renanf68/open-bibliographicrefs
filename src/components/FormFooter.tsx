import React from "react";
import { Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { MdArrowDownward } from 'react-icons/md';
import { useMainContext } from "../context";
import { TranslationToolBox } from "../types";

interface FormFooterProps {
  translation: TranslationToolBox;
}

export const FormFooter = ({ translation }: FormFooterProps) => {
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
        {`* ${translation.requiredFields}`}
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
            <Text>{translation.viewResult}</Text>
            <Icon as={MdArrowDownward} />
          </HStack>
        )
      }
    </Flex>
  )
}