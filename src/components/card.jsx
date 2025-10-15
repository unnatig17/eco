import { Link } from "react-router-dom";

export default function Card({ to = "#", title, desc, icon = null, cta = "Open" }) {
  return (
    <Link
      to={to}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-emerald-100 animate-fade-in-up"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          {icon ?? <span className="text-xl">🌿</span>}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{desc}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
            {cta}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor"><path d="M12.293 5.293a1 1 0 011.414 0L18 9.586a1 1 0 010 1.414l-4.293 4.293a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 110-2h10.586l-2.293-2.293a1 1 0 010-1.414z"/></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

