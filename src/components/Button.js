import { css } from '@emotion/react';

export const Styles = {
  wrapper: css`
    display: block;
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;

    &[disabled] {
      opacity: 0.6;
      pointer-events: none;
    }
  `,
  primary: css`
    padding: 1rem 2rem;
    border: none;
    border-radius: 5rem;
    color: #ffffff;
    font-weight: 600;
    transition: all 100ms ease-out;
    text-transform: uppercase;

    &:hover {
      color: #000000;
      background-color: rgb(255, 255, 255, 0.9);
    }
  `,
};

const Button = ({ style = 'primary', wrapperCSS, ...props }) => <button css={[Styles.wrapper, Styles[style], wrapperCSS]} {...props} />;

export default Button;
