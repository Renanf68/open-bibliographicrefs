import { Container, ContainerProps } from '@chakra-ui/react';

const CustomContainer = ({ children, ...props }: ContainerProps) => {
  return (
    <Container maxW={{ base: '100%', md: '740px', lg: '709px' }} {...props}>
      {children}
    </Container>
  );
};

export default CustomContainer;