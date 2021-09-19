import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { ThemeProvider } from '@material-ui/styles';
import { Layout } from '../components';
import { lightTheme } from '../theme';
import '../styles/globals.css';

const getLibrary = (
  provider?: any,
  connector?: Required<Web3ReactContextInterface>['connector'],
): Web3Provider => {
  return new Web3Provider(provider);
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={lightTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}
export default MyApp;
