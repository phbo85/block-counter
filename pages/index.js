import { Box } from '@chakra-ui/react';
import Layout from '../components/Layout';
import ChainList from '../components/ChainList';
import Title from '../components/Title';

export default function Home() {
  return (
    <Layout>
      <Box my="4">
        <Title>Please select a blockchain to get started.</Title>
      </Box>
      <ChainList />
    </Layout>
  );
}
