import React from "react";

export default function InternalMarks({ values, setters, errors }) {
  const { a1, a2, cat1, cat2 } = values;
  const { setA1, setA2, setCat1, setCat2 } = setters;

  const inputClass =
    "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <h2 className="font-medium mb-3 text-slate-700">Internal Marks (assignments & CATs)</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Assignment 1 (out of 40)</label>
          <input
            type="number"
            min="0"
            max="40"
            value={a1}
            onChange={(e) => setA1(e.target.value)}
            className={inputClass}
            aria-label="Assignment 1"
          />
          {errors?.a1 && <div className="text-xs text-red-600 mt-1">{errors.a1}</div>}
        </div>

        <div>
          <label className="block text-sm mb-1">Assignment 2 (out of 40)</label>
          <input
            type="number"
            min="0"
            max="40"
            value={a2}
            onChange={(e) => setA2(e.target.value)}
            className={inputClass}
            aria-label="Assignment 2"
          />
          {errors?.a2 && <div className="text-xs text-red-600 mt-1">{errors.a2}</div>}
        </div>

        <div>
          <label className="block text-sm mb-1">CAT Test 1 (out of 60)</label>
          <input
            type="number"
            min="0"
            max="60"
            value={cat1}
            onChange={(e) => setCat1(e.target.value)}
            className={inputClass}
            aria-label="CAT Test 1"
          />
          {errors?.cat1 && <div className="text-xs text-red-600 mt-1">{errors.cat1}</div>}
        </div>

        <div>
          <label className="block text-sm mb-1">CAT Test 2 (out of 60)</label>
          <input
            type="number"
            min="0"
            max="60"
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