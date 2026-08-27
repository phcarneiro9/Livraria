import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-12 md:pb-16 flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-xl border border-slate-200 p-6 md:p-12 shadow-sm">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800">
            Sua Próxima Grande Leitura Começa Aqui
          </h1>
          <p className="text-base text-slate-600">
            Descubra milhares de títulos, desde best-sellers a clássicos
            atemporais. A Livraria Online oferece a melhor curadoria para os
            amantes da leitura.
          </p>
          <div className="mt-2">
            <Link to=''
              className="bg-blue-600 text-white text-base px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
              Explorar Livros
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full h-64 md:h-80 rounded-lg overflow-hidden border border-slate-200">
          <img
            className="w-full h-full object-cover"
            alt="Composição em flat-lay com uma pilha de livros de capa dura, um e-reader e uma xícara de café sobre uma mesa branca."
            src="https://ik.imagekit.io/vzr6ryejm/livraria/hero.png?updatedAt=1786984323789"
          />
        </div>
      </section>
    </main>
  );
}