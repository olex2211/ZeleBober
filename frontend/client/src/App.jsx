import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ChatsPage from "./pages/ChatsPage";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import PostDetailPage from "./pages/PostDetailPage.jsx";


function AppRoutes() {
    const location = useLocation();

    return (
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/create" element={<CreatePostPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/chats/:id" element={<ChatsPage key={location.key} />} />
          <Route path="/chats/" element={<ChatsPage key={location.key} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Routes>
    );
}

export default function App() {
    
    return (
      <>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </>
    );
}