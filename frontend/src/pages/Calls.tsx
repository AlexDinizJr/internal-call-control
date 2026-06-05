import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CallGrid } from "../components/grids/CallGrid";
import { SearchBar } from "../components/SearchBar";
import { SortOrderComponent } from "../components/SortOrderComponent";
import { Pagination } from "../components/Pagination";
import { EditCallModal } from "../components/modals/EditCallModal";
import type { Call, CallGroup, CallUpdate } from "../interfaces/CallRequest";
import { deleteCall, getCalls, updateCall } from "../services/callService";
import { getSortOrder } from "../utils/getSortOrder";
import { getSortParams } from "../utils/getSortParams";

const PAGE_SIZE = 9;

export const Calls = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [calls, setCalls] = useState<Call[]>([]);
    const [callGroups, setCallGroups] = useState<CallGroup[]>([]);
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const queryState = useMemo(() => {
        const title = searchParams.get("Title") ?? "";
        const sortBy = searchParams.get("SortBy");
        const isDescending = searchParams.get("IsDescending") === "true";
        const sort = getSortOrder(sortBy, isDescending);
        const page = Number(searchParams.get("PageNumber") ?? "1");
        const groupByTechnician = searchParams.get("GroupBy") === "Technician";

        return {
            title,
            sort,
            page: Number.isNaN(page) || page < 1 ? 1 : page,
            groupByTechnician,
        };
    }, [searchParams]);

    useEffect(() => {
        const loadCalls = async () => {
            setIsLoading(true);
            setErrorMessage("");

            const data = await getCalls({
                Title: queryState.title || undefined,
                ...getSortParams(queryState.sort),
                GroupBy: queryState.groupByTechnician ? "Technician" : undefined,
                PageNumber: queryState.page,
                PageSize: PAGE_SIZE,
            });

            if (queryState.groupByTechnician) {
                setCallGroups(data);
                setCalls(data.flatMap((group: CallGroup) => group.calls));
            } else {
                setCalls(data);
                setCallGroups([]);
            }

            setIsLoading(false);
        };

        loadCalls();
    }, [queryState.title, queryState.sort, queryState.page, queryState.groupByTechnician]);

    const updateQuery = (updates: Record<string, string | number | boolean | undefined>) => {
        const nextParams = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === "") {
                nextParams.delete(key);
            } else {
                nextParams.set(key, String(value));
            }
        });

        setSearchParams(nextParams);
    };

    const handleSave = async (id: number, data: CallUpdate) => {
        setIsSaving(true);
        const updatedCall = await updateCall(String(id), data);
        setIsSaving(false);

        if (!updatedCall) {
            setErrorMessage("Não foi possível atualizar o chamado.");
            return;
        }

        setSelectedCall(null);
        setCalls((current) =>
            current.map((call) =>
                call.id === id
                    ? { ...call, ...updatedCall, technicianName: updatedCall.technicianName || call.technicianName }
                    : call
            )
        );
        setCallGroups((current) =>
            current.map((group) => ({
                ...group,
                calls: group.calls.map((call) =>
                    call.id === id
                        ? { ...call, ...updatedCall, technicianName: updatedCall.technicianName || call.technicianName }
                        : call
                ),
            }))
        );
    };

    const handleDelete = async (id: number) => {
        setIsSaving(true);
        const deleted = await deleteCall(String(id));
        setIsSaving(false);

        if (!deleted) {
            setErrorMessage("Não foi possível excluir o chamado.");
            return;
        }

        setSelectedCall(null);
        setCalls((current) => current.filter((call) => call.id !== id));
        setCallGroups((current) =>
            current
                .map((group) => ({
                    ...group,
                    calls: group.calls.filter((call) => call.id !== id),
                }))
                .filter((group) => group.calls.length > 0)
        );
    };

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Atendimentos</p>
                    <h1 className="mt-2 text-3xl font-bold text-slate-950">Chamados</h1>
                    <p className="mt-2 text-sm text-slate-600">Busque, ordene e atualize chamados internos.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <SearchBar
                        value={queryState.title}
                        onChange={(value) => updateQuery({ Title: value, PageNumber: 1 })}
                    />
                    <SortOrderComponent
                        value={queryState.sort}
                        onChange={(value) => updateQuery({ ...getSortParams(value), PageNumber: 1 })}
                    />
                    <button
                        type="button"
                        onClick={() =>
                            updateQuery({
                                GroupBy: queryState.groupByTechnician ? undefined : "Technician",
                                PageNumber: 1,
                            })
                        }
                        className={[
                            "h-11 min-w-44 whitespace-nowrap rounded border px-4 text-sm font-medium transition",
                            queryState.groupByTechnician
                                ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-700"
                                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
                        ].join(" ")}
                    >
                        {queryState.groupByTechnician ? "Exibir lista" : "Agrupar por técnico"}
                    </button>
                </div>
            </div>

            {errorMessage && <p className="mb-4 rounded bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}

            <div className="space-y-5">
                {queryState.groupByTechnician && !isLoading && callGroups.length > 0 ? (
                    <div className="space-y-8">
                        {callGroups.map((group) => (
                            <section key={group.technicianName} className="space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <h2 className="text-lg font-semibold text-slate-950">{group.technicianName}</h2>
                                    <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                        {group.calls.length} chamado{group.calls.length === 1 ? "" : "s"}
                                    </span>
                                </div>
                                <CallGrid calls={group.calls} isLoading={false} onEdit={setSelectedCall} />
                            </section>
                        ))}
                    </div>
                ) : (
                    <CallGrid calls={calls} isLoading={isLoading} onEdit={setSelectedCall} />
                )}
                <Pagination
                    page={queryState.page}
                    pageSize={PAGE_SIZE}
                    currentCount={queryState.groupByTechnician ? callGroups.length : calls.length}
                    onPageChange={(page) => updateQuery({ PageNumber: page })}
                />
            </div>

            <EditCallModal
                call={selectedCall}
                isOpen={Boolean(selectedCall)}
                isSaving={isSaving}
                onClose={() => setSelectedCall(null)}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </section>
    );
};