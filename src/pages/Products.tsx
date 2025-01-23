import { Filters, ProductsContainer, PaginationContainer } from '../components';
import { customFetch, type ProductsResponse, type ProductsResponseWithParams } from '../utils';
import { type LoaderFunction } from 'react-router-dom';

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
    <div className='px-2 sm:px-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-[200px_1fr] xl:grid-cols-[250px_1fr] lg:gap-4 xl:gap-8'>
      <aside className="mt-[52px]">
        <Filters />
      </aside>
      <main>
        <ProductsContainer />
        <PaginationContainer />
      </main>
    </div>
  );
}
export default Products;