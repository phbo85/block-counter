import React from 'react';
import Link from 'next/link';

import {
  Flex,
  IconButton,
  useColorModeValue,
  useColorMode,
  chakra,
  Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Header = () => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <chakra.header
      shadow="sm"
      transition="box-shadow 0.2s"
      w="full"
      overflowY="hidden"
      h="16"
    >
      <Flex
        w="full"
        h="full"
        alignItems="center"
        justifyContent="space-between"
        border="1px solid"
        borderColor={useColorModeValue('gray.800', 'gray.200')}
      >
        <Flex align="flex-start" ml="4">
          <Link href={'/'} passHref={true}>
            <a>
              <Heading fontWeight="300" size="lg">
                Block countdown estimation
              </Heading>
            </a>
          </Link>
        </Flex>

        <Flex
          justify="center"
          align="center"
          border="1px solid"
          borderColor={useColorModeValue('gray.800', 'gray.200')}
          h="calc(100% + 2px)"
          w="16"
          m="-1px"
        >
          <IconButton
            h="full"
            w="full"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            onClick={toggleMode}
            icon={<SwitchIcon />}
            _hover={{
              bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}
          />
        </Flex>
      </Flex>
    </chakra.header>
  );
};

export default Header;
