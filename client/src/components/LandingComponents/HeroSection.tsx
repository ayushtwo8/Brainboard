import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      setSignupOpen(true);
    }
  };

  return (
    <section className="bg-[#3b73ed] h-[100vh] px-4 flex flex-col justify-center overflow-hidden">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 mt-16 leading-tight tracking-tight font-satoshi">
          From Scattered Thoughts,
          <br className="hidden sm:block" />
          <span className="inline-block">To a Clearer Mind.</span>
        </h1>

        {/* Description */}
        <p className="text-black max-w-2xl mx-auto mt-10 pt-6 mb-16 text-sm sm:text-base md:text-lg font-inter">
          BrainBoard is your personal knowledge canvas, designed to turn digital
          clutter into an interconnected library of your best thinking.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-16">
          <div>
            <Button
              size="lg"
              className="bg-black text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-black hover:to-gray-800"
              onClick={() => handleClick()}
            >
              Start Building Your Second Brain
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Tags */}

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
    </section>
  );
};

export default HeroSection;
