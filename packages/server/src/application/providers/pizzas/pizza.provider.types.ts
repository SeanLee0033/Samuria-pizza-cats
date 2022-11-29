export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
}

export interface PizzaResponse {
  cursor: string | null;
  hasNextPage: Boolean;
  totalCount: number;
  results: Pizza[];
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  toppingIds?: string[] | null;
  imgSrc?: string | null;
}
