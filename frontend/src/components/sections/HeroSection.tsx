import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/Paths";

export const HeroSection = () => {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Painel de suporte</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold text-slate-950 sm:text-5xl">
          Controle os chamados internos com prioridade, técnico e status em um só lugar.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          Registre demandas, acompanhe atendimento e mantenha a equipe alinhada com uma operação simples e direta.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link 
            to={ROUTES.REGISTER_CALLS} 
            className="rounded bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
          >
            Registrar chamado
          </Link>
          <Link 
            to={ROUTES.CALLS} 
            className="rounded border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Ver chamados
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          ["Triagem", "Priorize chamados por impacto e urgência."],
          ["Atribuicao", "Escolha o técnico ou deixe o sistema balancear a carga."],
          ["Acompanhamento", "Atualize status e data de encerramento sem perder contexto."],
        ].map(([title, description]) => (
          <div key={title} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
