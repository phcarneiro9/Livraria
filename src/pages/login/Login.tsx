import { useState, useContext, useEffect, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import { ClipLoader } from "react-spinners";

export default function Login() {

	const navigate = useNavigate();

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	// Consumir os estados e funções da context (AuthContext)
	// usando o hook useContext (consumer)
	const { usuario, handleLogin, isLoading } = useContext(AuthContext);

	useEffect( () => {
		if (usuario.token !== ""){
			navigate("/home");
		}
		}, [usuario])

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
		...usuarioLogin,
		[e.target.name]: e.target.value,
		})
	}

	function login(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault();
		handleLogin(usuarioLogin);
	}

	console.log()
 

  	return (
		<main className="flex min-h-screen w-full">
		<div className="hidden md:block md:w-1/2 h-screen sticky top-0">
					<div className="bg-[url('https://ik.imagekit.io/vzr6ryejm/livraria/login.png')] bg-no-repeat w-full h-full bg-cover bg-center"></div>
				</div>

		<div className="flex flex-1 items-start md:items-center justify-center px-4 pt-24 pb-8 md:py-24">
			<div className="w-full max-w-sm flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h2 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center">Entrar</h2>
			</div>

			<form className="flex flex-col gap-4"
				onSubmit={login}
			>
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
									value={usuarioLogin.usuario}
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
									value={usuarioLogin.senha}
              						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
								/>
							</div>
				<button
				type="submit"
				className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-2"
				>
					{
						isLoading ? (
						<ClipLoader
							color="#ffffff"
							size={24}
										/>
						):(
						<span>Entrar</span>
						)
					}
				</button>
			</form>

			<p className="text-sm text-slate-600 text-center">
				Não tem uma conta?{" "}
				<Link to="/cadastro" className="text-blue-700 font-medium hover:underline">
				Cadastre-se
				</Link>
			</p>

			</div>
		</div>
		</main>
  	);
}