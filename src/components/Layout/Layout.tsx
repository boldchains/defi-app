import { Box } from '@mui/system';
import React, { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Box
        component="main"
        height="calc(100vh - 68px)"
        display="flex"
        alignItems="center">
        {children}
      </Box>
    </>
  );
};

export default Layout;
