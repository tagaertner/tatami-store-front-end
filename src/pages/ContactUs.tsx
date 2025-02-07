import { useAppSelector } from '../lib/hooks';
import { SectionTitle } from '../components';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
// import { type ReduxStore } from '../store';
import ContactForm, { ContactFormData } from '../components/ContactForm';
import { useState } from 'react';

// export const loader = (store: ReduxStore): LoaderFunction => async (): Promise<Response | null> => {
  // const user = store.getState().userState.user;
  // if (!user) {
  //   toast({ description: 'Please login to contact us' });
  //   return redirect('/login');
  // }
//   return null;
// };

const ContactUs = () => {
  const { user } = useAppSelector((state) => state.userState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      toast({ 
        title: "Success",
        description: 'Thank you for your message. We will get back to you soon!',
        variant: "default"
      });
    } catch (error) {
      console.log(error)
      toast({ 
        title: "Error",
        description: 'Failed to send message. Please try again.',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <SectionTitle text="Contact Us" />
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            How can we help you, {user?.given_name}?
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </CardHeader>
        
        <CardContent>
          <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;

