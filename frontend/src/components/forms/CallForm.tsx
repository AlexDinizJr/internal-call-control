import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CallPriority } from "../../enums/call";
import type { CallRequest, Technician } from "../../interfaces/CallRequest";
import { ROUTES } from "../../routes/Paths";
import { createCall, createCallAuto } from "../../services/callService";
import { getTechnicians } from "../../services/technicianService";

const initialFormData: CallRequest = {
    title: "",
    description: "",
    priority: CallPriority.Medium,
};

const priorityOptions = [
    { label: "Baixa", value: CallPriority.Low },
    { label: "Média", value: CallPriority.Medium },
    { label: "Alta", value: CallPriority.High },
];

export const CallForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CallRequest>(initialFormData);
    const [technicianId, setTechnicianId] = useState("");
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [isLoadingTechnicians, setIsLoadingTechnicians] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadTechnicians = async () => {
            setIsLoadingTechnicians(true);
            const data = await getTechnicians();
            setTechnicians(data);
            setIsLoadingTechnicians(false);
        };

        loadTechnicians();
    }, []);

    const updateField = <Key extends keyof CallRequest>(key: Key, value: CallRequest[Key]) => {
        setFormData((current) => ({ ...current, [key]: value }));
    };

    const submitCall = async (useAutoAssignment: boolean) => {
        setMessage("");
        setIsSubmitting(true);

        const createdCall = useAutoAssignment
            ? await createCallAuto(formData)
            : technicianId
                ? await createCall(Number(technicianId), formData)
                : null;

        setIsSubmitting(false);

        if (createdCall) {
            navigate(ROUTES.CALLS);
            return;
        }

        setMessage(useAutoAssignment ? "Não foi possível escolher um técnico automaticamente." : "Selecione um técnico para registrar o chamado.");
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submitCall(false);
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setTechnicianId("");
        navigate(ROUTES.CALLS);
    };

    return (
        <form onSubmit={handleSubmit} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Titulo
                    <input
                        value={formData.title}
                        onChange={(event) => updateField("title", event.target.value)}
                        maxLength={50}
                        required
                        placeholder="Ex.: Computador nao liga"
                        className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Descricao
                    <textarea
                        value={formData.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        maxLength={250}
                        required
                        rows={5}
                        placeholder="Descreva o problema com detalhes"
                        className="rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    />
                </label>

                <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr]">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Prioridade
                        <select
                            value={formData.priority}
                            onChange={(event) => updateField("priority", Number(event.target.value) as CallPriority)}
                            className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        >
                            {priorityOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </label>

                    <div className="grid gap-2 text-sm font-medium text-slate-700">
                        Tecnico
                        <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                            <select
                                value={technicianId}
                                onChange={(event) => setTechnicianId(event.target.value)}
                                disabled={isLoadingTechnicians}
                                title="Selecione um técnico"
                                className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100"
                            >
                                <option value="">{isLoadingTechnicians ? "Carregando..." : "Selecione um tecnico"}</option>
                                {technicians.map((technician) => (
                                    <option key={technician.id} value={technician.id}>{technician.name}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => submitCall(true)}
                                className="h-11 whitespace-nowrap rounded border border-slate-900 px-4 text-sm font-medium text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Escolher automaticamente
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {message && <p className="mt-4 rounded bg-amber-50 px-3 py-2 text-sm text-amber-700">{message}</p>}

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={handleReset}
                    className="h-10 rounded border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 rounded bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "Registrando..." : "Registrar chamado"}
                </button>
            </div>
        </form>
    );
};