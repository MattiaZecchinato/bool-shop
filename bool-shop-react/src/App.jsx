import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import MainLayout from "./layouts/MainLayout"
import TestPage from "./pages/TestPage"
import { CartProvider } from "./components/CartContext";
import CartPage from "./pages/CartPage";
import BoardgamesPage from "./pages/BoardgamesPage";
import PuzzlesPage from "./pages/PuzzlesPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishListPage from "./pages/WishListPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import TermOfServicePage from "./pages/TermOfServicePage"
import ProductDetailPage from "./pages/ProductDetailPage"
import Category from "./pages/Category"
import OrderRecap from "./pages/OrederRecap"
import NotFoundPage from "./pages/NotFoundPage"

import StarBackground from "./components/StarBackground"

function App() {

  return (
    <>
      <StarBackground>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wish-list" element={<WishListPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/boardgames" element={<BoardgamesPage />} />
                <Route path="/puzzles" element={<PuzzlesPage />} />
                <Route path="/order-recap" element={<OrderRecap />} />
                <Route path="/detail/:slug" element={<ProductDetailPage />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </StarBackground>
    </>
  )
}

export default App
