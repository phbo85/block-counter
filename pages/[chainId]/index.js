import { useRouter } from 'next/router';
import Chain from '../../containers/Chain';
import Layout from '../../components/Layout';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { isValidChainId } from '../../utils/blocks';

const ChainId = () => {
  const { query } = useRouter();
  const { chainId } = query;

  if (!chainId) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (!isValidChainId(chainId)) {
    return (
      <Layout>
        <Error message={`${chainId} is not supported`} />{' '}
      </Layout>
    );
  }

  return (
    <Layout>
      <Chain chainId={chainId} />
    </Layout>
  );
};
export default ChainId;
