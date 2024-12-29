import { Product } from "../database/models";

declare module '../database/models' {
  interface Order {
    addProducts: (product: Product | Product[], options: {}) => Promise<void>;
  }

  interface Sale {
    addProduct: (product: Product, options?: object) => Promise<void>;
  }
}
