import { Product } from "../database/models";

declare module '../database/models' {
  interface Order {
    addProduct: (product: Product, options?: object) => Promise<void>;
  }

  interface Sale {
    addProduct: (product: Product, options?: object) => Promise<void>;
  }
}
