import React from 'react';
import { Seo } from '../seo/Seo';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Jayded AF - Privacy Policy"
        description="Privacy Policy for Jayded AF Cocktails."
        path="/privacy-policy"
        noindex={true}
      />
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="container mx-auto px-4">
        <div className="prose prose-lg mx-auto text-brand-text">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <p>
            Your privacy is important to us. It is Jayded AF Cocktails' policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information we collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. How we use your information</h2>
          <p>
            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Cookies</h2>
          <p>
            We use cookies to make our website work. These are small files that are stored on your computer. They help us to improve your experience and to understand how people use our website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Links to other sites</h2>
          <p>
            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact us at <a href="mailto:INFO@JAYDEDAF.COM" className="text-brand-primary hover:underline">INFO@JAYDEDAF.COM</a>.
          </p>
        </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
