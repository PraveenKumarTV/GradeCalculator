import React from "react";

export function Logo() {
  return (
    <svg
      className="w-10 h-10 text-indigo-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="11" rx="2" fill="currentColor" opacity="0.08" />
      <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14v3a3 3 0 003 3h4a3 3 0 003-3v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header({ title = "Grade Calculator", subtitle = "Internal & External grade calculator", logoSrc = null }) {
  return (
    <header className="flex items-center gap-4 mb-4 relative z-30">
      <div className="flex-shrink-0">
        {logoSrc ? (
          <img src={logoSrc} alt="logo" className="w-10 h-10 object-contain" />
        ) : (
          <Logo />
        )}
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-700">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </header>
  );
}