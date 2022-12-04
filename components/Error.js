import React from 'react';
import { chakra, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

const Error = ({ message = 'There was an error.' }) => (
  <Flex w="full" h="full" p={50} alignItems="center" justifyContent="center">
    <Flex
      maxW="sm"
      w="full"
      mx="auto"
      overflow="hidden"
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.200')}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        w={16}
        borderRight={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.200')}
      >
        <WarningIcon w={8} h={8} color="white" />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span fontWeight="bold">Error</chakra.span>
          <chakra.p fontSize="sm">{message}</chakra.p>
        </Box>
      </Box>
    </Flex>
  </Flex>
);

export default Error;
