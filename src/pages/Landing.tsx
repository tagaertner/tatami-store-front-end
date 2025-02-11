import { Hero, CategorySection } from '../components';
import { landingLoader } from '../loaders/landingLoader';

export { landingLoader as loader};

function Landing() {
  return (
    <main>
      <Hero />
      <div className="pb-24">
        <CategorySection/>
      </div>
      <div className="text-center pb-8">

</div>
    </main>
  );
}

export default Landing;