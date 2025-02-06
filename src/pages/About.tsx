import { AboutHero, AboutStory, AboutFeatures, AboutValues } from '../components';
import { features } from '../data/featuresAboutPage';

const About = () => (
  <section>
    <AboutHero />
    <main className="flex flex-col items-center min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <AboutStory />
        <AboutFeatures features={features} />
        <AboutValues features={features} />
      </div>
    </main>
  </section>
);

export default About;