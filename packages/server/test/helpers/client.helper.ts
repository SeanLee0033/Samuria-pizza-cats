/* eslint-disable @typescript-eslint/no-explicit-any */
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloQueryResult, MutationOptions, OperationVariables, QueryOptions } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { FetchResult } from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';

import { Query, Mutation } from '../../src/application/schema/types/schema';

class TestClient {
  private readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  public constructor(testTypeDefs: DocumentNode, resolvers: any) {
    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new SchemaLink({
        schema: makeExecutableSchema({ typeDefs: testTypeDefs, resolvers }),
      }),
    });
  }

  public async query<T = Query>(queryOptions: QueryOptions): Promise<ApolloQueryResult<T>> {
    return this.apolloClient.query<T>({
      fetchPolicy: 'no-cache',
      ...queryOptions,
    });
  }

  public async mutate(mutationOptions: MutationOptions<Mutation, OperationVariables>): Promise<FetchResult<Mutation>> {
    return this.apolloClient.mutate<Mutation>({
      fetchPolicy: 'no-cache',
      ...mutationOptions,
    });
  }
}

export { TestClient };
