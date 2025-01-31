import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage, SignUpPage, SignInPage } from "./pages";
import { useUserContext } from "./context";

export const App = () => {
  const { currentUser, loading } = useUserContext();

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={currentUser ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={currentUser ? <Navigate to="/" /> : <SignInPage />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
