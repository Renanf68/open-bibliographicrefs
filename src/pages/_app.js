import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { MainContextProvider } from '../context';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <MainContextProvider>
        <Component {...pageProps} />
      </MainContextProvider>
    </ChakraProvider>
  );
};

export default MyApp;
