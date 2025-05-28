import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import MainLayout from "./layouts/MainLayout"
import TestPage from "./pages/TestPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<div>page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
