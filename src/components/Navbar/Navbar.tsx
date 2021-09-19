import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';

const Navbar = () => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'primary.light',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <Typography variant="h6" component="h6">
        Defi App
      </Typography>
      <Button variant="contained">Connect Wallet</Button>
    </Box>
  );
};

export default Navbar;
