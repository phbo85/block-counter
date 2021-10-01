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
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Wallet from './Wallet';

const Header = ({ color, logo }) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef();

  const cl = useColorModeValue('gray.800', 'white');

  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={'sm'}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor={`${color}.400`}
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
              <Link href="/">
                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                >
                  Home
                </Button>
              </Link>
            </Flex>

            <Spacer />
            {logo && <Image src={logo} alt="logo" height={25} width={25} />}
            <Spacer />
            <Wallet />
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
