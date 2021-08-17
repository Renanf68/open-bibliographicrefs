import { Flex, HStack, Icon, Link } from "@chakra-ui/react"
import { FaGithub, FaHeart } from 'react-icons/fa'

export const Footer = () => {
  return (
    <Flex justifyContent="center">
      <HStack spacing={4}>
        <Link href="https://github.com/Renanf68/open-bibliographicrefs" isExternal>
          <Icon as={FaGithub} w="24px" h="24px"/>
        </Link>
        <Icon as={FaHeart} w="24px" h="24px" color="red.500"/>
      </HStack>
    </Flex>
  )
}