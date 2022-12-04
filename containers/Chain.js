import { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import Title from '../components/Title';
import Highlight from '../components/Highlight';
import Error from '../components/Error';
import BlockSelect from '../components/BlockSelect';
import useNetworkConfig from '../hooks/useNetworkConfig';
import useCurrentBlock from '../hooks/useCurrentBlock';

const Chain = ({ chainId }) => {
  const { data, error } = useNetworkConfig(chainId);
  const { currentBlock, refetchCurrentBlock } = useCurrentBlock(chainId);
  const [block, setBlock] = useState(currentBlock);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchCurrentBlock();
    }, 2000);
    return () => clearInterval(interval);
  }, [refetchCurrentBlock]);

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
          Enter a block for <Highlight>{name}</Highlight>
        </Title>
        <Text>Current Block: {currentBlock}</Text>
      </Box>
      <VStack spacing={5} m={4}>
        <BlockSelect
          block={block || currentBlock}
          chainId={chainId}
          onChange={onChange}
          setBlock={setBlock}
        />
      </VStack>
    </>
  );
};

export default Chain;
