import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import Login from "./pages/Login"; */
import AuthForm from "./pages/AuthForm";
import Users from "./pages/Users";
import RootRedirect from "./RootRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Smart Root */}
          <Route path="/" element={<RootRedirect />} />

          {/* Login */}
          <Route path="/login" element={<AuthForm />} />

          {/* Protected */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;