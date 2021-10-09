import React from 'react';
import { chakra, Box, useColorModeValue, Text } from '@chakra-ui/react';

const Hero = ({ name, block }) => {
  return (
    <Box
      p={8}
      w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
      mx="auto"
      textAlign={{ base: 'left', md: 'center' }}
    >
      <chakra.h1
        mb={6}
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="semi"
        letterSpacing={{ base: 'normal', md: 'tight' }}
        color={useColorModeValue('gray.900', 'gray.100')}
      >
        Countdown for block{' '}
        <Text
          display={{ base: 'block', lg: 'inline' }}
          w="full"
          bgClip="text"
          bgGradient="linear(to-r, #ff8800, #b026ff)"
          fontWeight="extrabold"
        >
          {block}
        </Text>{' '}
        on{' '}
        <Text
          display={{ base: 'block', lg: 'inline' }}
          w="full"
          bgClip="text"
          bgGradient="linear(to-r, #ff8800, #b026ff)"
          fontWeight="extrabold"
        >
          {name}
        </Text>
      </chakra.h1>
    </Box>
  );
};

export default Hero;
