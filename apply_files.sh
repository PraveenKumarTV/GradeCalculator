#!/usr/bin/env bash
set -euo pipefail

ROOT="/home/praveen/Desktop/GradeCalculator/Grade-calculator-app"
mkdir -p "$ROOT"
cd "$ROOT"

# package.json
cat > package.json <<'JSON_EOF'
{
  "name": "grade-calculator-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.4.7",
    "vite": "^5.0.0"
  }
}
JSON_EOF

# vite.config.js
cat > vite.config.js <<'JS_EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});
JS_EOF

# tailwind config
cat > tailwind.config.cjs <<'CJS_EOF'
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {}
  },
  plugins: []
};
CJS_EOF

# postcss config
cat > postcss.config.cjs <<'CJS_EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
CJS_EOF

# index.html
cat > index.html <<'HTML_EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Grade Calculator</title>
  </head>
  <body class="bg-slate-50">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HTML_EOF

# src files
mkdir -p src/components

cat > src/main.jsx <<'MJS_EOF'
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
MJS_EOF

cat > src/index.css <<'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Use Tailwind utility classes in components; no extra plain CSS required */
CSS_EOF

cat > src/App.jsx <<'APP_EOF'
import React, { useState } from "react";
import InternalMarks from "./components/InternalMarks";
import ExternalMarks from "./components/ExternalMarks";
import Result from "./components/Result";

export default function App() {
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [cat1, setCat1] = useState("");
  const [cat2, setCat2] = useState("");
  const [external, setExternal] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validateAll = () => {
    const e = {};
    const toCheck = [
      { key: "a1", value: a1, min: 0, max: 10 },
      { key: "a2", value: a2, min: 0, max: 10 },
      { key: "cat1", value: cat1, min: 0, max: 25 },
      { key: "cat2", value: cat2, min: 0, max: 25 },
      { key: "external", value: external, min: 0, max: 100 }
    ];

    toCheck.forEach(({ key, value, min, max }) => {
      if (value === "") {
        e[key] = "Required";
        return;
      }
      const n = Number(value);
      if (Number.isNaN(n)) {
        e[key] = "Must be a number";
        return;
      }
      if (n < min) e[key] = `Cannot be less than ${min}`;
      if (n > max) e[key] = `Cannot exceed ${max}`;
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calculate = () => {
    if (!validateAll()) return null;

    const iA1 = Number(a1);
    const iA2 = Number(a2);
    const iCat1 = Number(cat1);
    const iCat2 = Number(cat2);
    const iExternal = Number(external);

    const internalTotal = iA1 + iA2 + iCat1 + iCat2;
    const externalScaled = (iExternal / 100) * 30;
    const finalTotal = internalTotal + externalScaled;

    let grade = "F";
    if (finalTotal >= 90) grade = "A+";
    else if (finalTotal >= 80) grade = "A";
    else if (finalTotal >= 70) grade = "B";
    else if (finalTotal >= 60) grade = "C";

    return {
      internalTotal: Number(internalTotal.toFixed(2)),
      externalScaled: Number(externalScaled.toFixed(2)),
      finalTotal: Number(finalTotal.toFixed(2)),
      grade
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-4 text-slate-700">Grade Calculator</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <InternalMarks
            values={{ a1, a2, cat1, cat2 }}
            setters={{ setA1, setA2, setCat1, setCat2 }}
            errors={errors}
          />

          <ExternalMarks
            value={external}
            setValue={setExternal}
            error={errors.external}
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <button
            onClick={() => {
              const res = calculate();
              setResult(res);
            }}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
          >
            Calculate Grade
          </button>

          <div className="text-sm text-slate-500">
            Enter marks (no negatives, respect max values). Errors shown inline.
          </div>
        </div>

        <div className="mt-6">
          <Result result={result} />
        </div>
      </div>
    </div>
  );
}
APP_EOF

cat > src/components/InternalMarks.jsx <<'IM_EOF'
import React from "react";

export default function InternalMarks({ values, setters, errors }) {
  const { a1, a2, cat1, cat2 } = values;
  const { setA1, setA2, setCat1, setCat2 } = setters;

  const inputClass =
    "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <h2 className="font-medium mb-3 text-slate-700">Internal Marks (out of 70)</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Assignment 1 (out of 10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={a1}
            onChange={(e) => setA1(e.target.value)}
            className={inputClass}
            aria-label="Assignment 1"
          />
          {errors?.a1 && <div className="text-xs text-red-600 mt-1">{errors.a1}</div>}
        </div>

        <div>
          <label className="block text-sm mb-1">Assignment 2 (out of 10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={a2}
            onChange={(e) => setA2(e.target.value)}
            className={inputClass}
            aria-label="Assignment 2"
          />
          {errors?.a2 && <div className="text-xs text-red-600 mt-1">{errors.a2}</div>}
        </div>

        <div>
          <label className="block text-sm mb-1">CAT Test 1 (out of 25)</label>
          <input
            type="number"
            min="0"
            max="25"
            value={cat1}
            onChange={(e) => setCat1(e.target.value)}
            className={inputClass}
            aria-label="CAT Test 1"
          />
          {errors?.cat1 && <div className="text-xs text-red-600 mt-1">{errors.cat1}</div>}
        </div>

        <div>
          <label className="block text-sm mb-1">CAT Test 2 (out of 25)</label>
          <input
            type="number"
            min="0"
            max="25"
            value={cat2}
            onChange={(e) => setCat2(e.target.value)}
            className={inputClass}
            aria-label="CAT Test 2"
          />
          {errors?.cat2 && <div className="text-xs text-red-600 mt-1">{errors.cat2}</div>}
        </div>
      </div>
    </div>
  );
}
IM_EOF

cat > src/components/ExternalMarks.jsx <<'EM_EOF'
import React from "react";

export default function ExternalMarks({ value, setValue, error }) {
  const inputClass =
    "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <h2 className="font-medium mb-3 text-slate-700">External Exam (out of 100)</h2>

      <div>
        <label className="block text-sm mb-1">External Exam Marks (0–100)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
          aria-label="External Exam Marks"
        />
        {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
      </div>
    </div>
  );
}
EM_EOF

cat > src/components/Result.jsx <<'R_EOF'
import React from "react";

export default function Result({ result }) {
  if (!result) {
    return (
      <div className="p-4 rounded-lg border border-dashed border-slate-200 text-slate-600">
        No result yet. Click "Calculate Grade" after entering valid marks.
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg bg-white border shadow-sm">
      <h3 className="font-semibold mb-3 text-slate-700">Result</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-slate-50 rounded">
          <div className="text-xs text-slate-500">Internal (out of 70)</div>
          <div className="text-xl font-medium">{result.internalTotal}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="text-xs text-slate-500">External (scaled to 30)</div>
          <div className="text-xl font-medium">{result.externalScaled}</div>
        </div>

        <div className="p-3 bg-indigo-600 text-white rounded">
          <div className="text-xs opacity-80">Final (out of 100)</div>
          <div className="text-2xl font-bold">{result.finalTotal}</div>
          <div className="mt-1 text-sm">Grade: {result.grade}</div>
        </div>
      </div>
    </div>
  );
}
R_EOF

chmod +x apply_files.sh

echo "Files written to: $ROOT"
echo "Run: cd \"$ROOT\" && npm install && npm run dev"