import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  customFetch,
  formatAsDollars,
  type Product,
  // type CartItem
} from '../utils';
import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Separator } from '../components/ui/separator';
import { SelectProductAmount } from '../components';
import { type LoaderFunction } from 'react-router-dom';
import { Mode } from '../components/SelectProductAmount';
// import { useAppDispatch } from '../lib/hooks';
// import { addItem } from '../features/cart/cartSlice';

export const loader: LoaderFunction = async ({ params }): Promise<Product> => {

  const response = await customFetch<Product>(
    `/products/${params.id}`
  );

  return response.data
};

function SingleProduct() {
  const loaderData = useLoaderData() as Product;

  const product = loaderData;

  const { image_url, name, price, description } =
    product;

  const dollarsAmount = formatAsDollars(price);
  const [amount, setAmount] = useState(1);

  // const dispatch = useAppDispatch();

  // const cartProduct: CartItem = {
  //   cartID: `${product.id}`,
  //   productID: product.id,
  //   image_url,
  //   name,
  //   price,
  //   amount,
  // };

  // const addToCart = () => {
  //   dispatch(addItem(cartProduct));
  // };

  return <section>
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
    <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
      {/* IMAGE FIRST COL*/}
      <img
        src={image_url}
        alt={name}
        className='w-96 h-96 object-cover rounded-lg lg:w-full'
      />
      {/* PRODUCT INFO SECOND COL */}
      <div>
        <h1 className='capitalize text-3xl font-bold'>{name}</h1>
        {/* <h4 className='text-xl mt-2'>{company}</h4> */}
        <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
          {dollarsAmount}
        </p>
        <p className='mt-6 leading-8'>{description}</p>
        {/* AMOUNT */}
        <SelectProductAmount mode={Mode.SingleProduct} amount={amount} setAmount={setAmount} />

        {/* CART BUTTON */}
        <Button size='lg' className='mt-10' onClick={() => console.log('pfff')/* addToCart */}>
          Add to bag
        </Button>
      </div>
    </div>
  </section>
};
export default SingleProduct;
