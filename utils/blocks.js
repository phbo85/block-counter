import { useState, useEffect } from 'react';
import web3 from 'web3';
import networkConfig from './chains.json';
import rpcOverWrite from './rpcOverWrite.json';

export const isValidBlock = (block) => block && /^\d+$/.test(block);
export const isValidChainId = (chainId) =>
  chainId && networkConfig.find((chain) => chain.chainId === Number(chainId));

const ID_REGEX = /\$\{[^}]*\}/;
const sanitizeURL = (url = '') => url.replace(ID_REGEX, '');

const getRPC = ({ chainId, rpcs }) => {
  const overwrite = rpcOverWrite?.[chainId];

  if (overwrite) {
    return overwrite;
  }

  if (!rpcs) {
    return null;
  }

  if (rpcs.length === 1) {
    return sanitizeURL(rpcs[0]);
  }

  return rpcs.reduce((acc, item) => {
    const containsIdParam = item.match(ID_REGEX);

    if (acc || containsIdParam?.length > 0) {
      return acc;
    }

    return sanitizeURL(item);
  }, null);
};

export const useNetworkConfig = (chainId) => {
  const [network, setNetwork] = useState({ data: null, error: null });

  useEffect(() => {
    if (chainId) {
      const config = networkConfig.find(
        (chain) => chain.chainId === Number(chainId)
      );

      if (config) {
        setNetwork({
          data: {
            ...config,
            rpc: getRPC({ chainId: config.chainId, rpcs: config.rpc }),
          },
          error: null,
        });
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
        console.error(rpc, message);
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

    return await instance.eth.getBlockNumber();
  } catch (error) {
    console.error(error);
  }

  return null;
};

const getBlockInfo = async (rpc, blockTarget) => {
  if (!rpc) {
    throw 'unknown network';
  }

  const instance = new web3(new web3.providers.HttpProvider(rpc));

  const currentBlock = await instance.eth.getBlockNumber();
  const currentBlockInfo = await instance.eth.getBlock(currentBlock);

  const pastBlock = await instance.eth.getBlock(currentBlock - 1000);
  const avgTime = (currentBlockInfo?.timestamp - pastBlock?.timestamp) / 1000;
  const blockLeft = blockTarget - currentBlock;
  const timeSeconds = blockLeft * avgTime;

  const actualTime = secondsToHms(timeSeconds);

  return {
    ...actualTime,
    totalSeconds: timeSeconds,
    currentBlock,
    blockLeft,
    avgTime,
  };
};

const secondsToHms = (input = 0) => {
  const round = input > 0 ? Math.floor : Math.ceil;
  const days = round(input / (3600 * 24));
  const hours = round((input % (3600 * 24)) / 3600);
  const minutes = round((input % 3600) / 60);
  const seconds = round(input % 60);

  return { days, hours, minutes, seconds };
};
