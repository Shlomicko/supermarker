import { Cart } from './shopping-utils';

export interface GetCartResponse {
  message: string;
  cart: Cart[];
  hasOpenCart: boolean;
}

export interface CreateNewCartResponse {
  message: string;
  cart: Cart;
}
