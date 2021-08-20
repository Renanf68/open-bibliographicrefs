import React from "react"
import {
  Flex,
  FormControl,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react"
import { SearchByDoiForm } from "./SearchByDoiForm"
import { Standard } from "../types"
import { useMainContext } from "../context"

export const ToolBox = () => {
  // context
  const { standard, setStandard } = useMainContext();
  // UI
  return (
    <Flex
      mt="4"
      w="100%"
      p="8"
      bg="gray.200"
      borderRadius="lg"
      flexDir="column"
    >
      <FormControl as="fieldset">
        <RadioGroup
          display="flex"
          flexDirection="row"
          justifyContent="center"
          colorScheme="purple"
          size="sm"
          value={standard}
          onChange={(value: Standard) => setStandard(value)}
        >
          <HStack spacing={4}>
            <Radio borderColor="gray.400" value="abnt">ABNT</Radio>
            <Radio isDisabled borderColor="gray.400" value="apa">APA</Radio>
            <Radio isDisabled borderColor="gray.400" value="vancouver">Vancouver</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <SearchByDoiForm standard={standard} />
    </Flex>
  )
}