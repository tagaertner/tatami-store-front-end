import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Feature } from '../../utils/types';

interface AboutFeaturesProps {
  features: Feature[];
}

const AboutFeatures = ({ features }: AboutFeaturesProps) => (
  <div className="grid gap-6 mt-12 md:grid-cols-3">
    {features.map((feature, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
      </Card>
    ))}
  </div>
);

export default AboutFeatures;