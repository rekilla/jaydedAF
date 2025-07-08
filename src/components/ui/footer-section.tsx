"use client"

import { Button } from "./button"; // Revert to relative path
import { Input } from "./input"; // Revert to relative path
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"; // Revert to relative path
import { Facebook, Instagram, Send, Twitter } from "lucide-react";
import { cn } from "../../lib/utils"; // Revert to relative path

// Renamed component to avoid conflict if demo name is used elsewhere
export function FooterSection() {
  // const [isChatOpen, setIsChatOpen] = React.useState(false); // Chat state not used

  // Use brand colors from Tailwind config
  const brandColors = {
      primary: 'brand-gold', // Map primary to brand-gold
      background: 'brand-dark', // Map background to brand-dark
      foreground: 'brand-text', // Map foreground to brand-text
      mutedForeground: 'brand-text/70', // Example muted color
      primaryForeground: 'brand-dark', // Text on primary button
  };

  return (
    <footer className={cn(
        "relative border-t border-brand-gold/10 bg-brand-dark text-brand-text transition-colors duration-300", // Use brand colors
        // Add dark mode class manually if needed, though useEffect handles it
        // isDarkMode ? 'dark' : ''
    )}>
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-brand-gold">Stay Connected</h2> {/* Use brand gold */}
            <p className={cn("mb-6", `text-${brandColors.mutedForeground}`)}>
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 bg-brand-dark/50 border-brand-text/20 focus:border-brand-gold focus:ring-brand-gold placeholder:text-brand-text/50" // Styled input
              />
              <Button
                type="submit"
                size="icon"
                className={cn(
                    "absolute right-1 top-1 h-8 w-8 rounded-full transition-transform hover:scale-105",
                    `bg-${brandColors.primary} text-${brandColors.primaryForeground}` // Use brand colors
                )}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            {/* Optional decorative blur */}
            {/* <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-brand-gold/10 blur-2xl" /> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-brand-gold/90">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className={cn("block transition-colors", `hover:text-${brandColors.primary}`)}>
                Home
              </a>
              <a href="/store-locator" className={cn("block transition-colors", `hover:text-${brandColors.primary}`)}>
                Store Locator
              </a>
              <a href="/contact" className={cn("block transition-colors", `hover:text-${brandColors.primary}`)}>
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-brand-gold/90">Contact Us</h3>
            <address className={cn("space-y-2 text-sm not-italic", `text-${brandColors.mutedForeground}`)}>
              {/* <p>123 Innovation Street</p> */}
              {/* <p>Tech City, TC 12345</p> */}
              {/* <p>Phone: (123) 456-7890</p> */}
              <p>Email: <a href="mailto:INFO@JAYDEDAF.COM" className={cn("transition-colors", `hover:text-${brandColors.primary}`)}>INFO@JAYDEDAF.COM</a></p> {/* Use actual email */}
            </address>
          </div>

          {/* Follow Us & Theme Toggle */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-brand-gold/90">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              {/* TODO: Add actual social media links */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#" aria-label="Facebook">
                    <Button variant="outline" size="icon" className="rounded-full border-brand-text/30 hover:border-brand-gold hover:bg-brand-gold/10">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Facebook</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#" aria-label="Twitter">
                    <Button variant="outline" size="icon" className="rounded-full border-brand-text/30 hover:border-brand-gold hover:bg-brand-gold/10">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Twitter</p></TooltipContent>
                </Tooltip>
                 <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#" aria-label="Instagram">
                    <Button variant="outline" size="icon" className="rounded-full border-brand-text/30 hover:border-brand-gold hover:bg-brand-gold/10">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Instagram</p></TooltipContent>
                </Tooltip>
                 {/* Add others if needed */}
              </TooltipProvider>
            </div>
            {/* Theme Toggle - Optional, remove if not needed */}
            {/* <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-gold/10 pt-8 text-center md:flex-row">
          <p className={cn("text-sm", `text-${brandColors.mutedForeground}`)}>
            &copy; {new Date().getFullYear()} Jayded AF Cocktails. All rights reserved. {/* Updated company name */}
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/privacy-policy" className={cn("transition-colors", `hover:text-${brandColors.primary}`)}>
              Privacy Policy
            </a>
            <a href="/terms-of-service" className={cn("transition-colors", `hover:text-${brandColors.primary}`)}>
              Terms of Service
            </a>
            {/* <a href="#" className={cn("transition-colors", `hover:text-${brandColors.primary}`)}>
              Cookie Settings
            </a> */}
          </nav>
        </div>
      </div>
    </footer>
  )
}
