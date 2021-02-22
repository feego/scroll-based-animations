import { TransitionGroup } from 'react-transition-group';
import { css } from '@emotion/react';

const Styles = {
  wrapper: css`
    position: relative;
    display: flex;
    flex: 1 1 0.00000001rem;
    flex-direction: column;
  `,
  overlayContainer: css`
    width: 100%;
  `,
};

function StatelessModalController({ children, wrapperCSS, onKeyDown, onModalClose, openedModals }) {
  return (
    <div css={[Styles.wrapper, wrapperCSS]} role="presentation" onKeyDown={onKeyDown}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div css={Styles.overlayContainer} tabIndex="0">
        <TransitionGroup>{openedModals.map((modal) => modal.renderer(modal.id, () => onModalClose(modal)))}</TransitionGroup>
      </div>
    </div>
  );
}

export default StatelessModalController;
