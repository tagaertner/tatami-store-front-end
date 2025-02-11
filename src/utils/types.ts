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
// 
export type User = {
  id?: string;
  username: string;
  email: string;
  jwt: string;
  first_name: string;  
  last_name: string;   
  phone: string;
}
export type UserInfoProps = {
  user: User | null;
};
export interface UserState {
  user: User | null;
}

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

export interface AddressFormData {
  lable: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  // Add other address fields
}

export interface PaymentMethodData {
  id: string;
  type: string;
  // Add other payment fields
}

export interface NewAddressFormProps {
  userId: string;
  onSubmit: (data: AddressFormData) => Promise<void>;
  onCancel: () => void;
}