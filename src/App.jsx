import React from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import AdminPage from './views/AdminPage'
import HomePage from './views/HomePage'
import ProductsPage from './views/ProductsPage'
import Dashboard from './views/Dashboard'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
