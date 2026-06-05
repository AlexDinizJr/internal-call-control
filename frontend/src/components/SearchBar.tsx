type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700 sm:max-w-sm">
            Buscar chamado
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Título do chamado"
                className="h-11 rounded border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />
        </label>
    );
};