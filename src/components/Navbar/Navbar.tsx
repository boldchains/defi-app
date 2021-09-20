import { Button, Typography, Box } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import React from 'react';
import { injected, ledger } from '../../connectors';
import { Account, Balance } from '..';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

enum ConnectorNames {
  Injected = 'Injected',
  Ledger = 'Ledger',
}

const connectorsByName: {
  [connectorName in ConnectorNames]: InjectedConnector | LedgerConnector;
} = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Ledger]: ledger,
};

const Navbar = () => {
  const { activate, active } = useWeb3React();

  const connectWallet = (con = connectorsByName['Injected']) => {
    try {
      activate(con, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(con);
        }
      });
    } catch (error) {
      alert('Failed to connect.');
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: indigo[500],
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <Typography variant="h6" component="h6">
        Defi App
      </Typography>
      {active ? (
        <Box display="flex" flexDirection="column" textAlign="end">
          <Account />
          <Balance />
        </Box>
      ) : (
        <Button
          color="primary"
          variant="outlined"
          sx={{
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'white',
            },
          }}
          onClick={() => connectWallet()}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
