import { useEffect, useState, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { Skeleton, Flex } from '@chakra-ui/react';
import SwapAbi from '../abi/swap.abi.json';

const ContractBalance = ({ symbol, address, decimals }) => {
  const [balance, setBalance] = useState();
  const { account, library } = useWeb3React();
  const contract = useMemo(
    () => new Contract(address, SwapAbi, library.getSigner()),
    [address, library]
  );

  useEffect(() => {
    const getBalance = async () => {
      console.log('get contract balance');
      if (contract && account && address) {
        const bal = await contract.getTotalDeposits();
        setBalance(bal);
      }
    };
    getBalance();
    library.on('block', () => {
      getBalance();
    });

    return () => {
      library.removeAllListeners('block');
    };
  }, [account, library, address, contract]);

  if (!balance) {
    return (
      <Flex>
        <Skeleton height="35px" width="7ch" />
        {symbol}
      </Flex>
    );
  }

  return (
    <Flex>
      {parseFloat(formatUnits(balance, decimals))} {symbol}
    </Flex>
  );
};
export default ContractBalance;
