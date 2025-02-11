import { formatAsDollars, type ProductsResponse } from '../../utils';
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';

function ProductsList() {
  const { data: products } = useLoaderData() as ProductsResponse;
<<<<<<< HEAD

  // Add guard clause
=======
  console.log("products in ProductsList", products);
  
>>>>>>> 2a57d7fd2cba93097b3f70c26cf8dfd836130689
  if (!products) {
    return null;
  }

  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        // Add null check for product and attributes
        if (!product) return null;
        const { name, price, image_url } = product;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card>
              <CardContent className='p-4 gap-y-4 grid md:grid-cols-3 items-center'>
                <img
                  src={image_url}
                  alt={name}
                  className='h-20 w-full md:h-20 md:w-20 rounded-md object-cover'
                  />
                  <h2 className='text-xl font-semibold capitalize text-center'>{name}</h2>
                  <p className='text-primary font-light text-end'>
                    {dollarsAmount}
                  </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsList;
