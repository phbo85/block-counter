import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  VStack,
} from '@chakra-ui/react';
import Title from '../components/Title';
import Button from '../components/Button';
import Error from '../components/Error';
import { useNetworkConfig } from '../utils/blocks';

const Chain = ({ chainId }) => {
  const [block, setBlock] = useState();
  const { data, error } = useNetworkConfig(chainId);

  if (error) {
    return <Error message="There was an error getting the block time." />;
  }

  if (!data) {
    return <>Loading...</>;
  }
  const { name } = data;
  const onChange = (e) => {
    setBlock(e.target.value);
  };

  return (
    <>
      <Box
        p={8}
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: 'left', md: 'center' }}
      >
        <Title>
          <>
            <span>Enter a block for </span>
            <Text
              display={{ base: 'block', lg: 'inline' }}
              w="full"
              bgClip="text"
              bgGradient="linear(to-r, #ff8800, #b026ff)"
              fontWeight="extrabold"
            >
              {name}
            </Text>
          </>
        </Title>
      </Box>
      <VStack spacing={5} m={4}>
        <NumberInput
          placeholder="Enter a block number"
          size="lg"
          variant="filled"
          min={1}
          onChange={(valueString) => setBlock(valueString)}
        >
          <NumberInputField
            placeholder="Enter a block number"
            onChange={onChange}
          />
        </NumberInput>
        <Link href={`/${chainId}/${block}`}>
          <a>
            <Button text="Estimate" disabled={!block} />
          </a>
        </Link>
      </VStack>
    </>
  );
};

export default Chain;
