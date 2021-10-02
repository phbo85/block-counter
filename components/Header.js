import React from 'react';
import Image from 'next/image';

import {
  Flex,
  IconButton,
  Button,
  Link,
  useColorModeValue,
  useColorMode,
  chakra,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const bg = useColorModeValue('m', 'gray.800');
  const ref = React.useRef();

  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={'sm'}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor={`brand.400`}
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Heading size="sm">Block countdown estimation</Heading>
            </Flex>

            <Flex justify="flex-end" align="center" color="gray.400">
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
};

export default Header;
