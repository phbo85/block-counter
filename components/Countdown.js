import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Skeleton,
  VStack,
} from '@chakra-ui/react';

const Countdown = ({
  days,
  hours,
  minutes,
  seconds,
  currentBlock,
  blockLeft,
  avgTime,
  totalSeconds = 0,
}) => {
  const date = new Date(new Date().getTime() + totalSeconds * 1000);
  return (
    <VStack spacing="24px" align="center">
      <StatGroup>
        <Stat m="2">
          {days || days === 0 ? (
            <StatNumber>
              {date.toLocaleDateString()} {date.toLocaleTimeString()}
            </StatNumber>
          ) : (
            <Skeleton height="36px" width="120px" />
          )}
          <StatLabel>estimated date</StatLabel>
        </Stat>
      </StatGroup>
      <StatGroup>
        <Stat mx="4">
          {days || days === 0 ? (
            <StatNumber>{days}</StatNumber>
          ) : (
            <Skeleton height="36px" width="48px" />
          )}
          <StatLabel>days</StatLabel>
        </Stat>
        <Stat mx="4">
          {hours || hours === 0 ? (
            <StatNumber>{hours}</StatNumber>
          ) : (
            <Skeleton height="36px" width="48px" />
          )}
          <StatLabel>hours</StatLabel>
        </Stat>
        <Stat mx="4">
          {minutes || minutes === 0 ? (
            <StatNumber>{minutes}</StatNumber>
          ) : (
            <Skeleton height="36px" width="48px" />
          )}
          <StatLabel>minutes</StatLabel>
        </Stat>
        <Stat mx="4">
          {seconds || seconds === 0 ? (
            <StatNumber>{seconds}</StatNumber>
          ) : (
            <Skeleton height="36px" width="48px" />
          )}
          <StatLabel>seconds</StatLabel>
        </Stat>
      </StatGroup>

      <StatGroup>
        <Stat mx="4">
          {currentBlock || currentBlock === 0 ? (
            <StatNumber>{currentBlock}</StatNumber>
          ) : (
            <Skeleton height="36px" width="150px" />
          )}
          <StatLabel>Current Block</StatLabel>
        </Stat>
        <Stat mx="4">
          {blockLeft || blockLeft === 0 ? (
            <StatNumber>{blockLeft}</StatNumber>
          ) : (
            <Skeleton height="36px" width="150px" />
          )}
          <StatLabel>Blocks left</StatLabel>
        </Stat>
        <Stat mx="4">
          {avgTime || avgTime === 0 ? (
            <StatNumber>{avgTime}</StatNumber>
          ) : (
            <Skeleton height="36px" width="100px" />
          )}
          <StatLabel>Average blocktime</StatLabel>
        </Stat>
      </StatGroup>
    </VStack>
  );
};

export default Countdown;
