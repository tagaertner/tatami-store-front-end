import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Link } from 'react-router-dom';

const AboutValues = () => (
  <Card className="mt-12">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-bold tracking-tighter sm:text-3xl">Our Values</CardTitle>
      <CardDescription>We believe in respecting tradition while embracing innovation...</CardDescription>
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
);

export default AboutValues;