import web3 from 'web3';
import networkConfig from './networks';
import { useState, useEffect } from 'react';

export const isValidBlock = (block) => block && /^\d+$/.test(block);
export const isValidChainId = (chainId) =>
  chainId && networkConfig.find((chain) => chain.chainId === Number(chainId));

export const useNetworkConfig = (chainId) => {
  const [network, setNetwork] = useState({ data: null, error: null });

  useEffect(() => {
    if (chainId) {
      const config = networkConfig.find(
        (chain) => chain.chainId === Number(chainId)
      );

      if (config) {
        setNetwork({ data: config, error: null });
      } else {
        setNetwork({ data: null, error: true });
      }
    }
  }, [chainId]);

  return network;
};

export const useBlockInfo = (rpc, block) => {
  const [blockInfo, setBlockInfo] = useState({ error: null, data: null });
  let errorCount = 0;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (errorCount > 5) {
        clearInterval(intervalId);
        setBlockInfo({ data: null, error: 'there was an error' });
      }

      try {
        if (rpc && block) {
          const data = await getBlockInfo(rpc, block);
          setBlockInfo({ data, error: null });
        }
      } catch (error) {
        const { message = '' } = error;
        console.log(rpc, message);
        errorCount++;
        setBlockInfo({ data: null, error });
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [block, rpc, errorCount]);

  return blockInfo;
};
export const getCurrentBlock = async (rpc) => {
  try {
    const instance = new web3(new web3.providers.HttpProvider(rpc));

    const currentBlock = await instance.eth.getBlockNumber();
    console.log(currentBlock);
    return currentBlock;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const getBlockInfo = async (rpc, blockTarget) => {
  if (!rpc) {
    throw 'unknown network';
  }

  const instance = new web3(new web3.providers.HttpProvider(rpc));

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

  console.log(actualTime);
  return {
    ...actualTime,
    totalSeconds: timeSeconds,
    currentBlock,
    blockLeft,
    avgTime,
  };
};

const secondsToHms = (input = 0) => {
  const days = Math.floor(input / (3600 * 24));
  const hours = Math.floor((input % (3600 * 24)) / 3600);
  const minutes = Math.floor((input % 3600) / 60);
  const seconds = Math.floor(input % 60);

  return { days, hours, minutes, seconds };
};
