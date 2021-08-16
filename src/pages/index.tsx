import { Box, Center, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { ToolBox } from '../components/ToolBox'

export default function Home() {
  return (
    <Center minH="100vh" pt="24" pb="24">
      <Head>
        <title>Referências bibliográficas</title>
      </Head>
      <Box>
        <Heading fontSize="28px" textAlign="center">Referências bibliográficas</Heading>
        <ToolBox />
      </Box>
    </Center>
  )
}
