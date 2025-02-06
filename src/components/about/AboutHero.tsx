// import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

// const AboutHero = () => (
//   <Card className="text-center">
//     <CardHeader>
//       <CardTitle className="text-4xl font-bold">Traditional Tatami</CardTitle>
//       <CardDescription>              
//         We believe in respecting tradition while embracing innovation. 
//         Each tatami mat we create is a perfect blend of timeless craftsmanship 
//         and contemporary design sensibilities.
//       </CardDescription>
//     </CardHeader>
//   </Card>
// );

// export default AboutHero;
// src/components/AboutHero.tsx
const AboutHero = () => (
  <div>
    <h1 className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-tight sm:text-6xl'>
      We love
      <span className='bg-primary py-2 px-4 rounded-lg tracking-widest text-white'>
        comfy
      </span>
    </h1>
    <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto'>
      Welcome to our world of comfort and craftsmanship. 
      We specialize in creating spaces where modern design meets timeless comfort.
      From our carefully selected materials to our expert craftsmanship, 
      every piece we create is designed to bring warmth and style to your home.
    </p>
  </div>
);

export default AboutHero;