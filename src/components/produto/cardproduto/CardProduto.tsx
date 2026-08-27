import { PencilSimpleIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutosProps {
  produto: Produto
}

function CardProduto( { produto }: CardProdutosProps) {

  const fotoAuxiliar = "https://ik.imagekit.io/vzr6ryejm/livraria/Diagrama%20sem%20nome.drawio.png";


  return (
    <div className="flex flex-col w-full max-w-sm md:max-w-64 bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
      <div className="w-full aspect-3/4 bg-slate-100 overflow-hidden">
        <img
          src={produto.foto}
          alt={fotoAuxiliar}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-slate-800 text-center line-clamp-2">
          {produto.titulo}
        </h3>
        <p className="text-sm text-slate-500 text-center"
        > {produto.autor}
        </p>

        <p className="text-lg font-semibold text-slate-800 text-center mt-2">
          Preço (R$) {produto.preco}
        </p>
        <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
          Categoria: {produto.categoria?.tipo}
        </span>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
          <Link
            to={`/editarproduto/${produto.id}`}
            className="flex items-center justify-center gap-1 flex-1 text-sm font-medium text-blue-700 hover:bg-blue-50 py-2 rounded-lg transition-colors"
          >
            <PencilSimpleIcon size={18} />
            Editar
          </Link>
          <Link
            to={`/deletarproduto/${produto.id}`}
            className="flex items-center justify-center gap-1 flex-1 text-sm font-medium text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors"
          >
            <TrashSimpleIcon size={18} />
            Excluir
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardProduto