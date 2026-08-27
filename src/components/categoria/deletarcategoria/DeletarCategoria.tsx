import { WarningCircleIcon } from '@phosphor-icons/react'
import type Categoria from '../../../models/Categoria';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';
import { ClipLoader } from 'react-spinners';

function DeletarCategoria() {

	// Redirecionar o usuário para uma outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o Loader (animação de carregamento)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar os dados da Categoria que será deletado no Backend (API)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    // Consumo da Context para obter os dados do usuário autenticado (estado usuário)
    // e a função handleLogout para efetuar logout caso o token seja inválido
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Acessar o parâmetro da rota (id da categoria)
    const { id } = useParams<{ id: string }>();

    // Função responsável por buscar uma Categoria pelo ID no Backend (API)
    async function buscarCategoriaPorId() {

        setIsLoading(true);

        try {

            await buscar(`/categorias/${id}`, setCategoria, {
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
    
    //useEffect para monitorar o id (parâmetro da rota)
    useEffect( () => {
        if (id !== undefined) {
            buscarCategoriaPorId();
        }
    }, [id])


    // useEffect para monitorar o token
    useEffect( () => {
        if (token === "") {
            alert("Você precisa estar logado!");
            navigate("/");
        }
    }, [token]);


    function retornar() {
        navigate("/categorias");
    }


    // Função responsável por deletar uma categoria pelo ID no Backend (API)
    async function deletarCategoria() {

        setIsLoading(true);

        try {

            await deletar(`/categorias/${id}`, {
                headers: { Authorization: token }
            })    
            alert("categoria deletada com sucesso!");

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                alert(`Erro ao deletar a categoria: ${error.response.status}`);
                handleLogout();
            } 
        } finally {
            setIsLoading(false);
        }     

        retornar();

    }


	return (
		<main className="grow w-full max-w-xl mx-auto px-4 md:px-8 py-24 md:py-28 flex flex-col gap-8">
			<div className="flex flex-col items-center text-center gap-3 bg-white border border-slate-200 rounded-lg p-8">
				<div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-600">
					<WarningCircleIcon size={32} />
				</div>
				<h1 className="text-2xl font-semibold text-slate-800">
					Excluir Categoria
				</h1>

				<p className="text-base text-slate-600">
					Tem certeza que deseja excluir a categoria{' '}
					<span className="font-semibold text-slate-800"	
					>{categoria.tipo}
					</span>
					?
				</p>

				<div className="flex items-center justify-center gap-3 mt-4">
					<button className="bg-green-600 text-white text-base px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium"
					onClick={deletarCategoria}
					>
						{
							isLoading ? (
							<ClipLoader
								color="#ffffff"
								size={24}
											/>
							):(
							<span>Sim</span>
							)
						}
						
					</button>
					<button className="bg-red-600 text-white text-base px-6 py-3 rounded-lg border border-slate-300 hover:bg-red-700 transition-colors font-medium"
					onClick={retornar}
					>
						Não
					</button>
				</div>
			</div>
		</main>
	)
}

export default DeletarCategoria