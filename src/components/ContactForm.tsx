import { useState } from 'react';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Label } from '../components/ui/label';
import { Checkbox } from "../components/ui/checkbox";


interface ContactFormProps {
  onSubmit: (formData: ContactFormData) => void;
  isSubmitting?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

const ContactForm = ({ onSubmit, isSubmitting = false }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4">
  <div className="border-t border-b py-4 my-4">
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="your.email@example.com"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="How can we help?"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="min-h-32"
        />
      </div>
    </div>
  </div>

  <div className="mt-6 flex gap-4">
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        'Submit Message'
      )}
    </Button>
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => 
              setFormData(prev => ({
                ...prev,
                newsletter: checked === true
              }))
            }
            disabled={isSubmitting}
           />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
    </div>
  </div>
</form>

        )
      };
export default ContactForm;