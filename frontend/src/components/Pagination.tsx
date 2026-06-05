type PaginationProps = {
    page: number;
    pageSize: number;
    currentCount: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ page, pageSize, currentCount, onPageChange }: PaginationProps) => {
    const hasPrevious = page > 1;
    const hasNext = currentCount >= pageSize;

    return (
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-500">Página {page}</p>
            <div className="flex gap-2">
                <button
                    type="button"
                    disabled={!hasPrevious}
                    onClick={() => onPageChange(page - 1)}
                    className="h-10 rounded border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Anterior
                </button>
                <button
                    type="button"
                    disabled={!hasNext}
                    onClick={() => onPageChange(page + 1)}
                    className="h-10 rounded bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};