import '../index.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {ChakraProvider} from '@chakra-ui/react';
import theme from '@/theme';

const App: React.FC<AppProps> = ({Component, pageProps}) => (
  <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      
      <title>Front-End Challenge 🏅 2021</title>
    </Head>

    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
);

export default App;
