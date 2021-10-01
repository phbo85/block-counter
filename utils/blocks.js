import web3 from 'web3';
import { NetworkConfig } from './index';
import { useState, useEffect } from 'react';

export const useBlockInfo = (chainId, block) => {
  const [blockInfo, setBlockInfo] = useState({ error: null, data: null });

  useEffect(async () => {
    const intervalId = setInterval(async () => {
      try {
        if ((chainId, block)) {
          const data = await getBlockInfo(chainId, block);
          setBlockInfo({ data, error: null });
        }
      } catch (error) {
        console.log(error);
        setBlockInfo({ data: null, error });
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [block, chainId]);

  return blockInfo;
};
export const getBlockInfo = async (chainId, blockTarget) => {
  const { rpc } = NetworkConfig[chainId];
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
