import { useRouter } from 'next/router';
import Countdown from '../../components/Countdown';
import { useBlockInfo } from '../../utils/blocks';
import networkConfig from '../../utils/networks';
import Header from '../../components/Header';

export default function Test() {
  const { query } = useRouter();
  const { chainId, block } = query;
  const { error, data } = useBlockInfo(chainId, block);
  const { name } =
    networkConfig.find((chain) => chain.chainId === Number(chainId)) || {};

  return (
    <>
      <Header name={name} block={block} />
      <Countdown {...data} />
    </>
  );
}
