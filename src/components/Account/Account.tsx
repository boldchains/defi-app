import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box } from '@mui/system';

const Account = () => {
  const { account } = useWeb3React();

  return (
    <Box component="span">
      {account === null
        ? '-'
        : account
        ? `${account.substring(0, 6)}...${account.substring(
            account.length - 4,
          )}`
        : ''}
    </Box>
  );
};

export default Account;
