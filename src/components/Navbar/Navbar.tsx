import { Button, Typography, Box } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import React from 'react';

const Navbar = () => {
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
      <Button
        color="primary"
        variant="outlined"
        sx={{
          bgcolor: 'white',
          '&:hover': {
            bgcolor: 'white',
          },
        }}>
        Connect Wallet
      </Button>
    </Box>
  );
};

export default Navbar;
