import { css } from '@emotion/react';

const Styles = {
  wrapper: css`
    position: relative;
  `,
  content: css`
    will-change: opacity;
  `,
  overlay: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    will-change: opacity;
  `,
};

const LayerAnimatedContent = ({ overlayOpacity = 0, wrapperCSS, contentCSS, overlayCSS, children, ...props }) => (
  <div css={[Styles.wrapper, wrapperCSS]} {...props}>
    {children({ css: [Styles.content, contentCSS], style: { opacity: 1 - overlayOpacity } })}
    {children({ css: [Styles.overlay, overlayCSS], style: { opacity: overlayOpacity } })}
  </div>
);

export default LayerAnimatedContent;
