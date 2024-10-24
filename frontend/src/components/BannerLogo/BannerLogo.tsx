import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

/**
 * BannerLogo Component
 *
 * This component returns the logo that takes to the landing page when clicked.
 * @returns {ReactElement} - the banner logo component
 */
const BannerLogo = (): ReactElement => (
  <Link to="..">
    <div className="box-border">
      <img
        className="h-[72px] pl-4 pr-8 hidden md:flex"
        src="/images/vonage-logo-desktop.svg"
        alt="Vonage-logo"
      />
      <img
        className="h-10 my-4 px-8 md:hidden"
        src="/images/vonage-logo-mobile.svg"
        alt="Vonage-logo"
      />
    </div>
  </Link>
);

export default BannerLogo;
