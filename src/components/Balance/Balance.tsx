import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { Box } from '@mui/system';

const Balance = () => {
  const { account, library, chainId } = useWeb3React();
  const [balance, setBalance] = React.useState<string>();

  React.useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: string) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance('');
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Box component="span">
      {balance === null
        ? 'Error'
        : balance
        ? `${parseFloat(formatEther(balance)).toFixed(2)} ETH`
        : ''}
    </Box>
  );
};

export default Balance;
