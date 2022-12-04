import web3 from 'web3';
import networkConfig from './chains.json';
import rpcOverWrite from './rpcOverWrite.json';

export const isValidBlock = (block) => block && /^\d+$/.test(block);
export const isValidChainId = (chainId) =>
  chainId && networkConfig.find((chain) => chain.chainId === Number(chainId));

const ID_REGEX = /\$\{[^}]*\}/;
const sanitizeURL = (url = '') => url.replace(ID_REGEX, '');

export const getRPC = ({ chainId, rpcs }) => {
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

export const getCurrentBlock = async (rpc) => {
  try {
    const instance = new web3(new web3.providers.HttpProvider(rpc));

    return await instance.eth.getBlockNumber();
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const getBlockInfo = async (rpc, blockTarget) => {
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
