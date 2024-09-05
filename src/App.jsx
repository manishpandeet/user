import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetailPage from "./pages/UserDetail";
import "./index.css"; // Import Tailwind styles

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-900 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
