import { Filters, ProductsContainer, PaginationContainer } from '../components';
import { customFetch, type ProductsResponse, type ProductsResponseWithParams } from '../utils';
import { type LoaderFunction } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card"
import potato from '../assets/images/potato.gif'
const url = '/products';

export const loader: LoaderFunction = async ({
  request
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  const response = await customFetch<ProductsResponse>(url, {
    params,
  });

  return { ...response.data, params };
};

// function Products () {
//   return (
//     <>
//       <Filters />
//       <ProductsContainer />
//       <PaginationContainer />
//     </>
//   );
// };

function Products() {
  return ( 
    <div className="flex flex-col items-center gap-4"> {/* Center content */}
    <p className="text-2xl font-bold">Po-tay-toes. Boil'em, mash'em, stick'em in a stew.</p>
    <Card className="max-w-2xl"> {/* Limit width */}
      <CardContent className="p-6">
        <img 
          src={potato}
          alt="Straw Field"
          className="w-full h-full object-cover rounded-lg aspect-video"
        />
        </CardContent>
      </Card>
    </div>

 // data with the pics need to unhihglei 
  //   <div className='px-2 sm:px-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[200px_1fr] xl:grid-cols-[250px_1fr] lg:gap-4 xl:gap-8'>
  //     <aside className="mt-[52px]">
  //       <Filters />
  //     </aside>
  //     <main>
  //       <ProductsContainer />
  //       <PaginationContainer />
  //     </main>
  //   </div>
  );
}
export default Products;