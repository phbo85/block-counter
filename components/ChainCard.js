import NextLink from 'next/link';
import {
  chakra,
  Badge,
  Flex,
  Box,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import Button from './Button';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ChainCard = ({ chainId, name }) => {
  return (
    <Flex
      key={chainId}
      maxW="xs"
      px={{ base: 2, md: 4 }}
      py="4"
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.200')}
      flexDir="column"
      justifyContent="space-between"
      width="100%"
      _hover={{
        background: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
      }}
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
        <Badge ml="1" fontSize="md" variant="solid" colorScheme="green">
          {chainId}
        </Badge>
      </Flex>
      <Flex justify="center">
        <NextLink href={`/${chainId}`}>
          <Link w="full" _hover={{ textDecoration: 'none' }}>
            <Button>
              <Box>Select</Box>
              <ArrowForwardIcon
                size="md"
                width="50%"
                borderRadius="0"
                icon={<ArrowForwardIcon />}
                color="transparent"
                transition="color 0.2s ease-in-out"
                _groupHover={{ color: 'inherit' }}
                display={{ base: 'none', md: 'block' }}
                pos="absolute"
                left="50%"
              />
            </Button>
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default ChainCard;
