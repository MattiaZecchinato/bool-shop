import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>homepage</h1>} />
          <Route path="/search" element={<h1>pagina di ricerca</h1>} />
          <Route path="*" element={<div>page not found</div>} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
