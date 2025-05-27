import { BrowserRouter, Route, Routes } from "react-router-dom"
import SearchPage from "./pages/SearchPage"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>homepage</h1>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
