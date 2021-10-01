import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import SwapABI from '../abi/swap.abi.json';

const MULTIPLICATOR = 1000000;

const fromBN = (value) =>
  value ? BigNumber.from(value).toNumber() / MULTIPLICATOR : 0;

const Component = ({ totalDeposit, contractInfo, color }) => {
  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
        <Box mt={[10, 0]}>
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
              Contract Info
            </Heading>
          </Box>

          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={useColorModeValue('white', 'gray.700')}
            spacing={6}
          >
            <Stat>
              <StatLabel>Total Deposit</StatLabel>
              <StatNumber>{totalDeposit}</StatNumber>
              <StatHelpText>USDC</StatHelpText>
            </Stat>
          </Stack>
        </Box>
        <Box mt={[10, 0]}>
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={useColorModeValue('white', 'gray.700')}
            spacing={6}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <GridItem mt={[5, null, 0]} colSpan={{ base: 1 }}>
                {contractInfo && (
                  <Table colorScheme={color}>
                    <Thead>
                      <Tr>
                        <Th>Address</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {contractInfo.map(({ user, balance }) => (
                        <Tr key={user}>
                          <Td wordBreak="break-word">{user}</Td>
                          <Td isNumeric>{balance}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                )}
              </GridItem>
            </SimpleGrid>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Component;
