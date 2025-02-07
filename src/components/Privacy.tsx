// src/components/Privacy.tsx
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Privacy = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-8">
      <Card className="my-12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-primary">Privacy Policy</CardTitle>
          <p className="text-sm text-gray-500">Last updated: February 6, 2025</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Information Collection</h2>
            <p className="text-gray-600">
              We collect information necessary to provide our services, including:
              - Contact information (name, email)
              - Usage data
              - Device information
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How We Use Information</h2>
            <p className="text-gray-600">
              Your information helps us:
              - Provide and improve services
              - Send important updates
              - Protect against fraud
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Data Protection</h2>
            <p className="text-gray-600">
              We implement security measures to protect your personal information
              and maintain data integrity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-600">
              You have the right to:
              - Access your data
              - Request corrections
              - Delete your account
            </p>
          </section>

          <div className="pt-6">
            <Link to="/">
              <Button 
                variant="outline" 
                className="text-primary hover:bg-primary hover:text-white"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;