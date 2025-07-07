import type React from "react";
import SignupModal from "./SignupModal";
import SigninModal from "./SigninModal";
import { useState } from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  return (
    <footer className="bg-[#3b73ed] pt-16 pb-8 px-4 font-inter text-black overflow-hidden">
      <div className="max-w-6xl mx-auto border-t border-white/20 pt-20 mt-20">
        {/* Hero CTA Section */}
        <div className="mb-12">
          {signupOpen && (
            <SignupModal
              onClose={() => setSignupOpen(false)}
              onSwitchToSignin={() => {
                // Handle switching logic here if needed
                setSignupOpen(false);
                setSigninOpen(true);
              }}
            />
          )}

          {signinOpen && (
            <SigninModal
              onClose={() => setSigninOpen(false)}
              onSwitchToSignup={() => {
                // Handle switching logic here if needed
                setSignupOpen(true);
                setSigninOpen(false);
              }}
            />
          )}
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-medium mb-4 font-satoshi text-white">
              Store All Your Knowledge, <br />
              <span className="inline-block">In One Place</span>
            </h2>
            <p className="text-black/80 max-w-2xl mx-auto mb-8 font-inter font-medium">
              Organize your thoughts, links, and resources with a BrainBoard
              that helps you stay productive.
            </p>
            <button
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition-colors w-full md:w-auto font-satoshi font-semibold"
              onClick={() => {
                setSignupOpen(true);
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="grid md:grid-cols-5 gap-8 py-8 border-t border-white/20">
          <div className="md:col-span-2">
            <div className="flex items-center text-white font-bold text-xl mb-4 font-grotesk">
              BrainBoard
            </div>
            <p className="text-black/80 mb-4 font-inter font-medium">
              Keep all your links, notes, and resources connected in one space
              to boost your productivity.
            </p>
          </div>

          <nav aria-label="Product Navigation">
            <h4 className="font-semibold mb-4 font-satoshi text-white">
              Product
            </h4>
            <ul className="space-y-2 text-black font-inter font-medium">
              {["Features", "Integrations", "Pricing"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company Navigation">
            <h4 className="font-semibold mb-4 font-satoshi text-white">
              Company
            </h4>
            <ul className="space-y-2 text-black font-inter font-medium">
              {["About Us", "Careers"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources Navigation">
            <h4 className="font-semibold mb-4 font-satoshi text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-black font-inter font-medium">
              {["Documentation", "Help Center"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Legal Section */}
        {/* Bottom Legal Section */}
        <div className="border-t border-white/20 pt-8 mt-8 text-sm text-black flex flex-col md:flex-row justify-between font-inter font-medium">
          <div>
            © {new Date().getFullYear()} BrainBoard. All rights reserved.
          </div>

          {/* Social + Credits */}
          <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex space-x-4">
              <a
                href="https://github.com/ayushtwo8/brainboard"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <div className="md:ml-6">
              Made with
              <span className="mx-1 text-red-500">❤️</span>
              by Ayush
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
