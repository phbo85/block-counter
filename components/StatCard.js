import {
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
  useColorModeValue,
} from '@chakra-ui/react';

const StatsCard = ({
  title,
  stat,
  showSkeleton,
  skeletonHeight = '24px',
  skeletonWidth = '36px',
}) => {
  return (
    <Stat
      w="full"
      px={{ base: 4, md: 8 }}
      py={'5'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.200')}
    >
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {showSkeleton ? (
          <Skeleton height={skeletonHeight} width={skeletonWidth} />
        ) : (
          <StatNumber textAlign="center">{stat}</StatNumber>
        )}
      </StatNumber>
      <StatLabel fontWeight={'medium'} isTruncated textAlign="center">
        {title}
      </StatLabel>
    </Stat>
  );
};

export default StatsCard;
