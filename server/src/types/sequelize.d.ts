import { Product } from "../database/models";

declare module '../database/models' {
  interface Order {
    addProducts: (product: Product | Product[], options: {}) => Promise<void>;
  }

  interface Sale {
    addProducts: (product: Product | Product[]) => Promise<void>;
  }
}
