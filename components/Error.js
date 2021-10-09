import React from 'react';
import { chakra, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

const Error = ({ message = 'There was an error.' }) => (
  <Flex w="full" h="full" p={50} alignItems="center" justifyContent="center">
    <Flex
      maxW="sm"
      w="full"
      mx="auto"
      bg={useColorModeValue('white', 'gray.700')}
      shadow="md"
      rounded="lg"
      overflow="hidden"
    >
      <Flex justifyContent="center" alignItems="center" w={16} bg="red.500">
        <WarningIcon w={8} h={8} color="white" />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span
            color={useColorModeValue('red.500', 'red.400')}
            fontWeight="bold"
          >
            Error
          </chakra.span>
          <chakra.p
            color={useColorModeValue('gray.600', 'gray.200')}
            fontSize="sm"
          >
            {message}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  </Flex>
);

export default Error;
