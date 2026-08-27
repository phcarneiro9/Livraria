import { PlusIcon } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import CardCategoria from '../cardcategoria/CardCategoria'
import type Categoria from '../../../models/Categoria';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Service';
import { SyncLoader } from 'react-spinners';

export default function Categorias() {

	// Redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar todas as categorias persistidas no Backend (API)
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Consumo da Context para obter os dados do usuário autenticado (estado usuário)
    // e a função handleLogout para efetuar logout caso o token seja inválido
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // useEffect para monitorar o token
    useEffect( () => {
        if (token === "") {
            alert("Você precisa estar logado!");
            navigate("/");
        }
    }, [token]);

    // useEffect responsável por executar a função buscarCategorias
    useEffect( () => {
        buscarCategorias();
    }, [categorias.length]);

    // Função responsável por buscar todas as categorias no Backend (API)
    async function buscarCategorias() {

        setIsLoading(true);

        try {

            await buscar(`/categorias`, setCategorias, {
                headers: { Authorization: token }
            })    

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                alert(`Erro ao consultar as categorias: ${error.response.status}`);
                handleLogout();
            } 
        } finally {
            setIsLoading(false);
        }
        
    }

	return (
		<main className="grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
			<div className="flex justify-between gap-2">
				<h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
					Categorias
				</h1>

				{isLoading && (
					<div className="flex justify-center w-full my-8">
						<SyncLoader color="#155dfc" size={28} />
					</div>
            	)}

				<Link
					to="/cadastrarcategoria"
					className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit"
				>
					<PlusIcon size={18} />
					Nova Categoria
				</Link>
			</div>

			{!isLoading && categorias.length === 0 && (
				<span className="text-3xl text-center my-8">
					Nenhuma Categoria foi encontrada!
				</span>
            )}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

				{
					categorias.map ((categoria) => (

						<CardCategoria 
							key={categoria.id}
							categoria={categoria}
						/>

					))
                }
	
			</div>
		</main>
	)
}