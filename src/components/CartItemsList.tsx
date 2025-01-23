import { useAppSelector } from '../hooks/hooks';
import { Card } from './ui/card';

import { 
  FirstColumn, 
  SecondColumn,  
  ThirdColumn  
} from './CartItemColumns';

function CartItemsList() {
  const cartItems = useAppSelector((state) => state.cartState.cartItems);

  return (
    <div>
      {cartItems.map((cartItem) => {
        const { cartID, title, price, image, amount } =
          cartItem;
        return (
          <Card
            key={cartID}
            className='flex flex-col gap-y-4 sm:flex-row flex-wrap p-6 mb-8'
          >
            <FirstColumn image={image} title={title}/>
            <SecondColumn amount={amount} cartID={cartID}/> 
            <ThirdColumn price={price}/> 
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList


