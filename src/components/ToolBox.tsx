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
      as="div"
      w="100%"
      maxW="760px"
      direction="column"
      bg="white"
      pt="4rem"
      pb="2rem"
      px={8}
      mt="-1rem"
      borderRadius="md"
      boxShadow="md"
    >
      <FormControl as="fieldset">
        <RadioGroup
          onChange={(value: Standard) => setStandard(value)}
          value={standard}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          colorScheme="blue"
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