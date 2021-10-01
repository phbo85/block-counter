import { useRouter } from 'next/router';
import Countdown from '../../components/Countdown';
import { useBlockInfo } from '../../utils/blocks';

export default function Test() {
  const { query } = useRouter();
  const { chainId, block } = query;
  const { error, data } = useBlockInfo(chainId, block);

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <Countdown {...data} />
    </>
  );
}
