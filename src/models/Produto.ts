import type Categoria from "./Categoria";

export default interface Produto {
    id: number;
    titulo: string;
    autor: string;
    preco: number;
    foto: string;
    categoria: Categoria | null;
}