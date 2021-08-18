import { Select, SelectProps } from "@chakra-ui/react"
import { Langs } from "../types"

interface LangSelectProps extends SelectProps {
  lang: Langs;
}

export const LangSelect = ({lang, ...props}: LangSelectProps) => {
  return (
    <Select 
      px="1"
      border="none"
      color="purple.600"
      fontSize="sm" 
      outline="none"
      _active={{border: 'none'}}
      _focus={{border: 'none'}}
      cursor="pointer"
      value={lang}
      {...props} 
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
      <option value="pt-br">PT</option>
    </Select>
  )
}