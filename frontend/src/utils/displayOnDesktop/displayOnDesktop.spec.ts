import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isMobile } from '../../util';
import displayOnDesktop from '.';

vi.mock('../../util');

describe('displayOnDesktop', () => {
  const mockedIsMobile = vi.mocked(isMobile);

  beforeEach(() => {
    mockedIsMobile.mockImplementation(() => false);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('is not shown when on mobile device', () => {
    mockedIsMobile.mockImplementation(() => true);
    const results = displayOnDesktop();

    expect(results).toEqual('');
  });

  it('is shown when on a non-mobile device', () => {
    const results = displayOnDesktop();

    expect(results).toEqual('md:inline');
  });
});
