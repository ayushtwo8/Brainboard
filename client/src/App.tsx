// client/src/App.tsx

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Layout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Videos from "./pages/Videos";
import Tweets from "./pages/Tweets";
import { Toaster } from "react-hot-toast";

// --- IMPORT THE NEW COMPONENT ---
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* === Protected Routes Wrapper === */}
        {/* All routes inside here are now protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="videos" element={<Videos />} />
            <Route path="tweets" element={<Tweets />} />
          </Route>
          {/* You could add more top-level protected routes here if needed */}
        </Route>
        
        {/* Catch-all route should be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;