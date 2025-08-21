import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import PostDetail from "./components/PostDetail/PostDetail.jsx"
import PostDetailPage from "./pages/PostDetailPage.jsx";

export default function App() {
    return (
      <>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/users/:id" element={<UserPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </>
    );
}