export interface Product {
    name: string;
    quantity: number;
    price: number;
    image: string;
    description: string;
    _id: string;
  }
  
  export interface Cart {
    _id: string;
    customerRef: string;
    date: number;
    status: number;
    products: Product[];
  }
  