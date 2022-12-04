import { Text, useColorModeValue } from '@chakra-ui/react';

const Highlight = ({ children, ...rest }) => (
  <Text
    display={{ base: 'block', lg: 'inline' }}
    w="full"
    bgClip="text"
    bgGradient={useColorModeValue(
      'linear-gradient(to right, #9932cc, #00008b)',
      'linear-gradient(to right, #ef32d9, #89fffd)'
    )}
    fontWeight="extrabold"
    fontStyle="italic"
    {...rest}
  >
    {children}
  </Text>
);

export default Highlight;
