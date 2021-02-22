import FixedBackgroundImage from '../components/FixedBackgroundImage';
import PageLayout from '../components/PageLayout';
import backgroundImage from '../components/homepage-layout/background.jpg';
import Header from '../components/homepage-layout/Header';
import { css } from '@emotion/react';
import { Breakpoints } from '../styles/contants';

const Styles = {
  header: css`
    position: fixed;
    z-index: 1;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;
    z-index: 0;
    padding: 4rem;
    line-height: 1.5;

    @media (min-width: ${Breakpoints.desktop}px) {
      padding: 8rem;
    }
  `,
  title: css`
    font-weight: 600;
    opacity: 0.7;
    font-size: 12rem;

    @media (min-width: ${Breakpoints.desktop}px) {
      font-size: 22rem;
    }
  `,
  message: css`
    font-size: 3rem;
    font-weight: 300;
    opacity: 0.7;

    @media (min-width: ${Breakpoints.desktop}px) {
      font-size: 4rem;
    }
  `,
};

const ErrorPage = () => {
  return (
    <PageLayout title="404: Page not found">
      <FixedBackgroundImage priority loading="eager" src={backgroundImage} />
      <Header wrapperCSS={Styles.header} />
      <div css={Styles.content}>
        <h1 css={Styles.title}>404</h1>
        <h2 css={Styles.message}>Ups, parece que a página que procuras não existe...</h2>
      </div>
    </PageLayout>
  );
};

export default ErrorPage;
