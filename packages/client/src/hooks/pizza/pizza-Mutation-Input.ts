export interface onCreateInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: string[];
}

export interface onDeleteInput {
  id: string;
}

export interface onUpdateInput {
  id: string;
  name?: string;
  description?: string;
  imgSrc?: string;
  toppingIds?: string[];
}
