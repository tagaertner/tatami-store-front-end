import { formatAsDollars } from '../utils';
import { useAppDispatch }  from '../hooks/hooks';
import { Button } from './ui/button';
import { removeItemFromCartAsync } from '../features/cart/cartSlice';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';
import { updateCartItemQuantityAsync } from '../features/cart/cartSlice';

export const FirstColumn = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <img
      src={image}
      alt={title}
      className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
    />
  );
};

export const SecondColumn = ({
  amount,
  productID,
  stock,
}: {
  amount: number;
  productID: string;
  stock: number;
}) => {
  const dispatch = useAppDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItemFromCartAsync(productID));
  };

  const setAmount = (value: number, stock: number) => {
    if (value > stock) value = stock;
    dispatch(updateCartItemQuantityAsync({ productID, newQuantity: value }));
  };

  return (
    <div className="sm:ml-4 md:ml-12">
      <SelectProductAmount
        amount={amount}
        stock={stock}
        setAmount={setAmount}
        mode={Mode.CartItem}
      />

      <Button variant="link" className="-ml-4" onClick={removeItemFromTheCart}>
        remove
      </Button>
    </div>
  );
};

export const ThirdColumn = ({ price }: { price: string }) => {
  return <p className='font-medium sm:m-auto'>{formatAsDollars(price)}</p>;
};