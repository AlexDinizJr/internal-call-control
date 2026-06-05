import { useEffect, useState } from "react";
import { CallPriority, CallStatus } from "../../enums/call";
import type { Call, CallUpdate, Technician } from "../../interfaces/CallRequest";
import { getTechnicians } from "../../services/technicianService";

type EditCallModalProps = {
    call: Call | null;
    isOpen: boolean;
    isSaving: boolean;
    onClose: () => void;
    onSave: (id: number, data: CallUpdate) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
};

const priorityOptions = [
    { label: "Baixa", value: CallPriority.Low },
    { label: "Media", value: CallPriority.Medium },
    { label: "Alta", value: CallPriority.High },
];

const statusOptions = [
    { label: "Pendente", value: CallStatus.Pending },
    { label: "Em andamento", value: CallStatus.InProgress },
    { label: "Concluido", value: CallStatus.Completed },
    { label: "Cancelado", value: CallStatus.Cancelled },
];

export const EditCallModal = ({ call, isOpen, isSaving, onClose, onSave, onDelete }: EditCallModalProps) => {
    const [formData, setFormData] = useState<CallUpdate>({
        title: "",
        description: "",
        priority: CallPriority.Medium,
        status: CallStatus.Pending,
        technicianId: 0,
        endedAt: null,
    });
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [isLoadingTechnicians, setIsLoadingTechnicians] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const loadTechnicians = async () => {
            setIsLoadingTechnicians(true);
            const data = await getTechnicians();
            setTechnicians(data);
            setIsLoadingTechnicians(false);
        };

        loadTechnicians();
    }, [isOpen]);

    useEffect(() => {
        if (call) {
            setFormData({
                title: call.title,
                description: call.description,
                priority: call.priority,
                status: call.status,
                technicianId: call.technicianId,
                endedAt: call.endedAt,
            });
        }
    }, [call]);

    if (!isOpen || !call) {
        return null;
    }

    const updateField = <Key extends keyof CallUpdate>(key: Key, value: CallUpdate[Key]) => {
        setFormData((current) => ({ ...current, [key]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await onSave(call.id, formData);
    };

    const handleComplete = async () => {
        await onSave(call.id, {
            ...formData,
            status: CallStatus.Completed,
            endedAt: new Date().toISOString(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4 py-6">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-950">Editar chamado #{call.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">Aberto em atendimento com {call.technicianName || "Nao atribuido"}</p>
                    </div>
                    <button type="button" onClick={onClose} className="rounded px-3 py-2 text-sm text-slate-500 hover:bg-slate-100">
                        Fechar
                    </button>
                </div>

                <div className="mt-5 grid gap-4">
                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Título
                        <input
                            value={formData.title}
                            onChange={(event) => updateField("title", event.target.value)}
                            maxLength={50}
                            required
                            className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        />
                    </label>

                    <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Descrição
                        <textarea
                            value={formData.description}
                            onChange={(event) => updateField("description", event.target.value)}
                            maxLength={250}
                            required
                            rows={4}
                            className="rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                        />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-2 text-sm font-medium text-slate-700">
                            Responsável
                            <select
                                value={formData.technicianId}
                                onChange={(event) => updateField("technicianId", Number(event.target.value))}
                                disabled={isLoadingTechnicians}
                                required
                                className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100"
                            >
                                <option value="">{isLoadingTechnicians ? "Carregando..." : "Selecione um responsável"}</option>
                                {technicians.map((technician) => (
                                    <option key={technician.id} value={technician.id}>{technician.name}</option>
                                ))}
                            </select>
                        </label>

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
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">

                        <label className="grid gap-2 text-sm font-medium text-slate-700">
                            Status
                            <select
                                value={formData.status}
                                onChange={(event) => updateField("status", Number(event.target.value) as CallStatus)}
                                className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </label>

                        <label className="grid gap-2 text-sm font-medium text-slate-700">
                            Encerrado em
                            <input
                                type="datetime-local"
                                value={formData.endedAt ? formData.endedAt.slice(0, 16) : ""}
                                onChange={(event) => updateField("endedAt", event.target.value ? new Date(event.target.value).toISOString() : null)}
                                className="h-11 rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => onDelete(call.id)}
                        className="h-10 rounded border border-rose-200 px-4 text-sm font-medium text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Excluir
                    </button>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            type="button"
                            disabled={isSaving}
                            onClick={handleComplete}
                            className="h-10 rounded border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Marcar concluído
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="h-10 rounded bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSaving ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};