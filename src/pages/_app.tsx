import type { AppProps } from 'next/app';
import NavigationComponent from '../components/navigation/navigationComponent';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavigationComponent />
      <main style={{ paddingTop: '70px' }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}