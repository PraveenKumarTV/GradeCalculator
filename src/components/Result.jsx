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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-3 bg-slate-50 rounded">
          <div className="text-xs text-slate-500">Internal (out of 100)</div>
          <div className="text-xl font-medium">{result.internalMarks}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="text-xs text-slate-500">Internal Contribution (40% of internal)</div>
          <div className="text-xl font-medium">{result.internalContribution}</div>
        </div>

        <div className="p-3 bg-slate-50 rounded">
          <div className="text-xs text-slate-500">External (raw, out of 100)</div>
          <div className="text-xl font-medium">{result.externalRaw}</div>
          <div className="text-xs text-slate-400 mt-1">External Contribution (60%): {result.externalContribution}</div>
        </div>

        <div className="p-3 bg-indigo-600 text-white rounded">
          <div className="text-xs opacity-80">Final (40% internal + 60% external) — out of 100</div>
          <div className="text-2xl font-bold">{result.finalTotal}</div>
          <div className="mt-1 text-sm">Grade: {result.grade} — Points: {result.points}</div>
        </div>
      </div>
    </div>
  );
}