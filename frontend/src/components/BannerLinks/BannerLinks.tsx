import { ReactElement } from 'react';
import GHRepoButton from '../GHRepoButton';

/**
 * BannerLinks Component
 *
 * Component holding different icon-buttons.
 * @returns {ReactElement} The BannerLinks component.
 */
const BannerLinks = (): ReactElement => {
  return (
    <div className="flex items-center">
      <GHRepoButton />
    </div>
  );
};

export default BannerLinks;
