import { SessionProvider, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import router from 'next/router';
import { useEffect } from 'react';
import '../styles/global.css'

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
