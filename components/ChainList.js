import { useState, useEffect } from 'react';
import { SimpleGrid, Input, VStack } from '@chakra-ui/react';
import networkConfig from '../utils/networks';
import ChainCard from './ChainCard';

const ChainList = () => {
  const [filtered, setFiltered] = useState(networkConfig);
  const [searchTerm, setSearchTerm] = useState('');

  const onChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    const filteredNetworks = networkConfig.filter(
      ({ chainId, name, nativeCurrency: { symbol } }) => {
        const searchSymbol = symbol.toLowerCase();
        const searchName = name.toLowerCase();
        const searchId = chainId.toString();

        return (
          searchName.includes(searchTerm.toLowerCase()) ||
          searchSymbol.includes(searchTerm.toLowerCase()) ||
          searchId.includes(searchTerm.toLowerCase())
        );
      }
    );
    setFiltered(filteredNetworks);
  }, [searchTerm, setFiltered]);

  return (
    <VStack spacing={5} m={4}>
      <Input
        placeholder="Search for blockchain name, token or id"
        size="lg"
        variant="filled"
        onChange={onChange}
      />
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={{ base: 5, lg: 8 }}
        m={2}
      >
        {filtered.map(({ chainId, name }) => (
          <ChainCard chainId={chainId} name={name} key={chainId} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ChainList;
