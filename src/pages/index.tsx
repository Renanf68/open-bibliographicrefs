import { Center } from '@chakra-ui/react'
import Head from 'next/head'
import { ToolBox } from '../components/ToolBox'

export default function Home() {
  return (
    <Center minH="100vh">
      <Head>
        <title>Referências bibliográficas</title>
      </Head>
      <ToolBox />
    </Center>
  )
}
