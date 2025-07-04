import { Link } from "react-router-dom";
import { Home } from "lucide-react"; // A fitting icon for a "go home" button

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-white drop-shadow-lg">
          404
        </h1>
        <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-md mx-auto">
          Oops! Looks like you've ventured into uncharted territory. The page you
          were looking for doesn't exist.
        </p>

        <div className="mt-12">
          <Link
            to="/" // Link to the homepage
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-900 text-lg px-8 py-3 rounded-full font-semibold shadow-xl transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;