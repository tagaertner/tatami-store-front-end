// src/components/Terms.tsx
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Terms = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-8">
      <Card className="my-12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-primary">Terms of Service</CardTitle>
          <p className="text-sm text-gray-500">Last updated: February 6, 2025</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using our services, you agree to be bound by these Terms of Service
              and all applicable laws and regulations. If you do not agree with any of these terms,
              you are prohibited from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <p className="text-gray-600">
              Permission is granted to temporarily access our services for personal,
              non-commercial use. This license does not include:
              - Modifying or copying materials
              - Using materials for commercial purposes
              - Attempting to reverse engineer any software
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
            <p className="text-gray-600">
              Our services are provided "as is". We make no warranties, expressed
              or implied, and hereby disclaim all warranties including, without
              limitation, implied warranties of merchantability and fitness for
              particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
            <p className="text-gray-600">
              We shall not be held liable for any damages arising from:
              - The use or inability to use our services
              - Unauthorized access to your data
              - Statements by third parties
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

export default Terms;