import { Flex, Center, Heading, Tooltip } from '@chakra-ui/react'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { ToolBox } from '../components/ToolBox'

export default function Home() {
  return (
    <Center minH="100vh" pt="24" pb="24">
      <Head>
        <title>Referências bibliográficas</title>
      </Head>
      <Flex flexDir="column" justifyContent="center">
        <Heading as="h1" fontSize="28px" textAlign="center">Referências bibliográficas</Heading>
        <Heading as="h2" mt="4" maxW="600px" fontSize="16px" fontWeight="400" textAlign="center" color="gray.700">
          Ferramenta Opem Source de apoio à comunidade acadêmica. Informe o 
          <Tooltip 
            label="A sigla DOI significa Digital Object Identifier (Identificador de Objeto Digital). Mais informação em https://www.doi.org/" 
            aria-label="Identificador de Objeto Digital"
          >
            <strong>{' DOI'}</strong>
          </Tooltip> e busque pela correspondente referência bibliográfica de artigos, 
            teses, dissertações, livros e capítulos de livros.
        </Heading>
        <ToolBox />
        <Footer />
      </Flex>
    </Center>
  )
}
