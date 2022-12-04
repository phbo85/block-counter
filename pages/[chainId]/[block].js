import { useRouter } from 'next/router';
import Loader from '../../components/Loader';
import useNetworkConfig from '../../hooks/useNetworkConfig';
import Block from '../../containers/Block';
import Layout from '../../components/Layout';
import InfoSection from '../../components/InfoSection';
import Hero from '../../components/Hero';

const BlockPage = () => {
  const { query } = useRouter();
  const { chainId, block } = query;
  const { data: config, error: networkError } = useNetworkConfig(chainId);

  if (networkError) {
    return <Layout>Chain not supported</Layout>;
  }

  if (!config) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  const { name } = config;

  return (
    <Layout>
      <Hero name={name} block={block} />
      <Block chain={config} block={block} />
      <InfoSection />
    </Layout>
  );
};

export default BlockPage;
