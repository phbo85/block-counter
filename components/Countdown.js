import React from 'react';
import { SimpleGrid, VStack } from '@chakra-ui/react';
import StatsCard from './StatCard';
const Countdown = ({
  days,
  hours,
  minutes,
  seconds,
  currentBlock,
  blockLeft,
  avgTime,
  totalSeconds = 0,
}) => {
  const date = new Date(new Date().getTime() + totalSeconds * 1000);
  const isLoading = !days && days !== 0;
  return (
    <VStack spacing="4" align="center" mb="8" w="full" maxW="3xl">
      <StatsCard
        title="Estimated date"
        stat={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
        showSkeleton={isLoading}
        skeletonHeight="36px"
        skeletonWidth="120px"
      />
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing="4" w="full">
        <StatsCard
          title="Days"
          stat={days}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="48px"
        />
        <StatsCard
          title="Hours"
          stat={hours}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="48px"
        />
        <StatsCard
          title="Minutes"
          stat={minutes}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="48px"
        />
        <StatsCard
          title="Seconds"
          stat={seconds}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="48px"
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" w="full">
        <StatsCard
          title="Current block"
          stat={currentBlock}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="150px"
        />
        <StatsCard
          title="Blocks left"
          stat={blockLeft}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="150px"
        />
        <StatsCard
          title="Average blocktime"
          stat={avgTime}
          showSkeleton={isLoading}
          skeletonHeight="36px"
          skeletonWidth="100px"
        />
      </SimpleGrid>
    </VStack>
  );
};

export default Countdown;
