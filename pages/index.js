import fetcher from 'swr-eth';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { useWeb3React } from '@web3-react/core';

import Header from '../components/Header';
import Bot from '../components/Bot';
import useChainSettings from '../hooks/useChainSettings';

import SwapABI from '../abi/swap.abi.json';
import ERC20ABI from '../abi/ERC20.abi.json';

export default function Home() {
  const { active, library, chainId } = useWeb3React();
  const { color, logo } = useChainSettings(chainId);

  const { query } = useRouter();
  const { c } = query;

  // get contract for stable
  return (
    <>
      <Header color={color} logo={logo} />
      {active ? (
        <SWRConfig value={{ fetcher: fetcher(library, [SwapABI, ERC20ABI]) }}>
          <Bot smartContract={c} />
        </SWRConfig>
      ) : (
        <div>Please connect your wallet</div>
      )}
    </>
  );
}
