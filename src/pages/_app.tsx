import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { ThemeProvider } from '@emotion/react';
import { store } from '../redux/store';
import { Layout } from '../components';
import theme from '../theme';
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
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}
export default MyApp;
