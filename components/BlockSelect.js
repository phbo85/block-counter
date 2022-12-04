import NextLink from 'next/link';
import {
  Box,
  Link,
  NumberInput,
  NumberInputField,
  useColorModeValue,
} from '@chakra-ui/react';
import Button from './Button';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const BlockSelect = ({ block, chainId, onChange, setBlock }) => (
  <>
    <Box
      border="1px solid"
      borderColor={useColorModeValue('gray.800', 'gray.200')}
      mt="-1px"
      w="full"
    >
      <NumberInput
        placeholder="Enter a block number"
        size="lg"
        variant="filled"
        min={1}
        value={block}
        onChange={(valueString) => setBlock(valueString)}
      >
        <NumberInputField
          placeholder="Enter a block number"
          onChange={onChange}
        />
      </NumberInput>
    </Box>
    <NextLink href={`/${chainId}/${block}`}>
      <Link w="full" _hover={{ textDecoration: 'none' }}>
        <Button disabled={!block}>
          Estimate{' '}
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
  </>
);
export default BlockSelect;
