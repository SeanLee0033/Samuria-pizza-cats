/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  rest,
  graphql,
  DefaultRequestBody,
  RequestParams,
  RestRequest,
  ResponseComposition,
  RestContext,
  GraphQLContext,
  GraphQLRequest,
  GraphQLVariables,
} from 'msw';
import { setupServer } from 'msw/node';

const isRestContext = (ctx: RestContext | GraphQLContext<Record<string, any>>): ctx is RestContext => {
  return 'json' in ctx && typeof ctx.json === 'function';
};

const handlerResponseMessage = (params: {
  apiType: 'rest' | 'graphql';
  url: URL;
  method: string;
}): { message: string } => {
  return {
    message: `The test is making a ${params.apiType} ${params.method} call to ${params.url}. Make sure to declare the handler using server.use in the test.`,
  };
};

const restResponse = (req: any, ctx: any) => {
  const response = handlerResponseMessage({
    apiType: 'rest',
    url: req.url,
    method: req.method,
  });

  console.error(response.message);

  return ctx.json(response);
};

const graphqlResponse = (req: any, ctx: any) => {
  const method = 'query' in req.body ? 'query' : 'mutation';

  const response = handlerResponseMessage({
    apiType: 'graphql',
    url: req.url,
    method: `${req.body.operationName} ${method}`,
  });

  console.error(response.message);

  return ctx.errors([response]);
};

const handlerResponse = (
  req: RestRequest<DefaultRequestBody, RequestParams> | GraphQLRequest<GraphQLVariables>,
  res: ResponseComposition<any>,
  ctx: RestContext | GraphQLContext<Record<string, unknown>>
) => {
  const response = isRestContext(ctx) ? restResponse(req, ctx) : graphqlResponse(req, ctx);

  return res(ctx.status(406), response);
};

const defaultHandlers = [
  graphql.mutation(/./, handlerResponse),
  graphql.query(/./, handlerResponse),
  rest.post(/./, handlerResponse),
  rest.get(/./, handlerResponse),
];

export const server = setupServer(...defaultHandlers);

export function setupMswServer() {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(async () => {
    server.resetHandlers();
  });
  afterAll(() => server.close());
}
