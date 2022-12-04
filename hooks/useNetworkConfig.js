import { useState, useEffect } from 'react';
import networkConfig from '../utils/chains.json';
import { getRPC } from '../utils/blocks';

const useNetworkConfig = (chainId) => {
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

export default useNetworkConfig;
