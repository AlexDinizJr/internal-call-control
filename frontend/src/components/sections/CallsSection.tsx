import { Link, useNavigate } from "react-router-dom";
import { CallGrid } from "../grids/CallGrid";
import type { Call } from "../../interfaces/CallRequest";
import { ROUTES } from "../../routes/Paths";

interface CallsSectionProps {
  title: string;
  subtitle: string;
  description: string;
  calls: Call[];
  isLoading: boolean;
}

export const CallsSection = ({ 
  title, 
  subtitle, 
  description, 
  calls, 
  isLoading 
}: CallsSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{subtitle}</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
        <Link 
          to={ROUTES.CALLS} 
          className="rounded border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-white"
        >
          Ver todos
        </Link>
      </div>

      <CallGrid
        calls={calls}
        isLoading={isLoading}
        onEdit={() => navigate(ROUTES.CALLS)}
        actionLabel="Ver na lista"
      />
    </section>
  );
};
