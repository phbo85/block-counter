import { useColorModeValue, Button } from '@chakra-ui/react';

const ButtonComponent = ({ onClick, text, disabled }) => (
  <Button
    px={4}
    py={2}
    bg={useColorModeValue('gray.800', 'gray.200')}
    fontSize="lg"
    color={useColorModeValue('gray.200', 'gray.800')}
    fontWeight="bold"
    rounded="lg"
    textTransform="uppercase"
    _hover={{
      bg: useColorModeValue('gray.700', 'gray.400'),
      color: useColorModeValue('gray.400', 'gray.700'),
    }}
    _focus={{
      bg: 'linear-gradient(to right, #ff8800, #b026ff)',
      color: 'white',
    }}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </Button>
);
export default ButtonComponent;
