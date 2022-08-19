import { useState, useEffect } from 'react';
import { useNetworkConfig } from '../utils/blocks';
import { getCurrentBlock } from '../utils/blocks';

const useCurrentBlock = (chainId) => {
  const { data } = useNetworkConfig(chainId);
  const { rpc } = data || {};
  const [currentBlock, setCurrentBlock] = useState();

  useEffect(() => {
    if (rpc) {
      getCurrentBlock(rpc).then((block) => {
        if (block) {
          setCurrentBlock(block);
        }
      });
    }
  }, [rpc]);

  return currentBlock;
};

export default useCurrentBlock;