import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import StrawField from '../assets/images/StrawField.jpg';


interface Feature {
  title: string;
  description: string;
}

const About = () => {
  const features: Feature[] = [
    {
      title: "Handcrafted",
      description: "Every mat is meticulously crafted by our master artisans"
    },
    {
      title: "Sustainable",
      description: "Eco-friendly materials and traditional techniques"
    },
    {
      title: "Custom Design",
      description: "Personalize your tatami to match your style"
    }
  ];

  return (
    <main className="flex flex-col items-center min-h-screen py-12">
      <div className="container px-4 md:px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Tatami with Attitude
          </h1> */}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Tatami with <span className="bg-primary py-1 px-2 rounded-lg tracking-widest text-white">Attitude</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Traditional Mats with Extra Sauce
          </p>
        </div>

        {/* Story Section */}
        <div className="grid gap-6 mt-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Our Story
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              We're not your typical tatami company. We blend centuries-old craftsmanship 
              with contemporary flair to create mats that make statements.
            </p>
            <Button variant="outline">Read More</Button>
          </div>
          <Card>
          <CardContent className="p-6">
              <img 
                src={StrawField}
                alt="Straw Field"
                 className="w-full h-full object-cover rounded-lg aspect-video"
                />
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-[700px] space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Our Values
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              We believe in respecting tradition while embracing innovation. 
              Each tatami mat we create is a perfect blend of timeless craftsmanship 
              and contemporary design sensibilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">Contact Us</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


export default About;