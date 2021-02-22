import { css } from '@emotion/react';
import Button from './Button';

const Styles = {
  closeButton: css`
    transform: rotateZ(45deg);
    transition: opacity 300ms, transform 300ms;
    border: 2px solid #ffffff;
    border-radius: 50%;
    padding: 0;
  `,

  closeButtonContent: css`
    font-size: 3rem;
    font-weight: 400;
    line-height: 1.5;
    width: 4rem;
    height: 4rem;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 992px) {
      font-size: 3.5rem;
      width: 5rem;
      height: 5rem;
      bottom: 5rem;
      right: 4rem;
      cursor: pointer;
    }
  `,
};

function CloseButton({ wrapperCSS, ...props }) {
  return (
    <Button wrapperCSS={[Styles.closeButton, wrapperCSS]} {...props}>
      <div css={Styles.closeButtonContent}>+</div>
    </Button>
  );
}

export default CloseButton;
