import Link from 'next/link';
import { chakra, Badge, Flex, useColorModeValue } from '@chakra-ui/react';

const ChainCard = ({ chainId, name }) => {
  return (
    <Flex
      key={chainId}
      maxW="xs"
      mx="auto"
      px={{ base: 1, md: 2 }}
      py={'2'}
      shadow={'2xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
      flexDir="column"
      justifyContent="space-between"
      width="100%"
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <chakra.h2
          color={useColorModeValue('gray.800', 'white')}
          fontWeight="bold"
          fontSize="l"
          mb="4"
          lineHeight="1.2"
        >
          {name}
        </chakra.h2>{' '}
        <Badge ml="1" fontSize="0.8em" variant="outline" colorScheme="purple">
          {chainId}
        </Badge>
      </Flex>
      <Link href={`/${chainId}`}>
        <chakra.button
          px={2}
          py={1}
          bg={useColorModeValue('gray.400', 'gray.700')}
          fontSize="xs"
          color={useColorModeValue('gray.700', 'gray.400')}
          fontWeight="bold"
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: useColorModeValue('gray.700', 'gray.400'),
            color: useColorModeValue('gray.400', 'gray.700'),
          }}
          _focus={{
            bg: useColorModeValue('gray.700', 'gray.400'),
            color: useColorModeValue('gray.400', 'gray.700'),
          }}
        >
          Select
        </chakra.button>
      </Link>
    </Flex>
  );
};

export default ChainCard;
