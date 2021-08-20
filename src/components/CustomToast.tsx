import { Box, HStack, Icon, Text, useToast } from '@chakra-ui/react';
import { MdClose, MdErrorOutline, MdHighlightOff } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import React from 'react';

interface MessageType {
  type: 'success' | 'warning' | 'error';
};

const MessageIcon = ({ type }: MessageType) => {
  if(type === 'warning') return <Icon as={MdErrorOutline} />
  if(type === 'error') return <Icon as={MdHighlightOff} />
  return (
    <Icon as={FaRegCheckCircle} />
  );
};

interface CustomToastProps extends MessageType {
  message: string;
};

export const CustomToast = ({ type, message }: CustomToastProps) => {
  // contex
  const toast = useToast();
  // helpers
  let bg = '#F3FFF6';
  if (type === 'warning') bg = '#FFF6E8';
  if (type === 'error') bg = '#FFF3F3';
  let color = '#00AC26'
  if (type === 'warning') color = '#E28800';
  if (type === 'error') color = '#D70000';
  // UI
  return (
    <Box
      pos="relative"
      color={color}
      p="4"
      bg={bg}
      borderRadius="lg"
      w={{ base: '100%', md: 'auto' }}
      maxW={{ base: '100vw', md: 'auto' }}
      fontSize="sm"
      fontWeight="medium"
    >
      <HStack spacing={4}>
        <MessageIcon type={type} />
        <Box>
          <Text>{message}</Text>
        </Box>
        <Icon
          as={MdClose}
          cursor="pointer"
          color="#AEAEAE"
          onClick={() => toast.closeAll()}
        />
      </HStack>
    </Box>
  );
};
