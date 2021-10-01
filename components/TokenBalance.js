import { useEffect, useState, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { Skeleton, Flex } from '@chakra-ui/react';
import ERC20ABI from '../abi/ERC20.abi.json';

const TokenBalance = ({ symbol, address, decimals }) => {
  const [balance, setBalance] = useState();
  const { account, library } = useWeb3React();
  const contract = useMemo(
    () => new Contract(address, ERC20ABI, library.getSigner()),
    [address, library]
  );

  useEffect(() => {
    const getBalance = () => {
      console.log('get token balance');
      if (address && library) {
        contract.balanceOf(account).then((value) => setBalance(value));
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

export default TokenBalance;
