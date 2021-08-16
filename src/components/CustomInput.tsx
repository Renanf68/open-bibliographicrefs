import { FormControl, FormLabel, Input, InputProps, useMultiStyleConfig } from "@chakra-ui/react"

interface CustomInputProps extends InputProps {
  label: string;
}

export const CustomInput = ({label, ...props}: CustomInputProps) => {
  const styles = useMultiStyleConfig('Input', {});
  return (
    <FormControl sx={styles.control}>
      <FormLabel sx={styles.label}>{label}</FormLabel>
      <Input sx={styles.input} {...props} />
    </FormControl>
  )
}