import {Hero, FeaturedProducts} from '../components';
import { useLoaderData, type LoaderFunction } from 'react-router-dom';
import { customFetch, type ProductsResponse } from '../utils';

const url = '/products?featured=true';

export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url);
  return { ...response.data };
};

// function Landing() {
//   const result = useLoaderData() as ProductsResponse;
//   console.log(result);

//   return (
//     <>
//       <Hero />
//       <FeaturedProducts />
//     </>
//   );
function Landing() {
  const result = useLoaderData() as ProductsResponse;

  return (
    <div className='space-y-24'> {/* Add spacing between sections */}
      <Hero />
{/* Category section */}
<section className='max-w-[1440px] mx-auto px-8'>
    <h2 className='text-3xl font-bold text-center mb-12'>Shop by Category</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {/* Example category cards - replace with your actual images */}
      <div className='aspect-square relative overflow-hidden rounded-lg'>
        <div className='w-full h-full bg-gray-50'>
          {/* Replace with your image */}
          {/* <img src="your-image.jpg" alt="Category" className="w-full h-full object-cover" /> */}
        </div>
      </div>
      <div className='aspect-square relative overflow-hidden rounded-lg'>
        <div className='w-full h-full bg-gray-50'>
          {/* Replace with image */}
        </div>
      </div>
      <div className='aspect-square relative overflow-hidden rounded-lg'>
        <div className='w-full h-full bg-gray-50'>
          {/* Replace with  image */}
        </div>
      </div>
    </div>
</section>

{/* Promotions section */}
<section className='max-w-[1440px] mx-auto px-8'>
    <h2 className='text-3xl font-bold text-center mb-8'>Special Offers</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {/* Place holder category cards - will replace with actual images */}
      <div className='aspect-square relative overflow-hidden rounded-lg'>
        <div className='w-full h-full bg-gray-50'>
          {/* Replace with  image */}
          {/* <img src="your-image.jpg" alt="Category" className="w-full h-full object-cover" /> */}
        </div>
      </div>
      <div className='aspect-square relative overflow-hidden rounded-lg'>
        <div className='w-full h-full bg-gray-50'>
          {/* Replace with  image */}
        </div>
      </div>
      <div className='aspect-square relative overflow-hidden rounded-lg'>
        <div className='w-full h-full bg-gray-50'>
          {/* Replace withimage */}
        </div>
      </div>
    </div>
</section>
     
    </div>
  );

}
export default Landing;