import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  VisuallyHidden,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import useChainSettings from '../hooks/useChainSettings';

import TotalDeposits from './TotalDeposits';
import SwapABI from '../abi/swap.abi.json';
import ERC20ABI from '../abi/ERC20.abi.json';
import Error from '../components/Error';

const MULTIPLICATOR = 1000000;

const toBN = (value = 0) => BigNumber.from(value);
const fromBN = (value) => {
  return value ? Number(BigNumber.from(value).toString()) / MULTIPLICATOR : 0;
};

const Component = ({ smartContract }) => {
  const [allowance, setAllowance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [canInteract, setCanInteract] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [contractInfo, setContractInfo] = useState(null);
  const { account, library, active, chainId } = useWeb3React();
  const { stable = {}, color } = useChainSettings(chainId);
  const { address: stableAddress, symbol } = stable;

  const usdcContract = useMemo(
    () =>
      stableAddress
        ? new Contract(stableAddress, ERC20ABI, library.getSigner())
        : null,
    [library, stableAddress]
  );

  useEffect(() => {
    if (smartContract) {
      setInputAddress(smartContract);
      setContract(new Contract(smartContract, SwapABI, library.getSigner()));
    }
  }, [smartContract, library]);

  useEffect(() => {
    setCanInteract(globalError ? false : canInteract);
  }, [globalError, canInteract]);
  useEffect(() => {
    setCanInteract(contract && active && contract.address === inputAddress);

    const getContractInfo = async () => {
      if (contract && account) {
        let users;
        try {
          users = await contract.getUsers();
        } catch (error) {
          setGlobalError(error);
          return;
        }

        const enhancedUsers = await Promise.all(
          users.map(async (user, index) => {
            const { depositedUSDC } = await contract.getDeposits(
              BigNumber.from(index)
            );
            return { user, balance: fromBN(depositedUSDC) };
          })
        );

        setContractInfo(enhancedUsers.filter(({ balance }) => balance > 0));
      }
    };

    const getTotalDeposits = async () => {
      if (contract && account) {
        try {
          const total = await contract.getTotalDeposits();
          setTotalDeposit(fromBN(total));
        } catch (error) {
          setGlobalError(error);
        }
      }
    };
    const getAllowance = async () => {
      if (active && contract) {
        const allowance = await usdcContract.allowance(
          account,
          contract.address
        );

        if (allowance) {
          setAllowance(fromBN(allowance));
          console.log('usdc allowance', fromBN(allowance));
        }
      }
    };
    const getUSDCBalance = async () => {
      if (active && contract) {
        const balance = await usdcContract.balanceOf(account);

        if (balance) {
          setUsdcBalance(fromBN(balance));
          console.log('usdc wallet balance', fromBN(balance));
        }
      }
    };

    const getContractBalance = async () => {
      if (contract && account) {
        try {
          const { depositedUSDC } = await contract.getInfo();

          if (depositedUSDC) {
            setContractBalance(fromBN(depositedUSDC));
            console.log('deposit balance', fromBN(depositedUSDC));
          }
        } catch (error) {
          setGlobalError(error);
        }
      }
    };

    library.on('block', () => {
      getAllowance();
      getUSDCBalance();
      getContractBalance();
      getContractInfo();
      getTotalDeposits();
    });

    getAllowance();
    getUSDCBalance();
    getContractBalance();
    getContractInfo();
    getTotalDeposits();

    return () => {
      library.removeAllListeners('block');
    };
  }, [active, account, usdcContract, contract, inputAddress, library]);

  const onSetDepositAmount = (value) => {
    console.log(value);
    setDepositAmount(Number(value) || 0);
  };

  const onSetWithdrawalAmount = (value) => {
    console.log(value);
    setWithdrawalAmount(Number(value) || 0);
  };

  const onSetContract = (e) => {
    const id = e.target.value;
    setInputAddress(id);

    if (id && isAddress(id)) {
      const newContract = new Contract(id, SwapABI, library.getSigner());
      if (newContract) {
        setContract(newContract);
        setAddressError(false);
      }
    } else {
      setAddressError(true);
    }
  };
  const doInteraction = async ({ interaction, params, setter }) => {
    setter(true);
    setError(null);

    try {
      await interaction(...params);
      setter(false);
    } catch (error) {
      setError(error.message);
      setter(false);
    }
  };
  const onClickDeposit = async () => {
    const amount = depositAmount ? depositAmount * MULTIPLICATOR : 0;

    doInteraction({
      interaction: contract.deposit,
      params: [toBN(amount)],
      setter: setDepositLoading,
    });
  };

  const onClickApprove = async () => {
    // const approvalAmount = depositAmount ? depositAmount * MULTIPLICATOR : -1;
    const approvalAmount = BigNumber.from(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    doInteraction({
      interaction: usdcContract.approve,
      // params: [contract.address, toBN(approvalAmount)],
      params: [contract.address, approvalAmount],
      setter: setApproveLoading,
    });
  };

  const onClickWithdraw = async () => {
    const amount = withdrawalAmount ? withdrawalAmount * MULTIPLICATOR : 0;

    doInteraction({
      interaction: contract.withDrawMyDeposits,
      params: [toBN(amount)],
      setter: setWithdrawLoading,
    });
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'inherit')} p={10}>
        <Box mt={[10, 0]}>
          <Box px={[4, 0]}>
            <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
              Contract deposit
            </Heading>
            <Text>
              Enter contract first and then deposit or withdraw {symbol}
            </Text>
          </Box>

          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={useColorModeValue('white', 'gray.700')}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              <FormControl as={GridItem} colSpan={[8, 8]}>
                <FormLabel
                  htmlFor="contract"
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}
                >
                  Contract
                </FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    name="contract"
                    id="contract"
                    mt={1}
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    rounded="md"
                    onChange={onSetContract}
                    isInvalid={addressError}
                    value={inputAddress}
                  />
                  {contract && inputAddress === contract.address && (
                    <InputRightElement>
                      <CheckIcon color="green.500" />
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>
            </SimpleGrid>
          </Stack>
        </Box>
        <Box mt={[10, 0]}>
          <Stack
            px={4}
            py={5}
            p={[null, 6]}
            bg={useColorModeValue('white', 'gray.700')}
            spacing={6}
          >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <GridItem mt={[5, null, 0]} colSpan={{ base: 1 }}>
                <Stat>
                  <StatLabel>Deposited</StatLabel>
                  <StatNumber>
                    {canInteract && <div>{contractBalance}</div>}
                    {/*
                      <ContractBalance
                        {...USDC_POLYGON}
                        address={'0x1Ac829eAA2f0f629b2F6a016968B35D37965e44d'}
                      />
                    */}
                  </StatNumber>
                  <StatHelpText>{symbol}</StatHelpText>
                </Stat>
              </GridItem>
              <GridItem mt={[5, null, 0]} colSpan={{ base: 1 }}>
                <Stat>
                  <StatLabel>Wallet</StatLabel>
                  <StatNumber>
                    {/*
                      <TokenBalance {...USDC_POLYGON} />
                     */}
                    {usdcBalance}
                  </StatNumber>
                  <StatHelpText>{symbol}</StatHelpText>
                  <VisuallyHidden>{allowance}</VisuallyHidden>
                </Stat>
              </GridItem>
            </SimpleGrid>
            {globalError && (
              <Error
                message="Looks like there was a problem with the smart contract. Please make
              sure you are connected to the correct network and you are trying
              to deposit into the correct contract."
              />
            )}

            {error && <Error message={error.message || error} />}
          </Stack>
        </Box>
      </Box>
      {contract && (
        <TotalDeposits
          totalDeposit={totalDeposit}
          contractInfo={contractInfo}
          color={color}
        />
      )}
    </>
  );
};

export default Component;
