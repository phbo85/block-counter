import { useEffect } from 'react';
import useSWR from 'swr';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import useChainSettings from '../hooks/useChainSettings';

export const EthBalance = () => {
  const { account, library, chainId } = useWeb3React();
  const { symbol = '' } = useChainSettings(chainId);
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest']);

  useEffect(() => {
    // listen for changes on an Ethereum address
    console.log(`listening for blocks...`);
    library.on('block', () => {
      console.log('update balance...');
      mutate(undefined, true);
    });
    // remove listener when the component is unmounted
    return () => {
      library.removeAllListeners('block');
    };
    // trigger the effect only on component mount
  }, [library, mutate]);

  if (!balance) {
    return <div>...</div>;
  }
  return (
    <div>
      {parseFloat(formatEther(balance)).toPrecision(4)} {symbol}
    </div>
  );
};
