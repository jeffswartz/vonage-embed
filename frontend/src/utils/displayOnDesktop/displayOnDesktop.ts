import { isMobile } from '../../util';

/**
 * Returns a Tailwind CSS class ensuring the Component is displayed only on medium-width desktop devices.
 * @returns {"md:inline" | ""} - The Tailwind class for displaying for medium and larger screens, or an empty string for mobile devices.
 */
const displayOnDesktop = (): 'md:inline' | '' => (!isMobile() ? 'md:inline' : '');

export default displayOnDesktop;
