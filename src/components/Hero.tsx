import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import HeroCarousel from './HeroCarousel';

const Hero = () => {
  return (
    // <section className=' grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
    // <section className='w-full max-w-screen px-4 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
    //   <div>
    //     <h1 className='max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl '>
    //     Tatami Energy - Not Your Zen Master's Floor
    //     </h1>

    //     <p className='mt-8 max-w-xl text-lg leading-8'>
    //       Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
    //       cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
    //       aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
    //       qui lorem cupidatat commodo.
    //     </p>

    //     <Button asChild size='lg' className='mt-10'>
    //       <Link to='/products'>Our Products</Link>
    //     </Button>
    //   </div>
    //   {/* hero carousel */}
    //   <HeroCarousel />
    // </section>
    <section className='max-w-[1440px] mx-auto'>
  {/* Text content with margins */}
  <div className='px-8 py-12 text-center'>
    <h1 className='text-4xl font-bold tracking-tight sm:text-6xl max-w-2xl mx-auto'>
      Tatami with Attitude - Traditional Mats with Extra Sauce
    </h1>

    <p className='mt-8 text-lg leading-8 max-w-xl mx-auto'>
      Turn your space into something extraordinary with our wild take on traditional Japanese tatami. These aren't your zen master's floor mats - we're bringing attitude to tradition!
    </p>

    <Button asChild size='lg' className='mt-10'>
      <Link to='/products'>Shop Now</Link>
    </Button>
  </div>
  
  {/* Carousel with original margins */}
  <div className='px-8'>
  <section className='max-w-[1440px] mx-auto px-8'>
        <h2 className='text-3xl font-bold text-center mb-8'>Features</h2>
        {/* <FeaturedProducts /> */}
       
      </section>
    <HeroCarousel />
  </div>
</section>
  );
};
export default Hero;
