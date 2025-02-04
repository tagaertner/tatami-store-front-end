import { formatAsDollars } from '../utils';
import { useAppDispatch }  from '../hooks/hooks';
import { Button } from './ui/button';
import { editItem, removeItemFromCartAsync } from '../features/cart/cartSlice';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';

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
  cartID,
  productID,
}: {
  amount: number;
  cartID: string;
  productID: string;
}) => {
  const dispatch = useAppDispatch();

  // Dispatch the async thunk for removal using the productID
  const removeItemFromTheCart = () => {
    dispatch(removeItemFromCartAsync(productID));
  };

  // Dispatch editItem to update the quantity
  const setAmount = (value: number) => {
    dispatch(editItem({ cartID, amount: value }));
  };

  return (
    <div className="sm:ml-4 md:ml-12">
      <SelectProductAmount
        amount={amount}
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