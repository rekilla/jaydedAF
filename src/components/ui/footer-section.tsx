"use client"

import { Button } from "./button"; // Revert to relative path
import { Input } from "./input"; // Revert to relative path
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"; // Revert to relative path
import { Instagram, Send, Twitter, Youtube } from "lucide-react";
import { products } from "../../data/products";

// Renamed component to avoid conflict if demo name is used elsewhere
export function FooterSection() {
  // const [isChatOpen, setIsChatOpen] = React.useState(false); // Chat state not used

  // Use brand colors from Tailwind config

  return (
    <footer className="relative border-t border-white/10 bg-black text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">Stay Connected</h2>
            <p className="mb-6 text-white/70">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 bg-white/10 border-white/20 focus:border-white focus:ring-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-white text-black transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white/90">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block text-white/70 transition-colors hover:text-white">
                Home
              </a>
              <a href="/store-locator" className="block text-white/70 transition-colors hover:text-white">
                Store Locator
              </a>
              <a href="/contact" className="block text-white/70 transition-colors hover:text-white">
                Contact
              </a>
              <a href="/press" className="block text-white/70 transition-colors hover:text-white">
                Press
              </a>
            </nav>
          </div>

          {/* Cocktails */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white/90">Cocktails</h3>
            <nav className="space-y-2 text-sm">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={product.path}
                  className="block text-white/70 transition-colors hover:text-white"
                >
                  {product.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white/90">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-white/70">
              <p>Email: <a href="mailto:INFO@JAYDEDAF.COM" className="text-white/70 transition-colors hover:text-white">INFO@JAYDEDAF.COM</a></p>
            </address>
          </div>

          {/* Follow Us */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white/90">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#" aria-label="Twitter">
                    <Button variant="outline" size="icon" className="rounded-full border-white/30 text-white hover:border-white hover:bg-white/10">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Twitter</p></TooltipContent>
                </Tooltip>
                 <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.instagram.com/jayded.af/" aria-label="Instagram">
                    <Button variant="outline" size="icon" className="rounded-full border-white/30 text-white hover:border-white hover:bg-white/10">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on Instagram</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.youtube.com/channel/UCeqg03eaSlqLjk8jL575HWg" aria-label="YouTube">
                    <Button variant="outline" size="icon" className="rounded-full border-white/30 text-white hover:border-white hover:bg-white/10">
                      <Youtube className="h-4 w-4" />
                      <span className="sr-only">YouTube</span>
                    </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow us on YouTube</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} Jayded AF Cocktails. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/privacy-policy" className="text-white/70 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-white/70 transition-colors hover:text-white">
              Terms of Service
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
