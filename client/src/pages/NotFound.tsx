import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <section className="bg-[#3b73ed] h-[100vh] flex items-center justify-center px-4 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight font-satoshi">
          404
        </h1>
        
        <p className="text-black text-base sm:text-lg md:text-xl font-inter mb-10">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-4 bg-black text-white rounded-full text-sm sm:text-base font-medium shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-black hover:to-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go back to Home
          </Link>
        </div>
        
        {/* Optional: tags for continuity */}
        <div className="mt-12 flex justify-center flex-wrap gap-4 text-white text-sm sm:text-base">
          {["Capture Instantly", "Organize Smartly", "Recall Effortlessly"].map((tag, i) => (
            <div
              key={i}
              className="flex items-center gap-2 font-grotesk"
            >
              <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-black text-xs">●</span>
              </div>
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotFound;