import { Box, Heading, Text, Stack, useColorModeValue } from '@chakra-ui/react';

const InfoSection = () => {
  return (
    <Stack spacing="0" maxW="3xl" w="full">
      <Heading
        fontSize={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.200')}
        mb="-1px"
        p="4"
        w="full"
      >
        How is this calculated?
      </Heading>
      <Box
        p="4"
        mt="-1px"
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.200')}
      >
        <Text fontSize={'md'}>
          You might experience slight inaccuracies given the way we estimate the
          time. Currently, we take the average time of the last 1000 blocks to
          estimate how long it will take til the selected block is being
          reached. However, this can often change, especially if there&lsquo;s
          high load.
        </Text>
        <Text fontSize={'md'} mt="2">
          You&lsquo;ll get more accurate estimations by using the blockchain
          explorer of the chain you are querying, if available.
        </Text>
      </Box>
    </Stack>
  );
};

export default InfoSection;
