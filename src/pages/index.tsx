import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Box } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { getERC20Contract } from '../context/contracts';
import { formatEther, parseEther } from '@ethersproject/units';
import { ErrorCode } from '@ethersproject/logger';

const Home: NextPage = () => {
  const trasferFormRef = React.useRef<HTMLFormElement>(null);
  const { library, account } = useWeb3React<Web3Provider>();
  const cont = getERC20Contract(library);
  const [daiBalance, setDaiBalance] = useState<string>('');
  const [amount, setAmount] = useState<string>();
  const [accountTo, setAccountTo] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (library) {
      cont.balanceOf(account).then((bal: any) => setDaiBalance(bal));
    }
  }, [library, account]);

  const handleSubmitTransfer = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!amount || !accountTo) return;

    cont
      .transfer(accountTo, parseEther(amount))
      .then((res: any) => {
        console.log(res);
      })
      .catch((e: Error) => {
        console.log(e);
      })
      .finally(() => {
        setSubmitted(false);
        trasferFormRef.current?.reset();
      });

    setSubmitted(true);
  };

  return (
    <Container maxWidth="xs">
      <form
        ref={trasferFormRef}
        onSubmit={handleSubmitTransfer}
        noValidate
        autoComplete="off">
        <Box>
          <TextField
            id="dai-amount"
            label="Enter DAI Amount"
            helperText={`Balance: ${daiBalance && formatEther(daiBalance)} DAI`}
            variant="filled"
            fullWidth
            inputProps={{
              pattern: /([0-9]*[.])?[0-9]+/,
            }}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            id="recipients-address"
            label="Enter recipients address"
            variant="filled"
            fullWidth
            onChange={(e) => setAccountTo(e.target.value)}
          />
        </Box>
        <Box mt={4} paddingX={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitted}>
            Send
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Home;
