import React from "react"
import {
  Flex,
  FormControl,
  RadioGroup,
  Radio,
} from "@chakra-ui/react"
import { SearchByDoiForm } from "./SearchByDoiForm"
import { Standard } from "../types"

export const ToolBox = () => {
  const [standard, setStandard] = React.useState<Standard>('abnt')
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
          onChange={(value: Standard) => setStandard(value)}
          value={standard}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          colorScheme="purple"
        >
          <Radio borderColor="gray.400" value="abnt">ABNT</Radio>
          <Radio borderColor="gray.400" value="apa" ml="1.6rem">
            APA
          </Radio>
          <Radio borderColor="gray.400" value="vancouver" ml="1.6rem">
            Vancouver
          </Radio>
        </RadioGroup>
      </FormControl>
      <SearchByDoiForm standard={standard} />
    </Flex>
  )
}