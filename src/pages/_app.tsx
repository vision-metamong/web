import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Image from 'next/image';
import localFont from 'next/font/local';
import styled from '@emotion/styled';
import Link from 'next/link';

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
          @font-face {
            font-family: 'AvantGarde CE';
            src: url('/fonts/AvantGarde_CE_Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }

          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: 'AvantGarde CE', 'Pretendard', -apple-system,
              BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
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

          @media (max-width: 1300px) {
            body {
              height: 90vh;
              overflow-y: hidden;
            }
          }
        `}
      />
      <Image
        src="/bg.png"
        alt="Vercel Logo"
        width={1920}
        height={1080}
        style={{
          objectFit: 'cover',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
      />
      <Link href={'/'}>
        <Logo src={'/logo.png'} alt="Viva" width={166} height={46}></Logo>
      </Link>
      <Component {...pageProps} />
    </>
  );
}

const Logo = styled(Image)`
  position: absolute;
  top: 74px;
  left: 75px;

  @media (max-width: 1300px) {
    scale: 0.8;
    top: 50px;
    left: 50px;
  }
  @media (max-width: 700px) {
    scale: 0.5;
    top: 40px;
    left: 0px;
  }
`;
