import { CallPriority, CallStatus } from "../../enums/call";
import type { Call } from "../../interfaces/CallRequest";

type CallCardProps = {
    call: Call;
    onEdit: (call: Call) => void;
    actionLabel?: string;
};

const priorityLabels: Record<CallPriority, string> = {
    [CallPriority.Low]: "Baixa",
    [CallPriority.Medium]: "Média",
    [CallPriority.High]: "Alta",
};

const statusLabels: Record<CallStatus, string> = {
    [CallStatus.Pending]: "Pendente",
    [CallStatus.InProgress]: "Em andamento",
    [CallStatus.Completed]: "Concluído",
    [CallStatus.Cancelled]: "Cancelado",
};

const priorityClasses: Record<CallPriority, string> = {
    [CallPriority.Low]: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    [CallPriority.Medium]: "bg-amber-50 text-amber-700 ring-amber-200",
    [CallPriority.High]: "bg-rose-50 text-rose-700 ring-rose-200",
};

const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
};

export const CallCard = ({ call, onEdit, actionLabel = "Editar chamado" }: CallCardProps) => {
    return (
        <article className="flex min-h-64 flex-col justify-between rounded border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-950">{call.title}</h2>
                        <p className="mt-1 text-sm text-slate-500">#{call.id} | {formatDate(call.createdAt)}</p>
                    </div>
                    <span className={`rounded px-2.5 py-1 text-xs font-semibold ring-1 ${priorityClasses[call.priority]}`}>
                        {priorityLabels[call.priority]}
                    </span>
                </div>

                <p className="line-clamp-3 text-sm leading-6 text-slate-600">{call.description}</p>

                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    <div>
                        <dt className="text-slate-500">Status</dt>
                        <dd className="font-medium text-slate-900">{statusLabels[call.status]}</dd>
                    </div>
                    <div>
                        <dt className="text-slate-500">Tecnico</dt>
                        <dd className="font-medium text-slate-900">{call.technicianName || "Não atribuído"}</dd>
                    </div>
                </dl>
            </div>

            <button
                type="button"
                onClick={() => onEdit(call)}
                className="mt-5 h-10 rounded bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
            >
                {actionLabel}
            </button>
        </article>
    );
};
