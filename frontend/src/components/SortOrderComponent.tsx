export type SortOrder = "newest" | "oldest" | "highestPriority" | "lowestPriority";

type SortOrderComponentProps = {
    value: SortOrder;
    onChange: (value: SortOrder) => void;
};

export const SortOrderComponent = ({ value, onChange }: SortOrderComponentProps) => {
    return (
        <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700 sm:w-48">
            Ordenação
            <select
                value={value}
                onChange={(event) => onChange(event.target.value as SortOrder)}
                className="h-11 rounded border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
                <option value="highestPriority">Mais prioridade</option>
                <option value="lowestPriority">Menos prioridade</option>
            </select>
        </label>
    );
};