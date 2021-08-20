import { Box, Flex, Center, Heading, Icon, Text, Tooltip } from '@chakra-ui/react'
import Head from 'next/head'
import { ToolBox } from '../components/ToolBox'
import Container from '../components/Container'
import { MdErrorOutline } from "react-icons/md"
import { Header } from '../components/Header'
import { useMainContext } from '../context'
import { SearchByDoiResultABNT } from '../components/abnt/SearchByDoiResultABNT'
import { SearchByDoiResultAPA } from '../components/apa/SearchByDoiResultAPA'
import { SearchByDoiResultVanc } from '../components/vancouver/SearchByDoiResultVanc'

export default function Home() {
  //context
  const { standard, searchResponse } = useMainContext();
  // UI
  return (
    <Box>
      <Head>
        <title>Referências bibliográficas</title>
      </Head>
      <Header />
      <Center minH="100vh" pt="100px" pb={searchResponse ? '12' : '8'}>
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
                <Icon as={MdErrorOutline} color="purple.600" /> 
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
            {Object.keys(searchResponse).length > 0 && standard === "abnt" && (
              <SearchByDoiResultABNT data={searchResponse} />
            )}
            {Object.keys(searchResponse).length > 0 && standard === "apa" && (
              <SearchByDoiResultAPA data={searchResponse} />
            )}
            {Object.keys(searchResponse).length > 0 && standard === "vancouver" && (
              <SearchByDoiResultVanc data={searchResponse} />
            )}
          </Flex>
        </Container>
      </Center>
    </Box>
  )
}
