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
