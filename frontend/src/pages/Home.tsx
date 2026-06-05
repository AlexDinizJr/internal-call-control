import { useEffect, useState } from "react";
import type { Call } from "../interfaces/CallRequest";
import { getCalls } from "../services/callService";
import { HeroSection } from "../components/sections/HeroSection";
import { CallsSection } from "../components/sections/CallsSection";

export const Home = () => {
    const [oldestCalls, setOldestCalls] = useState<Call[]>([]);
    const [priorityCalls, setPriorityCalls] = useState<Call[]>([]);
    const [isLoadingOldestCalls, setIsLoadingOldestCalls] = useState(true);
    const [isLoadingPriorityCalls, setIsLoadingPriorityCalls] = useState(true);

    useEffect(() => {
        const loadHomeCalls = async () => {
            setIsLoadingOldestCalls(true);
            setIsLoadingPriorityCalls(true);

            const [oldestData, priorityData] = await Promise.all([
                getCalls({
                    SortBy: "Date",
                    IsDescending: false,
                    PageNumber: 1,
                    PageSize: 3,
                }),
                getCalls({
                    SortBy: "Priority",
                    IsDescending: true,
                    PageNumber: 1,
                    PageSize: 3,
                }),
            ]);

            setOldestCalls(oldestData);
            setPriorityCalls(priorityData);
            setIsLoadingOldestCalls(false);
            setIsLoadingPriorityCalls(false);
        };

        loadHomeCalls();
    }, []);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
            <HeroSection />
            
            <CallsSection
                title="Chamados antigos"
                subtitle="Urgente"
                description="Os 3 chamados mais antigos aguardando atenção."
                calls={oldestCalls}
                isLoading={isLoadingOldestCalls}
            />

            <CallsSection
                title="Maiores prioridades"
                subtitle="Prioridade"
                description="Os 3 chamados com prioridade mais alta no momento."
                calls={priorityCalls}
                isLoading={isLoadingPriorityCalls}
            />
        </div>
    );
};