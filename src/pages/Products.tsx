
import { Filters, ProductsContainer, PaginationContainer } from '../components';
import { productsLoader } from '../loaders/productsLoader';
// 
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

export { productsLoader as loader };
export default Products;
