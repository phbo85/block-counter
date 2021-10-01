import fetcher from 'swr-eth';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import web3 from 'web3';
import Header from '../components/Header';
import Bot from '../components/Bot';
import useChainSettings from '../hooks/useChainSettings';

import SwapABI from '../abi/swap.abi.json';
import ERC20ABI from '../abi/ERC20.abi.json';

const getBlockInfo = async () => {
  const blockTarget = 19798152;
  const rpcAddress = 'https://polygon-rpc.com/';

  const instance = new web3(new web3.providers.HttpProvider(rpcAddress));

  const currentBlock = await instance.eth.getBlockNumber();
  const tenBlock = currentBlock - 1000;
  const currentBlockInfo = await instance.eth.getBlock(currentBlock);
  const currentTimeStamp = currentBlockInfo.timestamp;
  const tenBlockInfo = await instance.eth.getBlock(tenBlock);
  const tenTimeStamp = tenBlockInfo.timestamp;
  const avgTime = (currentTimeStamp - tenTimeStamp) / 1000;
  const blockLeft = blockTarget - currentBlock;
  const timeSeconds = blockLeft * avgTime;
  const actualTime = secondsToHms(timeSeconds);

  console.log(
    'Current block: ' +
      currentBlock +
      ' |' +
      ' Blocks left: ' +
      blockLeft +
      ' |' +
      ' Average block time: ' +
      avgTime +
      ' second(s)' +
      ' |' +
      ' Estimated Time: ' +
      actualTime
  );
};

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}
export default function Test() {
  const { active, library, chainId } = useWeb3React();
  const { color, logo } = useChainSettings(chainId);

  const { query } = useRouter();
  const { c } = query;

  useEffect(async () => {
    console.log(await getBlockInfo());
  }, []);
  // get contract for stable
  return (
    <>
      <h1>test</h1>
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
