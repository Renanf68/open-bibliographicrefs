import { Box, Flex, Center, Heading, Icon, Text, Tooltip } from '@chakra-ui/react';
import Head from 'next/head';
import { ToolBox } from '../components/ToolBox';
import Container from '../components/Container';
import { MdErrorOutline } from "react-icons/md";
import { Header } from '../components/Header';
import { useMainContext } from '../context';
import { SearchByDoiResultABNT } from '../components/abnt/SearchByDoiResultABNT';
import { SearchByDoiResultAPA } from '../components/apa/SearchByDoiResultAPA';
import { SearchByDoiResultVanc } from '../components/vancouver/SearchByDoiResultVanc';
import { Seo } from '../components/Seo';
import translation from '../translations/es';

export default function Home() {
  //context
  const { standard, searchResponse } = useMainContext();
  // UI
  return (
    <Box>
      <Head>
        <title>{translation.title}</title>
        <Seo
          title={translation.title}
          metaDescription={translation.description}
          author="@renan_costa_m"
          canonical_url="https://referenciasbibliograficas.com.br/"
        />
      </Head>
      <Header translation={translation.content.header} />
      <Center minH="100vh" pt="100px" pb={searchResponse.EntryKey ? '12' : '8'}>
        <Container>
          <Flex flexDir="column" justifyContent="center">
            <Heading as="h1" fontSize="lg" lineHeight="lg" textAlign="center">
              {translation.title}
            </Heading>
            <Heading 
              mt="4" 
              as="h2" 
              fontSize="sm" 
              fontWeight="normal"
              lineHeight="sm" 
              textAlign="center" 
            >
              {translation.content.subtitle}
            </Heading>
            <Flex mt="8" w="100%" p="24px" bg="purple.200" borderRadius="lg">
              <Box mr="4">
                <Icon as={MdErrorOutline} color="purple.600" /> 
              </Box>
              <Text fontSize="sm" lineHeight="md">
                {translation.content.doiBoxFirtPart} 
                <Tooltip 
                  fontSize="xs"
                  label="A sigla DOI significa Digital Object Identifier (Identificador de Objeto Digital). Mais informação em https://www.doi.org/" 
                  aria-label="Identificador de Objeto Digital"
                >
                  <strong>{' DOI'}</strong>
                </Tooltip> {translation.content.doiBoxSecondPart}
              </Text>
            </Flex>
            <ToolBox translation={translation.content.toolBox} />
            {searchResponse.EntryKey && standard === "abnt" && (
              <SearchByDoiResultABNT translation={translation.content.ResultContainer} data={searchResponse} />
            )}
            {searchResponse.EntryKey && standard === "apa" && (
              <SearchByDoiResultAPA data={searchResponse} />
            )}
            {searchResponse.EntryKey && standard === "vancouver" && (
              <SearchByDoiResultVanc data={searchResponse} />
            )}
          </Flex>
        </Container>
      </Center>
    </Box>
  )
}
