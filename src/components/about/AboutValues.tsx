// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Link } from 'react-router-dom';

// const AboutValues = () => (
//   <Card className="mt-12">
//     <CardHeader className="text-center">
//       <CardTitle className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Values</CardTitle>
//       <CardDescription>We believe in respecting tradition while embracing innovation...</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex flex-wrap justify-center gap-4">
//         <Button size="lg">Get Started</Button>
//         <Button variant="outline" size="lg" asChild>
//           <Link to="/contact">Contact Us</Link>
//         </Button>
//       </div>
//     </CardContent>
//   </Card>
// );

// export default AboutValues;

// src/components/AboutFeatures.tsx
import { Card, CardContent } from "../ui/card";
import { Feature } from '../../utils/types';

interface AboutFeaturesProps {
  features: Feature[];
}

const AboutFeatures = ({ features }: AboutFeaturesProps) => (
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
);

export default AboutFeatures;