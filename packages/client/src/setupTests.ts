import '@testing-library/jest-dom';

import { testCache } from './lib/test/renderWithProviders';
import { setupMswServer } from './lib/test/msw-server';

setupMswServer();

beforeEach(async () => {
  jest.resetAllMocks();

  await testCache.reset();
});
