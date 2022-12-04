import { useState, useEffect } from 'react';
import { getBlockInfo } from '../utils/blocks';

const useBlockInfo = (rpc, block) => {
  const [blockInfo, setBlockInfo] = useState({ error: null, data: null });
  let errorCount = 0;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (errorCount > 5) {
        clearInterval(intervalId);
        setBlockInfo({ data: null, error: 'there was an error' });
      }

      try {
        if (rpc && block) {
          const data = await getBlockInfo(rpc, block);
          setBlockInfo({ data, error: null });
        }
      } catch (error) {
        const { message = '' } = error;
        console.error(rpc, message);
        errorCount++;
        setBlockInfo({ data: null, error });
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [block, rpc, errorCount]);

  return blockInfo;
};

export default useBlockInfo;
