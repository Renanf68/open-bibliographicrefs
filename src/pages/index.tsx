import { Box, Flex, Center, Heading, Icon, Text, Tooltip } from '@chakra-ui/react'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { ToolBox } from '../components/ToolBox'
import Container from '../components/Container'
import { FaInfoCircle } from "react-icons/fa"
import { Header } from '../components/Header'

export default function Home() {
  return (
    <Box>
    <Head>
      <title>Referências bibliográficas</title>
    </Head>
    <Header />
    <Center minH="100vh" pt="160px" pb="24">
      <Container>
        <Flex flexDir="column" justifyContent="center">
          <Heading as="h1" fontSize="lg" lineHeight="lg" textAlign="center">
            Referências bibliográficas
          </Heading>
          <Heading 
            mt="4" 
            as="h2" 
            fontSize="sm" 
            fontWeight="normal"
            lineHeight="sm" 
            textAlign="center" 
          >
            Ferramenta Open Source de apoio à comunidade acadêmica.
          </Heading>
          <Flex mt="8" w="100%" p="24px" bg="purple.200" borderRadius="lg">
            <Box mr="4">
              <Icon as={FaInfoCircle} color="purple.600" /> 
            </Box>
            <Text fontSize="sm" lineHeight="md">
              Informe o 
              <Tooltip 
                label="A sigla DOI significa Digital Object Identifier (Identificador de Objeto Digital). Mais informação em https://www.doi.org/" 
                aria-label="Identificador de Objeto Digital"
              >
                <strong>{' DOI'}</strong>
              </Tooltip> e busque pela correspondente referência bibliográfica de artigos, 
                teses, dissertações, livros e capítulos de livros.
            </Text>
          </Flex>
          <ToolBox />
        </Flex>
      </Container>
    </Center>
    </Box>
  )
}
