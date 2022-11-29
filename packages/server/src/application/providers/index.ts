import { setupDb } from '../database';
import { PizzaProvider } from './pizzas/pizza.provider';
import { ToppingProvider } from './toppings/topping.provider';
import { CursorProvider } from './pizzas/cursor.provider';
const db = setupDb();

const toppingProvider = new ToppingProvider(db.collection('toppings'));
const cursorProvider = new CursorProvider(db.collection('pizzas'));
const pizzaProvider = new PizzaProvider(db.collection('pizzas'), toppingProvider, cursorProvider);

export { toppingProvider, pizzaProvider, cursorProvider };
