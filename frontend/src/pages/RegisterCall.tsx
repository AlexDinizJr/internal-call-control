import { CallForm } from "../components/forms/CallForm";

export const RegisterCall = () => {
    return (
        <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Novo atendimento</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-950">Registrar chamado</h1>
                <p className="mt-2 text-sm text-slate-600">Preencha os detalhes e atribua a demanda a um técnico.</p>
            </div>
            <CallForm />
        </section>
    );
};
