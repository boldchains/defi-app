import { Button, Container, FormControl, TextField, Box } from '@mui/material';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container maxWidth="xs">
      <form>
        <Box>
          <FormControl fullWidth>
            <TextField
              id="dai-amount"
              label="Enter DAI Amount"
              helperText={`Balance: ${'50.69'} DAI`}
              variant="filled"
              fullWidth
            />
          </FormControl>
        </Box>
        <Box mt={2}>
          <FormControl fullWidth>
            <TextField
              id="recipients-address"
              label="Enter recipients address"
              variant="filled"
              fullWidth
            />
          </FormControl>
        </Box>
        <Box mt={4} paddingX={4}>
          <Button variant="contained" color="primary" fullWidth>
            Send
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Home;
