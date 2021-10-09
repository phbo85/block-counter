import Layout from '../components/Layout';
import ChainList from '../components/ChainList';
import Title from '../components/Title';

export default function Home() {
  return (
    <Layout>
      <Title>Please select a blockchain to get started.</Title>

      <ChainList />
    </Layout>
  );
}
