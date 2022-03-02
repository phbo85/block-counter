import Link from 'next/link';
import {
  chakra,
  Badge,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const ChainCard = ({ chainId, name }) => {
  return (
    <Flex
      key={chainId}
      maxW="xs"
      mx="auto"
      px={{ base: 2, md: 4 }}
      py={'4'}
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
      <Flex justify="center">
        <Link href={`/${chainId}`}>
          <IconButton
            variant="outline"
            color={useColorModeValue('gray.700', 'gray.400')}
            _hover={{
              bgGradient: 'linear(to-r, #ff8800, #b026ff)',
              color: useColorModeValue('gray.100', 'gray.900'),
            }}
            _focus={{
              bgGradient: 'linear(to-r, #ff8800, #b026ff)',
              color: useColorModeValue('gray.100', 'gray.900'),
            }}
            size="md"
            width="50%"
            fontSize={'1.5rem'}
            icon={<ArrowForwardIcon />}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default ChainCard;
