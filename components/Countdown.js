import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
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
    <>
      <StatGroup>
        <Stat>
          <StatNumber>{days}</StatNumber>
          <StatLabel>days</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{hours}</StatNumber>
          <StatLabel>hours</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{minutes}</StatNumber>
          <StatLabel>minutes</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{seconds}</StatNumber>
          <StatLabel>seconds</StatLabel>
        </Stat>
      </StatGroup>
      {date.toLocaleDateString()} {date.toLocaleTimeString()}
      <StatGroup>
        <Stat>
          <StatNumber>{currentBlock}</StatNumber>
          <StatLabel>Current Block</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{blockLeft}</StatNumber>
          <StatLabel>Blocks left</StatLabel>
        </Stat>
        <Stat>
          <StatNumber>{avgTime}</StatNumber>
          <StatLabel>Average blocktime</StatLabel>
        </Stat>
      </StatGroup>
    </>
  );
};

export default Countdown;
