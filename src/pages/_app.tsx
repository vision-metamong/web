import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
              'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          }

          html,
          body {
            max-width: 100vw;
            overflow-x: hidden;
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            @supports (-webkit-appearance: none) and (stroke-color: transparent) {
              min-height: -webkit-fill-available;
            }
          }

          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      />
      <Image
        src="/bg.png"
        alt="Vercel Logo"
        width={1920}
        height={1080}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
