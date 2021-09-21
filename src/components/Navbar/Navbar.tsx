import React from 'react';
import { indigo } from '@mui/material/colors';
import { Button, Typography, Box } from '@mui/material';
import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected, network } from '../../context/connectors';
import { Account, Balance } from '..';

enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
}

const connectorsByName: {
  [connectorName in ConnectorNames]: InjectedConnector | NetworkConnector;
} = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
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
