import { QuantitySelector } from '../components/cart/QuantitySelector';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

export type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  stock: number;
  setAmount: (value: number) => void;
};


type SelectProductAmountProps = {
  mode: Mode.CartItem | Mode.SingleProduct;
  amount: number;
  stock: number;
  setAmount: (value: number, stock: number) => void;
};

const SelectProductAmount: React.FC<SelectProductAmountProps> = ({ amount, stock, setAmount }) => {
  return (
    <>
      <h4 className="font-medium mb-2">Amount :</h4>
      <QuantitySelector value={amount} onChange={(val) => setAmount(val, stock)} max={stock} />
    </>
  );
};

export default SelectProductAmount;

