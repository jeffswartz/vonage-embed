import { ReactElement } from 'react';
import BannerLogo from '../BannerLogo';

/**
 * Banner Component
 *
 * This component returns a banner that includes a logo, current date/time, and some links.
 * @returns {ReactElement} - the banner component.
 */
const Banner = (): ReactElement => {
  return (
    <div className="flex flex-row justify-between">
      <BannerLogo />
    </div>
  );
};

export default Banner;
