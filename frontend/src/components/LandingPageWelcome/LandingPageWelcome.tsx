import { ReactElement } from 'react';

/**
 * LandingPageWelcome Component
 * This component includes a welcome message to the users visiting the landing page.
 * @returns {ReactElement} - the landing page component
 */
const LandingPageWelcome = (): ReactElement => {
  return (
    <div className="ps-12 py-4 h-auto  shrink max-w-xl text-left">
      <h2 className="text-5xl font-bold text-black pb-5 w-9/12">
        Vonage Embed demo
      </h2>
      <h3 className="text-large text-slate-500">Select an option from the menu to the right.</h3>
      <p>
        This demo creates an embed iframe that uses a session created from a Vonage application ID. The embed uses code from the Vera sample app. Embed data is stored persistently in Firebase.
      </p>
    </div>
  );
};

export default LandingPageWelcome;
