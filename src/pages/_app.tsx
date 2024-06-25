import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }

          html,
          body {
            max-width: 100vw;
            overflow-x: hidden;
          }

          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}
