import { Box, Center, Flex, Icon, Link, Text, Tooltip } from "@chakra-ui/react";
import { FaGithub, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import React from 'react';
import { Langs, TranslationHeader } from "../types";
import { LangSelect } from "./LangSelect";
import { useMainContext } from "../context";

interface HeaderProps {
  translation: TranslationHeader;
}

export const Header = ({ translation }: HeaderProps) => {
  // context
  const { lang, setLang, likes, addLikes } = useMainContext();
  // state
  const [liked, setLiked] = React.useState(false);
  // handlers
  const handleLike = () => {
    if(liked) return;
    addLikes();
    setLiked(true);
    localStorage.setItem('bibliographicrefs', 'liked');
  };
  // side effects
  React.useEffect(() => {
    const localLike = localStorage.getItem('bibliographicrefs')
    if(localLike) setLiked(true);
  }, [])
  // UI
  return (
    <Flex 
      position="fixed" 
      top="0" 
      w="100%" 
      h="60px" 
      bg="gray.200" 
      justifyContent="center" 
      alignItems="center"
      zIndex="999"
    >
      <Flex w="90%" justifyContent="space-between">
        <Flex w="300px" justifyContent="flex-start" alignItems="center">
          <Icon 
            as={liked ? FaHeart : FaRegHeart} 
            w="20px" 
            h="20px" 
            color="purple.600"
            cursor="pointer"
            onClick={handleLike}
          />
          {
            likes ? !liked ? (
              <Text ml="2" fontSize="sm">
                <Text as="span" color="purple.600" fontWeight="bold">
                  {`${likes} `}
                </Text>
                {translation.likes.peopleLiked}
              </Text>  
            ) : (
              <Text ml="2" fontSize="sm">
                <Text as="span" color="purple.600" fontWeight="bold">
                  {`${translation.likes.youAndMore} ${likes -1} `}
                </Text>
                {translation.likes.peopleLiked}
              </Text>
              ) : (
              <Text ml="2" fontSize="sm" color="purple.600" fontWeight="bold">
                {translation.likes.didYouLike}
              </Text>  
            ) 
          }
        </Flex>
        <Center w="300px">
          <Tooltip label={`${translation.contribute} =)`} aria-label={translation.contributeAriaLabel}>
            <Link 
              href="https://github.com/Renanf68/open-bibliographicrefs" 
              _focus={{outline: 'none'}}  
              isExternal
            >
              <Icon as={FaGithub} w="22px" h="22px" />
            </Link>
          </Tooltip>
        </Center>
        <Flex w="300px" justifyContent="flex-end" alignItems="center">
          <Icon as={MdLanguage} w="22px" h="22px" color="purple.600"/>
          <Box ml="-6px" w="68px">
            <LangSelect selected={lang} onChange={selected => setLang(selected as Langs)} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};