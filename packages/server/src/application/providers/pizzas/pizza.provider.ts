import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Pizza, CreatePizzaInput, UpdatePizzaInput, PizzaResponse } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';
import { ToppingProvider } from '../toppings/topping.provider';
import { CursorProvider } from './cursor.provider';

import { QueryInput } from '../../schema/types/schema';
class PizzaProvider {
  constructor(
    private collection: Collection<PizzaDocument>,
    private toppingProvider: ToppingProvider,
    private cursorProvider: CursorProvider
  ) {}

  public async getPizzas(input?: QueryInput): Promise<PizzaResponse> {
    if (!input) return await this.cursorProvider.getCursorResult({ limit: 5, cursor: 'initial' });
    const pizzaResponse = await this.cursorProvider.getCursorResult(input);
    return pizzaResponse;
  }
  public async validateToppings(toppingsIds: string[]): Promise<void> {
    const toppingIds_ObejctId: ObjectId[] = toppingsIds.map((id) => new ObjectId(id));
    const numberOfToppings = (await this.toppingProvider.getToppingsByIds(toppingIds_ObejctId))?.length;
    if (toppingsIds.length != numberOfToppings) {
      throw new Error('Invalid toppings are included');
    }
  }
  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const stringInputs = [input.name, input.description, input.imgSrc];

    // MongoDb request ObjectId type for it's id fields
    const toppingIds_ObjectId = input.toppingIds.map((topping) => new ObjectId(topping));
    validateStringInputs(stringInputs); // validate inputs
    await this.validateToppings(input.toppingIds); // validate Toppings

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...input,
          toppingIds: toppingIds_ObjectId,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async deletePizza(id: string): Promise<string> {
    const pizzaId = new ObjectId(id);
    const pizzaData = await this.collection.findOneAndDelete({ _id: pizzaId });
    const pizza = pizzaData.value;

    if (!pizza) throw new Error('Could not delete the pizza');

    return id;
  }

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, imgSrc, toppingIds } = input;
    const toppingIds_ObjectId = toppingIds?.map((toppingId) => new ObjectId(toppingId));
    const stringInputs = [name, description, imgSrc];
    validateStringInputs(stringInputs);
    if (toppingIds) {
      await this.validateToppings(toppingIds);
    }
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingIds && { toppingIds: toppingIds_ObjectId }),
        },
      },
      { returnDocument: 'after' }
    );
    if (!data.value) {
      throw new Error('could not update the pizza');
    }
    const pizza = data.value;
    return toPizzaObject(pizza);
  }
}

export { PizzaProvider };
