import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Box } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { useWeb3React } from '@web3-react/core';
import { getERC20Contract } from '../context/contracts';
import { formatEther, parseEther } from '@ethersproject/units';

const Home: NextPage = () => {
  const trasferFormRef = React.useRef<HTMLFormElement>(null);
  const { library, account } = useWeb3React<Web3Provider>();
  const cont = getERC20Contract(library);
  const [daiBalance, setDaiBalance] = useState<string>('');
  const [amount, setAmount] = useState<string>();
  const [accountTo, setAccountTo] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pendingTx, setPendingTx] = useState<TransactionResponse>();

  useEffect(() => {
    if (library) {
      cont.balanceOf(account).then((bal: any) => setDaiBalance(bal));
    }
  }, [library, account, pendingTx]);

  const handleSubmitTransfer = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!amount || !accountTo) return;

    cont
      .transfer(accountTo, parseEther(amount))
      .then((tx: TransactionResponse) => {
        setPendingTx(tx);
        tx.wait().then((confirms) => {
          if (confirms) {
            setPendingTx(undefined);
          }
        });
      })
      .catch((e: Error) => {
        console.error(e);
      })
      .finally(() => {
        setSubmitted(false);
        trasferFormRef.current?.reset();
        setAccountTo('');
        setAmount('');
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
            helperText={`Balance: ${
              daiBalance && parseFloat(formatEther(daiBalance)).toFixed(2)
            } DAI`}
            variant="filled"
            fullWidth
            inputProps={{
              pattern: /([0-9]*[.])?[0-9]+/,
            }}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            id="recipients-address"
            label="Enter recipients address"
            variant="filled"
            fullWidth
            required
            onChange={(e) => setAccountTo(e.target.value)}
          />
        </Box>
        <Box mt={4} paddingX={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitted || !amount || !accountTo}>
            Send
          </Button>
        </Box>
        {pendingTx && (
          <Box mt={4} paddingX={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href={`${process.env.ETHERSCAN_URL}tx/${pendingTx?.hash}`}
              sx={{ textTransform: 'capitalize' }}
              target="_blank">
              View on Etherscan
            </Button>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default Home;
