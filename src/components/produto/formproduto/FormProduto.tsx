import { NumericFormat } from 'react-number-format'
import type Produto from '../../../models/Produto';
import type Categoria from '../../../models/Categoria';
import { useState, useContext, useEffect, type ChangeEvent, type FormEvent, type SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { ClipLoader } from 'react-spinners';

function FomrProduto() {

	const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const [categoria, setCategoria] = useState<Categoria>({ id: 0, tipo: '', })
    const [produto, setProduto] = useState<Produto>({} as Produto)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    async function buscarCategorias() {
        try {
            await buscar("/categorias", setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert("Você precisa estar logado");
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        })
    }, [categoria])

    // useEffect para realizar o relacionamento entre o id da categoria ao atributo categoria de produto
    useEffect( () => {
        if (id !== undefined && produto.categoria && categoria.id ===0) {
            setCategoria(produto.categoria)
        }
    }, [produto.categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
        });
    }

    function retornar() {
        navigate("/produtos");
    }

    async function gerarNovoProduto(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar("/produtos", produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert("Produto atualizado com sucesso")

            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao atualizar o Produto")
                }
            }

        } else {
            try {
                await cadastrar("/produtos", produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                })

                alert("Produto cadastrado com sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert("Erro ao cadastrar o Produto");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

	function atualizarEstadoNumero(name: string, value: number | undefined) {
		setProduto({
		...produto,
		[name]: value ?? 0,
		categoria: categoria,
		})
  	}

    const carregandoCategoria = categoria.tipo === "";


	return (
		<main className="grow w-full max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-24 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center">
					{id === undefined ? "Cadastrar" : "Editar"} Produto
				</h1>
			</div>

			<form className="flex flex-col gap-5 bg-white border border-slate-200 rounded-lg p-6 md:p-8"
				onSubmit={gerarNovoProduto}>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="titulo"
						className="text-sm font-medium text-slate-700"
					>
						Título
					</label>
					<input
						id="titulo"
						name="titulo"
						type="text"
						required
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="Título do livro"
						value={produto.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="autor"
						className="text-sm font-medium text-slate-700"
					>
						Autor
					</label>
					<input
						id="autor"
						name="autor"
						type="text"
						required
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="Nome do autor"
						value={produto.autor}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="preco"
						className="text-sm font-medium text-slate-700"
					>
						Preço (R$)
					</label>
					<NumericFormat
						id="preco"
						name="preco"
						thousandSeparator="."
						decimalSeparator=","
						decimalScale={2}
						fixedDecimalScale
						allowNegative={false}
						prefix="R$ "
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="R$ 0,00"
						value={produto.preco}
            			onValueChange={(values) => atualizarEstadoNumero("preco", values.floatValue)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="foto"
						className="text-sm font-medium text-slate-700"
					>
						Foto
					</label>
					<input
						id="foto"
						name="foto"
						type="text"
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="https://..."
						value={produto.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label
						htmlFor="categoria"
						className="text-sm font-medium text-slate-700"
					>
						Categoria
					</label>
					<select
						id="categoria"
						name="categoria"
						value={categoria.id || ""}
						className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
						onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
					>
						<option value="" disabled>Selecione uma Categoria</option>

						{categorias.map((categoria) => (
                            <>
                                <option value={categoria.id}>{categoria.tipo}</option>
                            </>
                        ))};

					</select>
				</div>

				<div className="flex items-center justify-center gap-3 mt-2">
					<button
						type="submit"
						className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
						disabled={carregandoCategoria}
					>
						{
							isLoading ? (
							<ClipLoader
								color="#ffffff"
								size={24}
											/>
							):(
							<span>{id === undefined ? "Cadastrar" : "Atualizar"} Produto</span>
							)
                    	}
						
					</button>
					<button
						type="button"
						className="text-base px-6 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
						onClick={retornar}
					>
						Cancelar
					</button>
				</div>
			</form>
		</main>
	)
}

export default FomrProduto