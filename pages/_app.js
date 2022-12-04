import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/montserrat';
import '@fontsource/montserrat/900-italic.css';
import theme from '../styles/theme';

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
