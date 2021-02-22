import { css } from '@emotion/react';
import Head from 'next/head';
import GlobalClicksHandler from '../components/GlobalClicksHandler';
import ModalsController from '../components/modals/ModalsController';
import ScrollContainer from '../components/scroll-container/ScrollContainer';
import { MediaContextProvider } from '../hooks/useMinWidthMediaQuery';
import { GlobalStyles } from '../styles/GlobalStyles';

const Styles = {
  globalClicksHandler: css`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    height: 100%;
  `,
  modalsController: css`
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    height: 100%;
  `,
};

const App = ({ Component, pageProps, router }) => {
  const { SITE_URL: siteURL = '' } = process.env;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=contain" />
        <link rel="canonical" href={siteURL + router.asPath} />
      </Head>
      <GlobalStyles />
      <MediaContextProvider>
        <GlobalClicksHandler wrapperCSS={Styles.globalClicksHandler}>
          <ModalsController wrapperCSS={Styles.modalsController}>
            <ScrollContainer useBodyScroller>
              <Component {...pageProps} />
            </ScrollContainer>
          </ModalsController>
        </GlobalClicksHandler>
      </MediaContextProvider>
    </>
  );
};

export default App;
