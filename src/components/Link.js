import NextLink from 'next/link';
import { Styles } from './Button';

const Link = ({ href, style = 'primary', wrapperCSS, children, ...props }) => (
  <NextLink href={href} passHref>
    <a css={[Styles.wrapper, Styles[style], wrapperCSS]} {...props}>
      {children}
    </a>
  </NextLink>
);
export default Link;
