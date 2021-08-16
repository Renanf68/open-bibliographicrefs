import { FormControl, FormLabel, Input, InputProps, useMultiStyleConfig } from "@chakra-ui/react"

interface CustomInputProps extends InputProps {
  label?: string;
}

export const CustomInput = ({label, maxW, mt, mb, mr, ml, flex, ...props}: CustomInputProps) => {
  const controlProps = { maxW, mt, mb, mr, ml, flex };
  const styles = useMultiStyleConfig('Input', {});
  return (
    <FormControl sx={styles.control} {...controlProps}>
      {label && <FormLabel sx={styles.label}>{label}</FormLabel>}
      <Input sx={styles.input} {...props} />
    </FormControl>
  )
}