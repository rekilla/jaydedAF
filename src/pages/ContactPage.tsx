import React from 'react';
import { Button } from '../components/ui/button'; // Use shadcn Button
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { InView } from '../components/ui/in-view';
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'; // Import icons

// --- Main Page Component ---
const ContactPage: React.FC = () => {

  // TODO: Add form state and submission logic
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    // Add actual form submission logic here
  };

  return (
    <main className="w-full pt-20">
      <InView as="section" className="py-16 sm:py-24 flex items-center justify-center min-h-[calc(80vh-80px)]"> {/* Adjust min-height */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-lg text-center"> {/* Constrained width */}

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-6">Get In Touch</h1>
          <p className="text-lg text-brand-text/80 leading-relaxed mb-10">
            We'd love to hear from you. Reach out with any questions, comments, or inquiries.
          </p>

          {/* Contact Form Placeholder */}
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Floating Label Input Example (Requires custom CSS or library for floating effect) */}
            <div className="relative">
              <Input
                type="text"
                id="name"
                name="name"
                required
                className="peer block w-full p-3 bg-brand-dark/50 border-brand-text/20 focus:border-brand-gold focus:ring-brand-gold placeholder-transparent rounded-md"
                placeholder="Name" // Placeholder used for floating label trick
              />
              <Label
                htmlFor="name"
                className="absolute left-3 -top-2.5 text-xs text-brand-text/70 bg-brand-background px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-gold" // Basic floating label CSS
              >
                Name
              </Label>
            </div>
             <div className="relative">
              <Input
                type="email"
                id="email"
                name="email"
                required
                className="peer block w-full p-3 bg-brand-dark/50 border-brand-text/20 focus:border-brand-gold focus:ring-brand-gold placeholder-transparent rounded-md"
                placeholder="Email Address"
              />
              <Label
                htmlFor="email"
                 className="absolute left-3 -top-2.5 text-xs text-brand-text/70 bg-brand-background px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-gold"
              >
                Email Address
              </Label>
            </div>
             <div className="relative">
              <Input
                type="text"
                id="subject"
                name="subject"
                required
                className="peer block w-full p-3 bg-brand-dark/50 border-brand-text/20 focus:border-brand-gold focus:ring-brand-gold placeholder-transparent rounded-md"
                placeholder="Subject"
              />
              <Label
                htmlFor="subject"
                 className="absolute left-3 -top-2.5 text-xs text-brand-text/70 bg-brand-background px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-gold"
              >
                Subject
              </Label>
            </div>
            <div className="relative">
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                className="peer block w-full p-3 bg-brand-dark/50 border-brand-text/20 focus:border-brand-gold focus:ring-brand-gold placeholder-transparent rounded-md resize-none" // Added resize-none
                placeholder="Your Message"
              />
               <Label
                htmlFor="message"
                 className="absolute left-3 -top-2.5 text-xs text-brand-text/70 bg-brand-background px-1 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-brand-gold"
              >
                Your Message
              </Label>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-brand-gold text-brand-dark hover:bg-brand-gold/90 px-10 shadow-md hover:shadow-lg transition-all" // Added shadow
                // TODO: Add subtle gradient if desired
              >
                Submit Message
              </Button>
            </div>
          </form>

          {/* Alternative Contact Info */}
          <div className="mt-16 border-t border-brand-gold/10 pt-10">
            <h3 className="text-lg font-semibold text-brand-gold/90 mb-4">Alternatively</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-brand-text/80">
              <a href="mailto:INFO@JAYDEDAF.COM" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                <Mail className="h-5 w-5" />
                INFO@JAYDEDAF.COM
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="tel:+1-555-JAYDED-AF" className="flex items-center gap-2 hover:text-brand-gold transition-colors"> {/* Placeholder number */}
                <Phone className="h-5 w-5" />
                (555) JAYDED-AF
              </a>
            </div>
          </div>

           {/* Social Media Links */}
           <div className="mt-10 text-center">
             <div className="flex justify-center space-x-5">
                {/* TODO: Add actual social links */}
                <a href="#" aria-label="Facebook" className="text-brand-text/60 hover:text-brand-gold transition-colors"><Facebook className="h-5 w-5"/></a>
                <a href="#" aria-label="Twitter" className="text-brand-text/60 hover:text-brand-gold transition-colors"><Twitter className="h-5 w-5"/></a>
                <a href="#" aria-label="Instagram" className="text-brand-text/60 hover:text-brand-gold transition-colors"><Instagram className="h-5 w-5"/></a>
             </div>
           </div>

        </div>
      </InView>
    </main>
  );
};

export default ContactPage;
