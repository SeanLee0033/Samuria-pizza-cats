import { InMemoryCache } from '@apollo/client';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import { Providers } from '../../Providers';

const testCache = new InMemoryCache({});

const renderWithProviders = (ui: React.ReactElement, options = {}): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => <Providers clientOptions={{ cache: testCache }}>{children}</Providers>,
    ...options,
  });

export { renderWithProviders, testCache };
