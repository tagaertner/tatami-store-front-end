import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import StrawField from '../../assets/images/StrawField.jpg';

const AboutStory = () => (
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
);

export default AboutStory;