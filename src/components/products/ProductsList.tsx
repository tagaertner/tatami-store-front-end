import { formatAsDollars, type ProductsResponse } from '../../utils';
import { Link, useLoaderData } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';

function ProductsList() {
  const { data: products } = useLoaderData() as ProductsResponse;
  console.log("products in ProductsList", products);
  

  // Add guard clause
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



// import { formatAsDollars, type ProductsResponse } from '../../utils';
// import { Link, useLoaderData } from 'react-router-dom';
// import { Card, CardContent } from '../ui/card';

// function ProductsList() {
//   const { data: products } = useLoaderData() as ProductsResponse;

//   return (
//      <div className='mt-12 grid gap-y-8'>
//       {products.map((product) => {
//         const { title, price, image } = product.attributes;
//         const dollarsAmount = formatAsDollars(price);

//         return (
//           <Link key={product.id} to={`/products/${product.id}`}>
//             <Card>
//               <CardContent className='p-8 gap-y-4 grid md:grid-cols-3 '>
//                 <img
//                   src={image}
//                   alt={title}
//                   className='h-64 w-full md:h-48  md:w-48  rounded-md object-cover'
//                 />
//                 {/* <div>
//                   <h2 className='text-xl font-semibold capitalize'>{title}</h2>
//                   <h4>{company}</h4>
//                 </div> */}
//                 <p className='text-primary md:ml-auto'>{dollarsAmount}</p>
//               </CardContent>
//             </Card>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }

// export default ProductsList;