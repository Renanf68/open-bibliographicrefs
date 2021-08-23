import { FormControl, FormLabel, Input, InputProps, Text } from "@chakra-ui/react"
import React from 'react'
interface CustomInputProps extends InputProps {
  label?: string;
}

export const CustomInput = ({label, maxW, mt, mb, mr, ml, flex, value, placeholder, isRequired, ...props}: CustomInputProps) => {
  const controlProps = { maxW, mt, mb, mr, ml, flex };
  // state
  const [isActive, setIsActive] = React.useState(false);
  // UI
  return (
    <FormControl position="relative" h="54px" {...controlProps}>
      {label && (
        <FormLabel 
          htmlFor={props.id}
          position="absolute" 
          left="2" 
          top={value ? '1' : '6'} 
          px="4px" 
          bg="gray.200" 
          fontSize={value ? '12px' : 'sm'}
          _focus={{top: '1', color: 'purple.600', fontSize: '12px', zIndex: '900'}}
          color={value ? 'black' : '#989898'}
          zIndex={value ? '900' : '0'}
        >
          {label}
          {isRequired && <Text pl="1" as="span">*</Text>}
        </FormLabel>
      )}
      <Input 
        {...props} 
        position="relative"
        mt="16px"
        h="40px"
        fontSize="sm"
        _autofill={{WebkitBoxShadow: '0 0 0 30px #FBFBFB inset'}}
        _focus={{borderColor: 'purple.600' }}
        placeholder={(placeholder && isActive) ? placeholder : ''} 
        borderColor={value ? 'black' : '#989898'}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        zIndex="100"  
      />
    </FormControl>
  )
}