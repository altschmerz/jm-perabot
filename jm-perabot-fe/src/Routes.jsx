import { BrowserRouter, Route, Routes as RRRoutes } from 'react-router-dom'
import CreateProductPage from './pages/CreateProductPage'
import LandingPage from './pages/LandingPage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function Routes() {
  return (
    <BrowserRouter>
      <RRRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/add" element={<CreateProductPage />} />
      </RRRoutes>
    </BrowserRouter>
  )
}
