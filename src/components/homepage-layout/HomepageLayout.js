import PageLayout from '../PageLayout';
import { css } from '@emotion/react';
import { useClosestScrollValues } from '../scroll-container/scrollConnectors';
import { useMemo, useRef } from 'react';
import useContentScrollProgress, { getGlobalScrollProgress } from '../useContentScrollProgress';
import useMinWidthMediaQuery from '../../hooks/useMinWidthMediaQuery';
import { Breakpoints } from '../../styles/contants';
import LayerAnimatedContent from '../LayerAnimatedContent';

const Styles = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: 100%;
    color: #ffe5d2;
  `,
  page: css`
    min-height: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
  `,
  firstPage: css`
    z-index: initial;
  `,
  stickyHorizontalSections: css`
    width: 100%;
    display: flex;
    flex: 1 1 0.000001rem;
    flex-direction: row;
    justify-content: stretch;
    align-items: stretch;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    pointer-events: none;
  `,
  logoWrapper: css`
    will-change: transform;
    position: sticky;
    top: 2rem;
    z-index: 1;
  `,
  logo: css`
    color: rgb(3, 74, 70);
    font-size: 5.5rem;
    will-change: opacity;

    @media (min-width: ${Breakpoints.tabletPortrait}px) {
      font-size: 13rem;
    }
  `,
  invertedLogo: css`
    position: absolute;
    top: 0;
    left: 0;
    will-change: opacity;
    color: #ffe5d2;
  `,
  title: css`
    color: rgb(3, 74, 70);
  `,
  invertedTitle: css`
    color: #ffe5d2;
  `,
  gridSection: css`
    will-change: transform;
    flex: 1 1 0.000000001rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  leftGridSection: css`
    background: #009c7f;
    height: 64%;
    width: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    padding-bottom: 29.875%;

    @media (min-width: ${Breakpoints.tabletPortrait}px) {
      height: initial;
      width: initial;
      left: initial;
      top: initial;
      position: static;
      padding-bottom: initial;
    }
  `,
  rightGridSection: css`
    background: #4c34e0;
    height: 50%;
    width: 100%;
    left: 0px;
    top: 50%;
    position: absolute;

    @media (min-width: ${Breakpoints.tabletPortrait}px) {
      height: initial;
      width: initial;
      left: initial;
      top: initial;
      position: static;
    }
  `,
  background: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    will-change: opacity;
    z-index: 0;
    pointer-events: none;
  `,
  pageBackground: css`
    position: absolute;
    background: #ffba25;
  `,
  page3: css`
    position: relative;
  `,
  page3Content: css`
    z-index: 0;
  `,
};

const Page = ({ children, style, innerRef, wrapperCSS, ...props }) => (
  <div ref={innerRef} css={[Styles.page, wrapperCSS]} {...props}>
    {children}
  </div>
);

const Background = ({ opacity, color, wrapperCSS }) => (
  <div
    css={[
      Styles.background,
      wrapperCSS,
      css`
        background: ${color};
      `,
    ]}
    style={{ opacity }}
  />
);

const HomepageLayout = () => {
  const pageRefs = [useRef(), useRef(), useRef(), useRef()];
  const contentScrollProgress = useContentScrollProgress(pageRefs);
  const page3Progress = Math.max(Math.min(contentScrollProgress[2].progress, 0), -1);
  const currentBreakpoint = useMinWidthMediaQuery();
  const page3ProgressInPercentage = page3Progress * 100;
  const page3LeftGridSectionStyle =
    currentBreakpoint.value < Breakpoints.tabletPortrait
      ? {
          borderRadius: `${-page3ProgressInPercentage}%`,
          transform: `translateX(${-page3ProgressInPercentage}%) translateY(${page3ProgressInPercentage}%)`,
        }
      : { transform: `translateX(${page3ProgressInPercentage}%)` };
  const page3RightGridSectionStyle =
    currentBreakpoint.value < Breakpoints.tabletPortrait
      ? {
          borderRadius: `${-page3ProgressInPercentage}%`,
          transform: `translateX(${page3ProgressInPercentage}%) translateY(${-page3ProgressInPercentage}%)`,
        }
      : { transform: `translateX(${-page3ProgressInPercentage}%)` };
  const globalScrollProgress = useMemo(() => getGlobalScrollProgress(contentScrollProgress), [contentScrollProgress]);
  const secondSlideBackgroundOpacity = globalScrollProgress > 0.8 ? Math.min(1, (0.2 - (1 - globalScrollProgress)) / 0.2) : 0;
  const logoScalingFactor = Math.max(0.3, 1 - contentScrollProgress[0].progress);
  const windowHeight = useClosestScrollValues((state, scrollValues) => scrollValues.boundingRect.height);
  const page3HeightWithoutWindowHeight = contentScrollProgress[3].measurements.height - windowHeight;
  const page3OffsetAfterWindowHeightTheshold =
    contentScrollProgress[3].offset + windowHeight - (contentScrollProgress[3].measurements.height - page3HeightWithoutWindowHeight);
  const page3ProgressAfterWindowHeightThreshold =
    page3HeightWithoutWindowHeight > 0 ? page3OffsetAfterWindowHeightTheshold / page3HeightWithoutWindowHeight : 0;

  return (
    <PageLayout wrapperCSS={Styles.wrapper}>
      <Background opacity={1} color="#bae9bb" />
      <Background opacity={secondSlideBackgroundOpacity} color="#034a46" />
      <Page wrapperCSS={Styles.firstPage} innerRef={pageRefs[0]}>
        <LayerAnimatedContent
          wrapperCSS={Styles.logoWrapper}
          overlayOpacity={secondSlideBackgroundOpacity}
          contentCSS={Styles.logo}
          overlayCSS={[Styles.logo, Styles.invertedLogo]}
          style={{
            transform: `scale3d(${logoScalingFactor}, ${logoScalingFactor}, 1)`,
            position: logoScalingFactor === 0.3 ? 'absolute' : 'sticky',
          }}>
          {(props) => <h1 {...props}>Logo</h1>}
        </LayerAnimatedContent>
      </Page>
      <Page innerRef={pageRefs[1]}>
        <LayerAnimatedContent
          overlayOpacity={secondSlideBackgroundOpacity}
          contentCSS={Styles.title}
          overlayCSS={[Styles.title, Styles.invertedTitle]}>
          {(props) => <h2 {...props}>Title 2</h2>}
        </LayerAnimatedContent>
      </Page>
      <Page innerRef={pageRefs[2]}>
        <div css={Styles.stickyHorizontalSections}>
          <div css={[Styles.gridSection, Styles.leftGridSection]} style={page3LeftGridSectionStyle}>
            <h4>Left</h4>
          </div>
          <div css={[Styles.gridSection, Styles.rightGridSection]} style={page3RightGridSectionStyle}>
            <h4>Right</h4>
          </div>
        </div>
      </Page>
      <Page innerRef={pageRefs[3]} wrapperCSS={Styles.page3}>
        <Background wrapperCSS={Styles.pageBackground} color="#d8481a" />
        <Background
          wrapperCSS={Styles.pageBackground}
          opacity={Math.min(1, Math.max(0.0740741, 2 - page3ProgressAfterWindowHeightThreshold * 2))}
          color="#ff8173"
        />
        <Background
          wrapperCSS={Styles.pageBackground}
          opacity={Math.min(1, Math.max(0, 1 - page3ProgressAfterWindowHeightThreshold * 2))}
          color="#ffba25"
        />
        <div css={Styles.page3Content}>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
          <h2 css={Styles.title}>Title</h2>
        </div>
      </Page>
    </PageLayout>
  );
};

export default HomepageLayout;
