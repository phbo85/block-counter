import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button } from '@chakra-ui/react';
import { NetworkConfig } from '../utils';
import fetcher from 'swr-eth';
import { SWRConfig } from 'swr';
import { EthBalance } from './EthBalance';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEagerConnect } from '../hooks/useEagerConnect';
import { useInactiveListener } from '../hooks/useInactiveListener';
import useChainSettings from '../hooks/useChainSettings';

const supportedChainIds = [...Object.keys(NetworkConfig).map((x) => Number(x))];

export const injectedConnector = new InjectedConnector({
  supportedChainIds,
});

const Wallet = () => {
  const { library, activate, active, connector, chainId } = useWeb3React();
  const { color } = useChainSettings(chainId);

  const onClick = () => {
    activate(injectedConnector);
  };

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();

  React.useEffect(() => {
    console.log('Wallet running');
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // mount only once or face issues :P
  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      {active ? (
        <SWRConfig value={{ fetcher: fetcher(library) }}>
          <EthBalance />
        </SWRConfig>
      ) : (
        <Button colorScheme={color} variant="solid" onClick={onClick}>
          Connect
        </Button>
      )}
    </>
  );
};

export default Wallet;
