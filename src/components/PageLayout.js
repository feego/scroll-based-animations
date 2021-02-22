import { css } from '@emotion/react';
import Head from 'next/head';

const Styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  `,
};

const TITLE_PREFIX = 'Title Prefix';

const PageLayout = ({ children, title = 'Title', description = 'Description', wrapperCSS }) => (
  <main css={[Styles.wrapper, wrapperCSS]}>
    <Head>
      <title>{`${TITLE_PREFIX} | ${title}`}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </main>
);

export default PageLayout;
