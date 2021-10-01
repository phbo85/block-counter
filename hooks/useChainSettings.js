import { useState, useEffect } from 'react';
import { NetworkConfig } from '../utils';

const useChainSettings = (chainId) => {
  const [chainSettings, setChainSettings] = useState({});

  useEffect(() => {
    if (chainId) {
      const settings = NetworkConfig[chainId];

      if (settings) {
        setChainSettings(settings);
      }
    }
  }, [chainId]);

  return chainSettings;
};

export default useChainSettings;
