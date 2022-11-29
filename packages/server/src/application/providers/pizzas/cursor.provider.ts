import { Collection } from 'mongodb';
import { GetCursorResultInput } from './cursor.provider.type';
import { PizzaResponse } from './pizza.provider.types';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
export class CursorProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getCursorIndex(cursor: string): Promise<number> {
    if (cursor == 'initial') return 0;
    const pizzaIdArray = (await this.collection.find().toArray()).map((pizza) => pizza._id.toHexString());
    if (!cursor) return 0;
    const cursorIndex = pizzaIdArray.indexOf(cursor);
    return cursorIndex;
  }

  public async getCursorResult(input: GetCursorResultInput): Promise<PizzaResponse> {
    const { limit, cursor } = input;

    let hasNextPage = false;
    const itemsToSkip = (await this.getCursorIndex(cursor)) + 1;
    const mongoDocuments = await this.collection
      .find()
      .skip(itemsToSkip)
      .limit(limit + 1)
      .toArray();
    if (mongoDocuments.length > limit) {
      hasNextPage = true;
      mongoDocuments.pop();
    }
    const nextCursor = mongoDocuments.length < limit ? null : mongoDocuments[limit - 1]._id.toHexString();
    return {
      totalCount: mongoDocuments.length,
      hasNextPage,
      cursor: nextCursor,
      results: mongoDocuments.map(toPizzaObject),
    };
  }
}
