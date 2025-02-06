import product_vegi1 from '../../assets/images/product_vegi1.jpeg';
import product_Arc12 from '../../assets/images/product_Arc12.jpeg';
import product_animals8 from '../../assets/images/product_animal8.jpeg';

function CategorySection() {
  return (
    <section className='max-w-[1440px] mx-auto px-8 mt-40'>
      <h2 className='text-3xl font-bold text-center mb-24'>Shop by Category</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div>
          <h3 className='text-xl font-semibold mb-4 text-center text-orange-500'>People</h3>
          <div className='aspect-square relative overflow-hidden rounded-lg'>
            <img src={product_Arc12} alt="People" className="w-full h-full object-cover"/>
          </div>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-4 text-center text-orange-500'>Animals</h3>
          <div className='aspect-square relative overflow-hidden rounded-lg'>
            <img src={product_animals8} alt="Animals" className="w-full h-full object-cover"/>
          </div>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-4 text-center text-orange-500'>Food</h3>
          <div className='aspect-square relative overflow-hidden rounded-lg'>
            <img src={product_vegi1} alt="Food" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategorySection;