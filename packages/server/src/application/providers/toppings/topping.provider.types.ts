export interface Topping {
  id: string;
  name: string;
  priceCents: number;
}

export interface CreateToppingInput {
  name: string;
  priceCents: number;
}

export interface UpdateToppingInput {
  id: string;
  name?: string | null;
  priceCents?: number | null;
}
