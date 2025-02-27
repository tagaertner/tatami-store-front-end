import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { formatAsDollars, type ProductsResponse } from '../../utils';

function ProductsGrid() {
  const { data: products } = useLoaderData() as ProductsResponse;
  
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
      {products.map((product) => {
        
        const { name, price, image_url } = product;
        const dollarsAmount = formatAsDollars(price);

        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <Card>
              <CardContent className='p-4'>
                <img
                  src={image_url}
                  alt={name}
                  className='rounded-md h-64 md:h-48 w-full object-cover'
                />
                <div className='mt-4 text-center'>
                  <h2 className='text-xl font-semibold capitalize'>{name}</h2>
                  <p className='text-primary font-light mt-2'>
                    {dollarsAmount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;