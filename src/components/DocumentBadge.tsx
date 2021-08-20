import { Text } from "@chakra-ui/react"

interface DocumentBadgeProps {
  label: string;
}

export const DocumentBadge = ({ label }: DocumentBadgeProps) => {
  return (
    <Text 
      ml="2"
      as="span" 
      bg="purple.200" 
      borderRadius="lg"
      px="3"
      py="1"
      color="purple.600"
    >
      {label}
    </Text>
  )
}