import { chakra, useColorModeValue } from '@chakra-ui/react';

const Title = ({ children }) => (
  <chakra.h2
    mb={6}
    fontSize={{ base: '2xl', md: '3xl' }}
    fontWeight="semi"
    letterSpacing={{ base: 'normal', md: 'tight' }}
    color={useColorModeValue('gray.900', 'gray.100')}
  >
    {children}
  </chakra.h2>
);
export default Title;
