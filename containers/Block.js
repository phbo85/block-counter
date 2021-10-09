import { useBlockInfo, isValidBlock } from '../utils/blocks';

import Countdown from '../components/Countdown';
import Error from '../components/Error';
import Loader from '../components/Loader';

const Block = ({ chain, block }) => {
  const { rpc } = chain;
  const { error, data } = useBlockInfo(rpc, block);

  if (!isValidBlock(block)) {
    return <Error message={`${block} is not a valid block.`} />;
  }

  if (error) {
    return <Error message="There was an error getting the block time." />;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Countdown {...data} />
    </>
  );
};

export default Block;
