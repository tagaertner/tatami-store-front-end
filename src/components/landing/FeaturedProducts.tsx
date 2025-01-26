import ProductsGrid from './ProductsGrid';
import SectionTitle from './SectionTitle';

function FeaturedProducts () {
  return (
    <section className='pt-24 '>
      <SectionTitle text='PromotionalProduct' />
      <ProductsGrid />
    </section>
  );
}
export default FeaturedProducts;