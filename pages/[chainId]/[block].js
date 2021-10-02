import { useRouter } from 'next/router';
import Countdown from '../../components/Countdown';
import { useBlockInfo } from '../../utils/blocks';
import networkConfig from '../../utils/networks';
import Header from '../../components/Header';
import InfoSection from '../../components/InfoSection';
import Hero from '../../components/Hero';

export default function Test() {
  const { query } = useRouter();
  const { chainId, block } = query;
  const { error, data } = useBlockInfo(chainId, block);
  const { name } =
    networkConfig.find((chain) => chain.chainId === Number(chainId)) || {};

  return (
    <>
      <Header />
      <Hero name={name} block={block} />
      <Countdown {...data} />
      <InfoSection />
    </>
  );
}
