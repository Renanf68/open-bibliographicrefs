import { Box, Center, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { MdContentCopy } from 'react-icons/md';
import React from 'react';
import { TranslationResultContainer } from "../types";

interface ResultBoxProps {
  id: string;
  translation: TranslationResultContainer;
  children: React.ReactNode | React.ReactNode[];
}

export const ResultBox = ({ id, translation, children }: ResultBoxProps) => {
  // state
  const [isCopied, setIsCopied] = React.useState(false);
  // handlers
  const copyToClipboard = () =>{
    setIsCopied(true);
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(document.getElementById(id));
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setTimeout(() => setIsCopied(false), 100);
  }
  // UI
  return (
    <Flex p="6" bg="gray.200" borderRadius="lg">
      <Text id={id} fontSize="xs" textAlign="justify">{children}</Text>
      <Center minW="36px" pl="2">
        <Tooltip 
          fontSize="xs"
          label={translation.copyIconLabel}
          aria-label={translation.copyIconLabel}
          placement="top"
        >
          <Box p="1" _hover={{ bg: 'purple.200' }}>
            <Icon 
              as={MdContentCopy} 
              w={isCopied ? '18px' : '20px'} 
              h={isCopied ? '18px' : '20px'} 
              color="purple.600" 
              cursor="pointer"
              onClick={copyToClipboard} 
            />
          </Box>
        </Tooltip>
      </Center>
    </Flex>
  )
}