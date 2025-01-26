
function CategorySection() {
  return (
    
    <section className='max-w-[1440px] mx-auto px-8'>
      <h2 className='text-3xl font-bold text-center mb-12'>Shop by Category</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='aspect-square relative overflow-hidden rounded-lg'>
          <div className='w-full h-full bg-gray-50'>
            {/* Replace with image */}
          </div>
        </div>
        <div className='aspect-square relative overflow-hidden rounded-lg'>
          <div className='w-full h-full bg-gray-50'>
            {/* Replace with image */}
          </div>
        </div>
        <div className='aspect-square relative overflow-hidden rounded-lg'>
          <div className='w-full h-full bg-gray-50'>
            {/* Replace with image */}
          </div>
        </div>
      </div>
    </section>
  
  );
}

export default CategorySection;