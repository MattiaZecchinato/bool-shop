import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
