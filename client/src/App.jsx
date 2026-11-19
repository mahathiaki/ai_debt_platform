import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddLoan from "./pages/AddLoan";
import MyLoans from "./pages/MyLoans";
import NotFound from "./pages/NotFound";
import AIAnalysis from "./pages/AIAnalysis";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import EditLoan from "./pages/EditLoan";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/myloans"
        element={
          <ProtectedRoute>
            <MyLoans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addloan"
        element={
          <ProtectedRoute>
            <AddLoan />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-loan/:id"
        element={
          <ProtectedRoute>
            <EditLoan />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-analysis"
        element={
          <ProtectedRoute>
            <AIAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;