import { BrowserRouter, Route, Routes as RRRoutes } from 'react-router-dom'
import AssignReferralPage from './pages/AssignReferralPage'
import CategoryListPage from './pages/CategoryListPage'
import CreateCategoryPage from './pages/CreateCategoryPage'
import CreateProductPage from './pages/CreateProductPage'
import CreateTransactionPage from './pages/CreateTransactionPage'
import CreateUserPage from './pages/CreateUserPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MePage from './pages/MePage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListPage from './pages/ProductListPage'
import TransactionDetailPage from './pages/TransactionDetailPage'
import TransactionListPage from './pages/TransactionListPage'
import UserDetailPage from './pages/UserDetailPage'
import UserListPage from './pages/UserListPage'
import UserReferralListPage from './pages/UserReferralListPage'

export default function Routes() {
  return (
    <BrowserRouter>
      <RRRoutes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/me" element={<MePage />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/add" element={<CreateUserPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/users/:id/referrals" element={<UserReferralListPage />} />
        <Route path="/referral/assign" element={<AssignReferralPage />} />
        <Route path="/categories/add" element={<CreateCategoryPage />} />
        <Route path="/categories/:id" element={<ProductListPage />} />
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/add" element={<CreateProductPage />} />
        <Route path="/transactions/:id" element={<TransactionDetailPage />} />
        <Route path="/transactions/add" element={<CreateTransactionPage />} />
        <Route path="/transactions" element={<TransactionListPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </RRRoutes>
    </BrowserRouter>
  )
}
