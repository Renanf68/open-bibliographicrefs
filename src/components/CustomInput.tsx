import { FormControl, FormLabel, Input, InputProps, Text, useMultiStyleConfig } from "@chakra-ui/react"
import React from 'react'
interface CustomInputProps extends InputProps {
  label?: string;
}

export const CustomInput = ({label, maxW, mt, mb, mr, ml, flex, value, placeholder, isRequired, ...props}: CustomInputProps) => {
  const controlProps = { maxW, mt, mb, mr, ml, flex };
  //const styles = useMultiStyleConfig('Input', {});
  // state
  const [isFocus, setIsfocus] = React.useState(false);
  // UI
  return (
    <FormControl position="relative" h="54px" {...controlProps}>
      {label && (
        <FormLabel 
          position="absolute" 
          left="2" 
          top={(isFocus || value) ? '0' : '6'} 
          px="4px" 
          bg="gray.200" 
          zIndex={(isFocus || value) ? '900' : '0'}
        >
          {label}
          {isRequired && <Text pl="1" as="span">*</Text>}
        </FormLabel>
      )}
      <Input 
        {...props} 
        mt="16px"
        h="40px"
        _autofill={{WebkitBoxShadow: '0 0 0 30px #FBFBFB inset'}}
        placeholder={(placeholder && isFocus) ? placeholder : ''} 
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        zIndex="100"  
      />
    </FormControl>
  )
}