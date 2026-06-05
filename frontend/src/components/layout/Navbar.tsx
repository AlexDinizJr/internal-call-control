import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/Paths";

const navItems = [
    { label: "Chamados", path: ROUTES.CALLS },
    { label: "Cadastro", path: ROUTES.REGISTER_CALLS },
];

export const Navbar = () => {
    return (
        <header className="border-b border-slate-200 bg-white">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                <NavLink to={ROUTES.HOME} className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded bg-slate-900 text-sm font-bold text-white">
                        ICC
                    </span>
                    <div>
                        <p className="text-base font-semibold text-slate-950">Internal Call Control</p>
                        <p className="text-xs text-slate-500">Controle Interno de Chamados</p>
                    </div>
                </NavLink>

                <div className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                [
                                    "rounded px-3 py-2 text-sm font-medium transition",
                                    isActive
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                                ].join(" ")
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    );
};