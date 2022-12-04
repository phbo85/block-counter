import { Box, VStack, useColorModeValue } from '@chakra-ui/react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Box bgImage="/background.svg" bgSize="cover" bgAttachment="fixed">
      <Header />
      <VStack
        spacing={5}
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.200')}
        mt="-1px"
        minHeight="calc(100vh - 4rem)"
      >
        {children}
      </VStack>
    </Box>
  );
};

export default Layout;
