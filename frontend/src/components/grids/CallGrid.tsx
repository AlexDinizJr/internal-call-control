import type { Call } from "../../interfaces/CallRequest";
import { CallCard } from "../cards/CallCard";

type CallGridProps = {
    calls: Call[];
    isLoading: boolean;
    onEdit: (call: Call) => void;
    actionLabel?: string;
};

export const CallGrid = ({ calls, isLoading, onEdit, actionLabel }: CallGridProps) => {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="h-64 animate-pulse rounded border border-slate-200 bg-slate-100" />
                ))}
            </div>
        );
    }

    if (calls.length === 0) {
        return (
            <div className="rounded border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-slate-950">Nenhum chamado encontrado</h2>
                <p className="mt-2 text-sm text-slate-500">Ajuste os filtros ou registre um novo chamado.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.isArray(calls) && calls.map((call) => (
                <CallCard key={call.id} call={call} onEdit={onEdit} actionLabel={actionLabel} />
            ))}
        </div>
    );
};