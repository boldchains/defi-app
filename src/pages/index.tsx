import {
  Container,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from '@material-ui/core';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Container>
      <form>
        <FormControl>
          <TextField
            id="dai-amount"
            label="Enter DAI Amount"
            helperText={`Balance: ${'50.69'} DAI`}
            variant="filled"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField
            id="recipients-address"
            label="Enter recipients address"
            variant="filled"
            fullWidth
          />
        </FormControl>
      </form>
    </Container>
  );
};

export default Home;
