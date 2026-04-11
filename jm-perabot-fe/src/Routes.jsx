import { BrowserRouter, Route, Routes as RRRoutes } from 'react-router-dom'
import CategoryListPage from './pages/CategoryListPage'
import CreateCategoryPage from './pages/CreateCategoryPage'
import CreateProductPage from './pages/CreateProductPage'
import CreateUserPage from './pages/CreateUserPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MePage from './pages/MePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListPage from './pages/ProductListPage'

export default function Routes() {
  return (
    <BrowserRouter>
      <RRRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/users/add" element={<CreateUserPage />} />
        <Route path="/categories/add" element={<CreateCategoryPage />} />
        <Route path="/categories/:id" element={<ProductListPage />} />
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/add" element={<CreateProductPage />} />
      </RRRoutes>
    </BrowserRouter>
  )
}
