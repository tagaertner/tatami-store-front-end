import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  customFetch,
  formatAsDollars,
  type Product,
} from '../utils';
import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Separator } from '../components/ui/separator';
import { SelectProductAmount } from '../components';
import { type LoaderFunction } from 'react-router-dom';
import { Mode } from '../components/SelectProductAmount';
import { useAppDispatch/* , useAppSelector */ } from '../lib/hooks';
import { addItemToCartAsync } from '../features/cart/cartSlice';

// Loader function to fetch the single product
export const loader: LoaderFunction = async ({ params }): Promise<Product> => {
  const response = await customFetch<Product>(`/products/${params.id}`);
  return response.data;
};

function SingleProduct() {
  // Get the product data from the loader
  const product = useLoaderData() as Product;
  const { image_url, name, price, description, id } = product;
  const dollarsAmount = formatAsDollars(price);
  const [amount, setAmount] = useState(1);
  
  // Initialize the Redux dispatch hook
  const dispatch = useAppDispatch();

  // Optionally, if you need to check user authentication:
  // const user = useAppSelector((state) => state.userState.user);


  // Create a cart item based on the product details and selected amount.
  // Adjust the field names to match your CartItem type.
  const cartProduct = {
    cartID: id.toString(), // Use product id as a simple cart identifier.
    productID: id,
    image: image_url,      // Or use image_url if that’s your property.
    title: name,           // Adjust if your CartItem expects "title" or "name"
    price: price.toString(), // Convert price to string if necessary
    amount,                // Selected amount
    availableStock: product.stock, // Add the stock (availableStock) from the product.
  };

  // Function to add the item to the cart.
  // If the user is authenticated, this dispatches the async thunk.
  const addToCart = () => {
    dispatch(addItemToCartAsync(cartProduct));
  };

  return (
    <section>
      <div className='flex gap-x-2 h-6 items-center'>
        <Button asChild variant='link' size='sm'>
          <Link to='/'>Home</Link>
        </Button>
        <Separator orientation='vertical' />
        <Button asChild variant='link' size='sm'>
          <Link to='/products'>Go Back To Products</Link>
        </Button>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE COL */}
        <img
          src={image_url}
          alt={name}
          className='w-96 h-96 object-cover rounded-lg lg:w-full'
        />
        {/* PRODUCT INFO COL */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{name}</h1>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
            {dollarsAmount}
          </p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* AMOUNT SELECTOR */}
          <SelectProductAmount
            mode={Mode.SingleProduct}
            amount={amount}
            setAmount={(val) => setAmount(val)} // you can ignore the second parameter if needed
            stock={product.stock}
          />          {/* ADD TO CART BUTTON */}
          <Button size='lg' className='mt-10' onClick={addToCart}>
            Add to bag
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;