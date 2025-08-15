import React from 'react';
import { Seo } from '../seo/Seo';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Seo
        title="Jayded AF - Terms of Service"
        description="Terms of Service for Jayded AF Cocktails."
        path="/terms-of-service"
        noindex={true}
      />
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="container mx-auto px-4">
        <div className="prose prose-lg mx-auto text-brand-text">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <p>
            Please read these terms of service carefully before using our website.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Conditions of Use</h2>
          <p>
            We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions. This is why we urge you to read them carefully.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. Privacy Policy</h2>
          <p>
            Before you continue using our website we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Copyright</h2>
          <p>
            Content published on this website (digital downloads, images, texts, graphics, logos) is the property of Jayded AF Cocktails and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of Jayded AF Cocktails, with copyright authorship for this compilation by Jayded AF Cocktails.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Communications</h2>
          <p>
            The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive communications from us. If you subscribe to the news on our website, you are going to receive regular emails from us. We will continue to communicate with you by posting news and notices on our website and by sending you emails. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet the legal requirements that such communications be in writing.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Applicable Law</h2>
          <p>
            By visiting this website, you agree that the laws of the [Your State/Country], without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between Jayded AF Cocktails and you, or its business partners and associates.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Terms of Service, please contact us at <a href="mailto:INFO@JAYDEDAF.COM" className="text-brand-primary hover:underline">INFO@JAYDEDAF.COM</a>.
          </p>
        </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfServicePage;
