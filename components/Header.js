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
  const bg = useColorModeValue('m', 'gray.800');
  const ref = React.useRef();

  return (
    <chakra.header
      ref={ref}
      shadow={'sm'}
      transition="box-shadow 0.2s"
      bg={bg}
      w="full"
      overflowY="hidden"
      _before={{
        content: '" "',
        position: 'absolute',
        width: '100%',
        height: '4px',
        background: 'linear-gradient(90deg, #ff8800, #b026ff)',
      }}
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
            <Link href={'/'} passHref={true}>
              <a>
                <Heading size="sm">Block countdown estimation</Heading>
              </a>
            </Link>
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
  );
};

export default Header;
