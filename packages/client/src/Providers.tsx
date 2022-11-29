import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloClientOptions,
  NormalizedCacheObject,
} from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';

import './index.css';
import { theme } from './theme/theme';

interface ProvidersProps {
  clientOptions?: Partial<ApolloClientOptions<NormalizedCacheObject>>;
}

const defaultClientOptions: ApolloClientOptions<NormalizedCacheObject> = {
  uri: process.env.REACT_APP_SERVER_URL,
  cache: new InMemoryCache({}),
};

const Providers: React.FC<ProvidersProps> = ({ clientOptions = {}, children }) => (
  <React.StrictMode>
    <ApolloProvider
      client={
        new ApolloClient({
          ...defaultClientOptions,
          ...clientOptions,
        })
      }
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

export { Providers };
