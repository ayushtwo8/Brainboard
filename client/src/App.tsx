import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"
import Layout from "./components/MainLayout"
import Dashboard from "./pages/Dashboard";
import Videos from "./pages/Videos";
import Tweets from "./pages/Tweets";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster position="top-right"  />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route path="/user" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="videos" element={<Videos />} />
            <Route path="tweets" element={<Tweets />} />
          </Route>
      </Routes>
    </>
  );
};

export default App;
