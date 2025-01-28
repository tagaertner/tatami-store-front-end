import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import StrawField from '../../assets/images/StrawField.jpg';

const AboutStory = () => (
  <div className="grid gap-6 mt-12 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Story</CardTitle>
        <CardDescription>We're not your typical tatami company...</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Read More</Button>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-6">
        <img src={StrawField} alt="Straw Field" className="w-full h-full object-cover rounded-lg aspect-video" />
      </CardContent>
    </Card>
  </div>
);

export default AboutStory;