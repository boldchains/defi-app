import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Box } from '@mui/material';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { accountSelector } from '../redux/account/selectors';
import { getWeakBalance } from '../redux/account/actions';
import { transactionSelector } from '../redux/transaction/selectors';
import { transferTx, waitTx } from '../redux/transaction/actions';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const transferFormRef = React.useRef<HTMLFormElement>(null);
  const { library, account } = useWeb3React<Web3Provider>();
  const { weakBalance } = useAppSelector(accountSelector);
  const { pending, tx } = useAppSelector(transactionSelector);
  const [amount, setAmount] = useState<string>();
  const [accountTo, setAccountTo] = useState<string>();

  useEffect(() => {
    dispatch(getWeakBalance({ library, account }));
  }, [library, account, pending]);

  useEffect(() => {
    const clearForm = () => {
      transferFormRef.current?.reset();
      setAmount('');
      setAccountTo('');
    };

    if (tx && pending) {
      dispatch(waitTx(tx));
    }
    if (!pending) {
      clearForm();
    }
  }, [pending, tx]);

  const handleSubmitTransfer = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!amount || !accountTo) return;

    dispatch(transferTx({ library, transferTo: accountTo, amount }));
  };

  return (
    <Container maxWidth="xs">
      <form
        ref={transferFormRef}
        onSubmit={handleSubmitTransfer}
        noValidate
        autoComplete="off">
        <Box>
          <TextField
            id="dai-amount"
            label="Enter DAI Amount"
            helperText={`Balance: ${
              weakBalance ? parseFloat(weakBalance).toFixed(2) : '0'
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
            disabled={pending || !amount || !accountTo}>
            Send
          </Button>
        </Box>
        {pending && (
          <Box mt={4} paddingX={4}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              href={`${process.env.ETHERSCAN_URL}tx/${tx?.hash}`}
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
