import { describe, expect, it } from 'vitest';
import getInitials from './getInitials';

describe('getInitials', () => {
  it('does not throw when the name is empty', () => {
    let caughtError;
    let initials;

    const username = '';

    try {
      initials = getInitials(username);
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).toBeUndefined();
    expect(initials).toBe('');
  });
  it('returns capitalized initials for a lowercase username', () => {
    const lowercaseUsername = 'dvsn';

    const initials = getInitials(lowercaseUsername);

    expect(initials).toBe('D');
  });

  it('returns one character for one name', () => {
    const username = 'Lorde';

    const initials = getInitials(username);

    expect(initials).toBe('L');
  });

  it('returns two characters for two names', () => {
    const username = 'Julien Baker';

    const initials = getInitials(username);

    expect(initials).toBe('JB');
  });

  it("returns first and third names' first character for three names", () => {
    const username = 'Carly Rae Jepsen';

    const initials = getInitials(username);

    expect(initials).toBe('CJ');
  });

  it('returns the first name in a hyphenated last name', () => {
    const username = 'BenJarvus Green-Ellis';

    const initials = getInitials(username);

    expect(initials).toBe('BG');
  });

  it("returns first and last names' first character for n names", () => {
    const usernameArray = [
      'Daniel Michael Blake Day-Lewis',
      'Orlando Jonathan Blanchard Copeland Bloom',
      'Lionardo di ser Piero da Vinci',
      'Pablo Diego José Francisco de Paula Juan Nepomuceno Crispín Crispiniano María de los Remedios de la Santísima Trinidad Ruiz Picasso',
    ];
    const initialsArray = ['DD', 'OB', 'LV', 'PP'];

    usernameArray.forEach((username, index) => {
      const generatedInitials = getInitials(username);
      const expectedInitials = initialsArray[index];

      expect(generatedInitials).toBe(expectedInitials);
    });
  });
});
