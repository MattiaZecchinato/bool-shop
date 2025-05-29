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


function App() {

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/search/:slug/:type" element={<SearchPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/boardgames" element={<BoardgamesPage />} />
              <Route path="/puzzles" element={<PuzzlesPage />} />
              <Route path="*" element={<div>page not found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}

export default App
