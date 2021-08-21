import { Box, Heading, Text } from "@chakra-ui/react"
import { TranslationResultContainer } from "../types"

interface ResultContainerProps {
  translation: TranslationResultContainer;
  children: React.ReactNode | React.ReactNode[];
}

export const ResultContainer = ({ translation, children }: ResultContainerProps) => {
  return (
    <Box
      mt="4"
      w="100%"
      p="8"
      borderWidth="1px"
      borderColor="purple.600"
      borderRadius="lg"
    >
      <Heading as="h2" fontSize="22px" fontWeight="medium" color="purple.600">
        {translation.title}
      </Heading>
      <Box mt="4">{children}</Box>
      <Text mt="8" fontSize="xs">{`* ${translation.pasteRecomendation}`}</Text>
      <Text mt="4" fontSize="xs">{`** ${translation.standardWarning}`}</Text>
    </Box>
  )
}