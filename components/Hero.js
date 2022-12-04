import React from 'react';
import { Box } from '@chakra-ui/react';
import Title from './Title';
import Highlight from './Highlight';

const Hero = ({ name, block }) => {
  return (
    <Box
      p={8}
      w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
      mx="auto"
      textAlign={{ base: 'left', md: 'center' }}
    >
      <Title>
        Countdown for block <Highlight>{block}</Highlight> on{' '}
        <Highlight>{name}</Highlight>
      </Title>
    </Box>
  );
};

export default Hero;
