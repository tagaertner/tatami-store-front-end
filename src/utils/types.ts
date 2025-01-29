export type ProductsResponse = {
  data: Product[];
  meta: ProductsMeta;
};

export type CartItem = {
  cartID: string;
  productID: number;
  image: string;
  title: string;
  price: string;
  amount: number;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
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
export type Product = {
  id: number;
  attributes: {
    category: string;
    createdAt: string;
    description: string;
    featured: boolean;
    image: string;
    price: string;
    publishedAt: string;
    shipping: boolean;
    title: string;
    updatedAt: string;
  };
};

export type ProductsMeta = {
  categories: string[];
  companies: string[];
  pagination: Pagination;
};

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type Params = {
  search?: string;
  category?: string;
  company?: string;
  order?: string;
  price?: string;
  shipping?: string;
  page?: number;
};
export type User = {
  username: string;
  jwt: string;
  email: string;
  shippingInfo?: ShippingInfo[]; 
};
export type UserInfoProps = {
  user: User;
};
export interface UserState {
  user: User | null;
}

export type ProductsResponseWithParams = ProductsResponse & { params: Params };

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

