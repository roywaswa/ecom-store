import React, { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminPage from "./views/AdminPage";
import HomePage from "./views/HomePage";
import ProductsPage from "./views/ProductsPage";
import Dashboard from "./views/Dashboard";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [authState, setAuthState] = useState();
  const providerAuthValue = useMemo(
    () => ({ authState, setAuthState }),
    [authState, setAuthState]
  );

  return (
    <AuthContext.Provider value={providerAuthValue}>
      <Header />
      <main>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
