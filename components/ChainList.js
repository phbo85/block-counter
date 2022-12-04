import { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Input,
  InputRightElement,
  InputGroup,
  VStack,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
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
    <VStack spacing={5} m={4} w="90vw">
      <InputGroup
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.200')}
        w="full"
      >
        <Input
          placeholder="Search for blockchain name, token or id"
          size="lg"
          variant="filled"
          onChange={onChange}
          value={searchTerm}
          _hover={{ outline: 'none', border: 'none' }}
          _focus={{ outline: 'none', border: 'none' }}
        />
        <InputRightElement
          h="full"
          borderLeft="1px solid"
          borderColor={useColorModeValue('gray.800', 'gray.200')}
        >
          <Button
            variant="ghost"
            h="full"
            onClick={() => setSearchTerm('')}
            disabled={!searchTerm}
          >
            <CloseIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
      <SimpleGrid columns={{ base: 1, md: 4 }} m="2" spacing="4" w="full">
        {filtered.map(({ chainId, name }) => (
          <ChainCard chainId={chainId} name={name} key={chainId} />
        ))}
      </SimpleGrid>
      {filtered.length === 0 && (
        <Alert
          mx="auto"
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Sorry, we could not find any networks for your search
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Please try again with a different search term. You can use the
            blockchain name, token or id.
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};

export default ChainList;
