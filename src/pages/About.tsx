// ADD THESE IMPORTS
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
} from "../components/ui/card"
import {Button} from '../components/ui/button'
import StrawField from '../assets/images/StrawField.jpg';
import { Link } from 'react-router-dom';



const About = () => {
  // Features array stays the same

  interface Feature {
    title: string;
    description: string;
  }
  
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
        {/* Hero section stays the same */}

        {/* REPLACE Story Section with: */}
        <div className="grid gap-6 mt-12 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Our Story
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                We're not your typical tatami company. We blend centuries-old craftsmanship 
                with contemporary flair to create mats that make statements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Read More</Button>
            </CardContent>
          </Card>
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

        {/* REPLACE Features Grid with: */}
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* REPLACE Values Section with: */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Our Values
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              We believe in respecting tradition while embracing innovation. 
              Each tatami mat we create is a perfect blend of timeless craftsmanship 
              and contemporary design sensibilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default About;