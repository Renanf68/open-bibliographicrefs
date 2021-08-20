import { Box, Center, Flex, Icon, Link, Text, Tooltip } from "@chakra-ui/react";
import { FaGithub, FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import React, { ChangeEvent } from 'react'
import { Langs } from "../types";
import { LangSelect } from "./LangSelect";

export const Header = () => {
  // state
  const [lang, setLang] = React.useState<Langs>({ value: 'pt-br', label: 'PT' });
  const [likes, setLikes] = React.useState<number>(100);
  const [liked, setLiked] = React.useState(false);
  // handlers
  const AddLike = () => {
    setLikes(prev => prev ? prev +1 : 1);
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
            onClick={AddLike}
          />
          {
            likes ? !liked ? (
              <Text ml="2" fontSize="sm">
                <Text as="span" color="purple.600" fontWeight="bold">
                  {`${likes} `}
                </Text>
                pessoas curtiram
              </Text>  
            ) : (
              <Text ml="2" fontSize="sm">
                <Text as="span" color="purple.600" fontWeight="bold">
                  {`Você e mais ${likes} `}
                </Text>
                pessoas curtiram
              </Text>
              ) : (
              <Text ml="2" fontSize="sm" color="purple.600" fontWeight="bold">
                Curtiu?
              </Text>  
            ) 
          }
        </Flex>
        <Center w="300px">
          <Tooltip label="Contribua! =)" aria-label="Link para o repositório no github. Contribua!">
            <Link href="https://github.com/Renanf68/open-bibliographicrefs" isExternal>
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