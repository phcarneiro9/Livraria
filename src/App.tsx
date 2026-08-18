import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Produtos from "./pages/produtos/Produtos"
import Categorias from "./pages/categorias/Categorias"


function App() {


  return (
    <>
    <div className="bg-slate-50 text-slate-800 flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
