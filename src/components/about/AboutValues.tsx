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