import { useState, useEffect, type SyntheticEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import axios from "axios";
import { cadastrarUsuario } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function Cadastro() {

	// Redirecionar o usuário para uma outra rota
	const navigate = useNavigate();

	// Estado responsável por controlar o Loader (animação de carregamento)
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Estado responsável por guardar os dados do usuário que serão
	// persistidos (gravados) no banco de dados da minha API
	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		senha: "",
		foto: "",
	})

	// Estado responsável por guardar a senha digitada no campo confirmar senha
	const [confirmarSenha, setConfirmarSenha] = useState<string>("");

	// Tratar do efeito colateral do sucesso do cadastro
	// Redirecionar para a página de login
	useEffect( () => {
		if (usuario.id !== 0){
		retornar();
		}
	}, [usuario])

	// Função responsável por atualizar o estado usuario
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuario({
		...usuario,
		[e.target.name]: e.target.value,
		})
	}

	// Função responsável por atualizar o estado confirmarSenha
	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value)
	}

	// Função responsável por enviar uma requisição do tipo POST
	// com os dados do usuário (estado usuario)
	async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>) {

		// Impede o envio automático do formulário
		e.preventDefault();

		// Validação da senha digitada
		if (confirmarSenha !== usuario.senha || usuario.senha.length < 8) {
		alert("Senha não confere e/ou não possue pelo menos 8 caracteres");
		setUsuario({...usuario, senha: ""});
		setConfirmarSenha("");
		return;
		}

		setIsLoading(true);

		try{

			await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
			alert("Usuário cadastrado com sucesso!");

		}catch(error){
			if (axios.isAxiosError(error) && error.response) {
				alert(`Erro ao cadastrar o usuário: ${error.response.status}`);
				console.log("Resposta da API: ", error.response.data)
			} else {
				alert("Erro ao cadastrar o usuário! Verifique a conexão com a API!")
			}
		} finally {
			setIsLoading(false);
		}

	}

	// Função para retornar para a página de login
	function retornar() {
		navigate("/");
	}

	console.log(JSON.stringify(usuario));
	console.log("Confirmar: ", confirmarSenha)

	return (
		<main className="flex min-h-screen w-full">
			<div className="hidden md:block md:w-1/2 h-screen sticky top-0">
				<div className="bg-[url('https://ik.imagekit.io/vzr6ryejm/livraria/livros.png?updatedAt=1786984340352')] bg-no-repeat w-full h-full bg-cover bg-center"></div>
			</div>

			<div className="flex flex-1 items-start md:items-center justify-center px-4 pt-20 pb-8 md:py-24">
				<div className="w-full max-w-sm flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center">
							Cadastrar Usuário
						</h2>
					</div>

					<form className="flex flex-col gap-4"
						onSubmit={cadastrarNovoUsuario}
					>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="nome"
								className="text-sm font-medium text-slate-700"
							>
								Nome
							</label>
							<input
								id="nome"
								name="nome"
								type="text"
								required
								className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="Seu nome completo"
								value={usuario.nome}
              					onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="usuario"
								className="text-sm font-medium text-slate-700"
							>
								Usuário (e-mail)
							</label>
							<input
								id="usuario"
								name="usuario"
								type="usuario"
								required
								className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="seu@email.com"
								value={usuario.usuario}
              					onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="foto"
								className="text-sm font-medium text-slate-700"
							>
								Foto (URL){' '}
								<span className="text-slate-400 font-normal">
									opcional
								</span>
							</label>
							<input
								id="foto"
								name="foto"
								type="text"
								className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="https://..."
								value={usuario.foto}
              					onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="senha"
								className="text-sm font-medium text-slate-700"
							>
								Senha
							</label>
							<input
								id="senha"
								name="senha"
								type="password"
								required
								className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="••••••••"
								value={usuario.senha}
              					onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label
								htmlFor="confirmarSenha"
								className="text-sm font-medium text-slate-700"
							>
								Confirmar Senha
							</label>
							<input
								id="confirmarSenha"
								name="confirmarSenha"
								type="password"
								required
								className="border border-slate-300 rounded-lg px-4 py-2 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
								placeholder="••••••••"
								value={confirmarSenha}
              					onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
							/>
						</div>

						<div className="flex gap-3 mt-2">
							<button
								className="flex-1 text-center border border-slate-300 text-slate-700 text-base px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
								onClick={retornar}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="flex-1 bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
							>
								{
									isLoading ? (
									<ClipLoader
										color="#ffffff"
										size={24}
													/>
									):(
									<span>Cadastrar</span>
									)
								}

							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	)
}

export default Cadastro