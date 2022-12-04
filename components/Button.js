import { useColorModeValue, Button } from '@chakra-ui/react';

const ButtonComponent = ({ children, onClick, disabled, ...rest }) => (
  <Button
    w="full"
    variant="outline"
    color={useColorModeValue('gray.600', 'gray.400')}
    fontWeight="300"
    size="md"
    borderRadius="0"
    borderColor={useColorModeValue('gray.600', 'gray.400')}
    role="group"
    _hover={{
      color: useColorModeValue('gray.900', 'gray.100'),
      borderColor: useColorModeValue('gray.900', 'gray.100'),
    }}
    pos="relative"
    disabled={disabled}
    onClick={onClick}
    {...rest}
  >
    {children}
  </Button>
);
export default ButtonComponent;
