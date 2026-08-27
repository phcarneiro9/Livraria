import { PlusIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import CardProduto from '../cardproduto/CardProduto';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import type Produto from '../../../models/Produto';
import { buscar } from '../../../services/Service';
import { SyncLoader } from 'react-spinners';


function Produtos() {

	const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [produtos, setProdutos] = useState<Produto[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado!")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        buscarProdutos()    
    }, [produtos.length])

    async function buscarProdutos() {
        try {

            setIsLoading(true)

            await buscar("/produtos", setProdutos, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }finally {
            setIsLoading(false)
        }
    }

	return (
		<>
			{isLoading && (
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
                    <SyncLoader
                        color="#155dfc"
                        size={28}
                    />
                </div>
            )}

			<main className="grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
				<div className="flex justify-between gap-2">

					{(!isLoading && produtos.length === 0) && (
                            <span className="text-3xl max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-28 pb-12 md:pb-16 flex flex-col gap-8">
                                Nenhum Produto foi encontrada!
                            </span>
                    )}

					<h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
						Produtos
					</h1>

					<Link
						to={"/cadastrarproduto"}
						className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors w-fit"
					>
						<PlusIcon size={18} />
						Novo Produto
					</Link>

				</div>

				<div className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:justify-items-stretch lg:grid-cols-4 gap-4 md:gap-6">
					{
						produtos.map((produto) => (
							<CardProduto key={produto.id} produto={produto}/>
						))
					}
				</div>
			</main>
		</>
	);
}

export default Produtos