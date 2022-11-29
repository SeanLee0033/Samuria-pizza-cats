import { Topping } from './';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppings: Array<Topping>;
  imgSrc: string;
  priceCents: number;
}
