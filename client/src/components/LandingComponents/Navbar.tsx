"use client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  openSigninModal: () => void;
  openSignupModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  openSigninModal,
  openSignupModal,
}) => {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-6 fixed top-0 left-0 right-0 mx-45 z-50">
      <div className="max-w-7xl mx-auto">
        <nav className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between border border-white/20">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-3 h-3 bg-white rounded-full" />
            <span className="text-xl font-semibold text-white">BrainBoard</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={openSigninModal}
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white rounded-full border-0"
            >
              Login
            </Button>
            <Button
              onClick={openSignupModal}
              className="bg-white text-purple-600 hover:bg-white/90 px-6 rounded-full font-semibold"
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
