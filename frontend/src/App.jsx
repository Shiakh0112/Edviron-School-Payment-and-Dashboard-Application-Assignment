// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Login from "./components/user/Login";
import AuthPage from "./pages/AuthPage"; // Import the new AuthPage component
import Register from "./components/user/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./components/Transactions";
import TransactionDetails from "./components/TransactionDetails";
import TransactionStatus from "./components/TransactionStatus";
// import CreatePayment from "./components/CreatePayment";
import LoadingSpinner from "./components/LoadingSpinner";
import CreatePayment from "./pages/CreatePayment";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen  bg-gray-50 dark:bg-gray-900">
      {isAuthenticated && <Header />}
      <main>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? <AuthPage /> : <Navigate to="/transactions" />
            }
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <AuthPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/transactions"
            element={
              isAuthenticated ? <Transactions /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/school/:schoolId"
            element={
              isAuthenticated ? (
                <TransactionDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/status-check"
            element={
              isAuthenticated ? <TransactionStatus /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-payment"
            element={
              isAuthenticated ? <CreatePayment /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/transactions" : "/login"} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
