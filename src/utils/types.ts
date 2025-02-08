// export type ProductsResponse = {
//   data: Product[];
//   meta: ProductsMeta;
// };
// change for python
// export type ProductsResponse = {
//   data: Product[];
//   meta: {
//     pagination: {
//       total: number;
//       pageCount: number;
//       page: number;
//       pageSize: number;
//     };
//     categories: string[];
//   };
// };
// export type SelectProductAmount = {
//   amount: number;
//   stock: number;
//   setAmount: (value: number, stock: number) => void;
// }

export type ProductsResponse = {
  data: Product[];
  categories: string[];
  meta?: {
    pagination: Pagination;
  };
};

export type CartItem = {
  cartID: string;
  productID: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  availableStock: number;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  // shipping: number;
  tax: number;
  orderTotal: number;
};

export type Checkout = {
  name: string;
  address: string;
  chargeTotal: number;
  orderTotal: string;
  cartItems: CartItem[];
  numItemsInCart: number;
};
export type OrdersResponse = {
  data:Order[];
  meta: {
    pagination: Pagination;
  };
};
// changed for python
export type Order = {
  id: string;
  attributes: {
    name: string;
    address: string;
    numItemsInCart: number;
    orderTotal: string;
    createdAt: string;
  };
};
// export type Product = {
//   id: number;
//   attributes: {
//     category: string;
//     createdAt: string;
//     description: string;
//     featured: boolean;
//     image: string;
//     price: string;
//     publishedAt: string;
//     shipping: boolean;
//     title: string;
//     updatedAt: string;
    
//   };
// };

// export type Product ={
//   id: string,
//   attributes: {
//   description: string,
//   image: string,
//   is_active: boolean,
//   name: string,
//   price: number,
//   stock: number,
// }

// };
export type Product = {
  id: string;
  description: string;
  image_url: string;
  is_active: boolean;
  name: string;
  price: number;
  stock: number;
  categories: string[];
};

export type ProductsMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  categories: string[];
  companies: string[];
};


export type FormRangeProps = {
  label: string;
  name: string;
  defaultValue: string | number;
}

export type FormCheckboxProps = {
  name: string;
  label?: string;
  defaultValue?: string | number | boolean; 
};


// export type ProductsMeta = {
//   categories: string[];
//   companies: string[];
//   pagination: Pagination;
// };

export type Pagination = {
  total: number;
  pageCount: number;
  page: number;
  pageSize: number;
};

export type Params = {
  search?: string;
  category?: string;
  order?: string;
  price?: string;
  shipping?: string;
  page?: number;
};
export type User = {
  cognito_id: string;
  email: string;
  last_name: string;
  first_name: string;
  phone: string;
};
export type UserInfoProps = {
  user: User;
};
export interface UserState {
  user: User | null;
}


// export type ProductsResponseWithParams = ProductsResponse & { params: Params };
export type ProductsResponseWithParams = ProductsResponse & {
  params: Record<string, string>;
};

export type SingleProductResponse = {
  data: Product;
  meta: {
    pagination: Pagination;
  };
};
export interface Feature {
  title: string;
  description: string;
}

export interface ShippingInfo {
  id?: string; 
  name: string;
  address: string;
  address2?: string | null;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface SavedShippingInfoProps {
  onSelectShipping: (address: ShippingInfo) => void;
  selectedShippingId: string;
}
export interface CheckoutFormData {
  cardNumber: string;
  expiry: string; 
  cvc: string;
  name: string;
}

export interface CartTotalRowProps {
  label: string;
  amount: number;
  lastRow?: boolean;
}

