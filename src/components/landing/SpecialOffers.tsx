

function PromotionalProduct() {
  return (
    // {/* Promotions section  keeing here for now, actual part of Featured products compontnt */}
<section className='max-w-[1440px] mx-auto px-8'>
    <h2 className='text-3xl font-bold text-center mb-8'>SpecialOffers</h2>
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
     
  
  )
};

export default PromotionalProduct