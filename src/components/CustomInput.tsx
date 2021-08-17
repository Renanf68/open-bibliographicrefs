import { FormControl, FormLabel, Input, InputProps, Text, useMultiStyleConfig } from "@chakra-ui/react"

interface CustomInputProps extends InputProps {
  label?: string;
}

export const CustomInput = ({label, maxW, mt, mb, mr, ml, flex, isRequired, ...props}: CustomInputProps) => {
  const controlProps = { maxW, mt, mb, mr, ml, flex };
  const styles = useMultiStyleConfig('Input', {});
  return (
    <FormControl sx={styles.control} {...controlProps}>
      {label && (
        <FormLabel sx={styles.label}>
          {label}
          {isRequired && <Text pl="1" as="span" color="red">*</Text>}
          </FormLabel>
      )}
      <Input sx={styles.input} {...props} />
    </FormControl>
  )
}