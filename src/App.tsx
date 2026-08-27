import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ListaCategorias from "./components/categoria/listacategorias/ListaCategorias";
import Home from "./pages/home/Home";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import FomrProduto from "./components/produto/formproduto/FormProduto";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <div className="bg-slate-50 text-slate-800 flex flex-col min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/categorias" element={<ListaCategorias/>} />
              <Route path="/cadastrarcategoria" element={<FormCategoria/>} />
              <Route path="/editarcategoria/:id" element={<FormCategoria/>} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria/>} />
              <Route path="/produtos" element={<ListaProdutos/>} />
              <Route path="/cadastrarproduto" element={<FomrProduto/>} />
              <Route path="/editarproduto/:id" element={<FomrProduto/>} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto/>} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
