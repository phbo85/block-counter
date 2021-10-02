import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';

const InfoSection = () => {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'}>
        <Heading fontSize={'xl'}>How is this calculated?</Heading>
        <Text color={'gray.600'} fontSize={'md'}>
          You might experience slight inaccuracies given the way we estimate the
          time. Currently, we take the average time of the last 1000 blocks to
          estimate how long it will take til the selected block is being reacht.
          However, this can often change, especially if there&lsquo;s high load.
        </Text>
        <Text color={'gray.600'} fontSize={'md'}>
          You&lsquo;ll get more accurate estimations by using the blockchain
          explorer of the chain you are querying, if available.
        </Text>
      </Stack>
    </Box>
  );
};

export default InfoSection;
