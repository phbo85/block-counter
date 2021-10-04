import { useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import networkConfig from '../utils/networks';
import ChainCard from './ChainCard';

const ChainList = () => {
  const [filtered, setFiltered] = useState(networkConfig);
  // TODO: add filter
  return (
    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }} m={2}>
      {filtered.map(({ chainId, name }) => (
        <ChainCard chainId={chainId} name={name} key={chainId} />
      ))}
    </SimpleGrid>
  );
};

export default ChainList;
