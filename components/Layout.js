import { VStack } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <VStack spacing={5} m={4}>
        {children}
      </VStack>
    </>
  );
};

export default Layout;
