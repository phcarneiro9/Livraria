import { ListIcon, ShoppingCartIcon, SignOutIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {

  const [menuAberto, setMenuAberto] = useState(false);

  const navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("Usuário desconectado com sucesso!")
    navigate("/");
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-slate-200 shadow-sm bg-white/75 backdrop-blur-md">
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 max-w-7xl mx-auto">

        {/* Marca */}
        <Link to="/home" className="flex items-center active:scale-95 transition-transform" onClick={() => setMenuAberto(false)}>
          <img
            alt="Livraria Online Logo"
            className="h-10 md:h-12 w-auto"
            src="https://ik.imagekit.io/vzr6ryejm/livraria/logo_livraria.svg"
          />
        </Link>

        {/* Links de navegação (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/home" className="px-3 py-1 text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/produtos" className="px-3 py-1 text-slate-600 hover:text-blue-600 transition-colors">Produtos</Link>
          <Link to="/categorias" className="px-3 py-1 text-slate-600 hover:text-blue-600 transition-colors">Categorias</Link>
        </div>

        {/* Ícones + hambúrguer */}
        <div className="flex items-center gap-1">
          <Link to='' className="text-blue-700 hover:bg-slate-100 transition-colors p-2 rounded-full" aria-label="Carrinho de compras">
            <ShoppingCartIcon size={22} />
          </Link>
          <Link to='' className="hidden sm:inline-flex text-blue-700 hover:bg-slate-100 transition-colors p-2 rounded-full" aria-label="Minha conta">
            <UserIcon size={22} />
          </Link>
          <Link
            onClick={logout}
						to=''
						className="sm:inline-flex text-blue-700 hover:bg-slate-100 transition-colors p-2 rounded-full"
						aria-label="Sair"
					>
						<SignOutIcon size={22} />
					</Link>
          <button
            className="md:hidden text-slate-600 p-2"
            onClick={() => setMenuAberto((open) => !open)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <XIcon size={26} /> : <ListIcon size={26} />}
          </button>
        </div>
      </nav>

      {/* Links de navegação (Mobile) */}
      <div className={`${menuAberto ? "flex" : "hidden"} md:hidden flex-col gap-1 border-t border-slate-200 px-4 py-3`}>
        <Link to="/home" className="px-3 py-1 text-slate-600 hover:text-blue-600 transition-colors" onClick={() => setMenuAberto(false)}>Home</Link>
        <Link to="/produtos" className="px-3 py-1 text-slate-600 hover:text-blue-600 transition-colors" onClick={() => setMenuAberto(false)}>Produtos</Link>
        <Link to="/categorias" className="px-3 py-1 text-slate-600 hover:text-blue-600 transition-colors" onClick={() => setMenuAberto(false)}>Categorias</Link>
      </div>
    </header>
  );
}