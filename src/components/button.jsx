// src/components/Button.jsx
export default function Button({ children, ...props }) {
  return (
    <button {...props}
      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:translate-y-px transition"
    >
      {children}
    </button>
  );
}
