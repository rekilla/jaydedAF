import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import StyledButton from '../components/StyledButton';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }
    
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form submitted", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000); // Hide after 5 seconds
  };

  return (
    <main className="w-full min-h-screen bg-white text-black flex items-center justify-center pt-32 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md"
      >
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Get In Touch
          </h1>
          <p className="text-lg text-black/80 leading-relaxed">
            We'd love to hear from you.
          </p>
        </div>

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/30 text-green-300 text-center p-4 rounded-lg mb-8"
          >
            Thank you for your message! We'll get back to you soon.
          </motion.div>
        )}

        {/* Contact Form */}
        <div className="space-y-8">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              className="peer w-full bg-transparent border-b border-black/20 pb-3 text-black placeholder-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300"
              placeholder="Name"
            />
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                formData.name || focusedField === 'name'
                  ? '-top-5 text-xs text-yellow-400'
                  : 'top-0 text-black/70'
              }`}
            >
              Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="peer w-full bg-transparent border-b border-black/20 pb-3 text-black placeholder-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300"
              placeholder="Email"
            />
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                formData.email || focusedField === 'email'
                  ? '-top-5 text-xs text-yellow-400'
                  : 'top-0 text-black/70'
              }`}
            >
              Email Address
            </label>
          </div>

          {/* Subject Field */}
          <div className="relative">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className="peer w-full bg-transparent border-b border-black/20 pb-3 text-black placeholder-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300"
              placeholder="Subject"
            />
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                formData.subject || focusedField === 'subject'
                  ? '-top-5 text-xs text-yellow-400'
                  : 'top-0 text-black/70'
              }`}
            >
              Subject
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className="peer w-full bg-transparent border-b border-black/20 pb-3 text-black placeholder-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300 resize-none"
              placeholder="Message"
            />
            <label
              className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                formData.message || focusedField === 'message'
                  ? '-top-5 text-xs text-yellow-400'
                  : 'top-0 text-black/70'
              }`}
            >
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <StyledButton
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
            className="w-full py-4 mt-12"
            variant="contact"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                Sending
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </span>
            )}
          </StyledButton>
        
        </div>
      </motion.div>
    </main>
  );
};

export default ContactPage;
