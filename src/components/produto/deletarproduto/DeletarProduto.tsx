import { WarningCircleIcon } from '@phosphor-icons/react'
import type Produto from '../../../models/Produto'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import { ClipLoader } from 'react-spinners'

function DeletarProduto() {

	const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert("Você precisa estar logado")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarProduto() {
        setIsLoading(true)

        try {
            await deletar(`/produtos/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert("Produto apagado com sucesso")

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                alert("Erro ao deletar o produto.")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/produtos")
    }


	return (
		<main className="grow w-full max-w-xl mx-auto px-4 md:px-8 py-24 md:py-28 flex flex-col gap-8">
			<div className="flex flex-col items-center text-center gap-3 bg-white border border-slate-200 rounded-lg p-8">
				<div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-600">
					<WarningCircleIcon size={32} />
				</div>
				<h1 className="text-2xl font-semibold text-slate-800">
					Excluir Produto
				</h1>

				<p className="text-base text-slate-600">
					Tem certeza que deseja excluir o produto{' '}
					<span className="font-semibold text-slate-800">
						{produto.titulo}
					</span>
					?
				</p>
			

				<div className="flex items-center justify-center gap-3 mt-4">
					<button className="bg-green-600 text-white text-base px-6 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium"
						onClick={deletarProduto}
					>

						{ isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
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

export default DeletarProduto