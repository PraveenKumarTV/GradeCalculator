import React, { useState } from "react";

const gradeOptions = [
  { label: "O (91-100) - 10 pts", value: "O", min: 91 },
  { label: "A+ (81-90) - 9 pts", value: "A+", min: 81 },
  { label: "A (71-80) - 8 pts", value: "A", min: 71 },
  { label: "B+ (61-70) - 7 pts", value: "B+", min: 61 },
  { label: "B (56-60) - 6 pts", value: "B", min: 56 },
  { label: "C (50-55) - 5 pts", value: "C", min: 50 },
  { label: "U (0-49) - 0 pts", value: "U", min: 0 }
];

export default function TargetCalculator() {
  const [internal40, setInternal40] = useState("");
  const [externalInput, setExternalInput] = useState("");
  const [targetGrade1, setTargetGrade1] = useState("A");
  const [targetGrade2, setTargetGrade2] = useState("A");
  const [outExt, setOutExt] = useState(null);
  const [outInt40, setOutInt40] = useState(null);
  const [err, setErr] = useState("");

  const getMinForGrade = (g) => gradeOptions.find((o) => o.value === g).min;

  // Given internal contribution out of 40 -> required external (0-100)
  const calcRequiredExternalFromInternal40 = () => {
    setErr("");
    setOutExt(null);

    const i40 = Number(internal40);
    if (Number.isNaN(i40) || i40 < 0 || i40 > 40) {
      setErr("Internal must be a number between 0 and 40 (internal contribution).");
      return;
    }

    const target = getMinForGrade(targetGrade1); // 0-100
    // final = internal40 + 0.6*external >= target
    const required = (target - i40) / 0.6;
    const req = Number(required.toFixed(2));

    if (req > 100) {
      setOutExt({ possible: false, message: `Requires external >= ${req} (>100) — NOT POSSIBLE` });
    } else if (req <= 0) {
      setOutExt({ possible: true, value: 0, message: `No external required (minimum 0).` });
    } else {
      setOutExt({ possible: true, value: req, message: `Minimum external required: ${req} (out of 100)` });
    }
  };

  // Given external (0-100) -> required internal contribution out of 40
  const calcRequiredInternal40FromExternal = () => {
    setErr("");
    setOutInt40(null);

    const ext = Number(externalInput);
    if (Number.isNaN(ext) || ext < 0 || ext > 100) {
      setErr("External must be a number between 0 and 100.");
      return;
    }

    const target = getMinForGrade(targetGrade2);
    // final = internal40 + 0.6*external >= target => internal40 >= target - 0.6*external
    const required = target - 0.6 * ext;
    const req = Number(required.toFixed(2));

    if (req > 40) {
      setOutInt40({ possible: false, message: `Requires internal >= ${req} (>40) — NOT POSSIBLE` });
    } else if (req <= 0) {
      setOutInt40({ possible: true, value: 0, message: `No internal contribution required (minimum 0).` });
    } else {
      setOutInt40({ possible: true, value: req, message: `Minimum internal contribution required: ${req} (out of 40)` });
    }
  };

  return (
    <div className="p-4 rounded-lg border mt-6">
      <h3 className="font-semibold mb-3 text-slate-700">Target Calculator (internal out of 40)</h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-slate-50 p-4 rounded">
          <div className="text-sm mb-2 font-medium">Given Internal (out of 40) → Required External</div>

          <label className="block text-xs mb-1">Internal contribution (0-40)</label>
          <input
            type="number"
            min="0"
            max="40"
            value={internal40}
            onChange={(e) => setInternal40(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
          />

          <label className="block text-xs mb-1">Desired Grade</label>
          <select
            value={targetGrade1}
            onChange={(e) => setTargetGrade1(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          >
            {gradeOptions.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          <button onClick={calcRequiredExternalFromInternal40} className="px-4 py-2 bg-green-600 text-white rounded">
            Calculate Required External
          </button>

          <div className="mt-3 text-sm">
            {outExt && <div className={outExt.possible ? "text-slate-700" : "text-red-600"}>{outExt.message}</div>}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded">
          <div className="text-sm mb-2 font-medium">Given External → Required Internal (out of 40)</div>

          <label className="block text-xs mb-1">External marks (0-100)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={externalInput}
            onChange={(e) => setExternalInput(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2"
          />

          <label className="block text-xs mb-1">Desired Grade</label>
          <select
            value={targetGrade2}
            onChange={(e) => setTargetGrade2(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          >
            {gradeOptions.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          <button onClick={calcRequiredInternal40FromExternal} className="px-4 py-2 bg-green-600 text-white rounded">
            Calculate Required Internal (out of 40)
          </button>

          <div className="mt-3 text-sm">
            {outInt40 && <div className={outInt40.possible ? "text-slate-700" : "text-red-600"}>{outInt40.message}</div>}
          </div>
        </div>
      </div>

      {err && <div className="mt-3 text-red-600">{err}</div>}

      <div className="mt-4 text-xs text-slate-500">
        Notes: Final score = internal contribution (0-40) + 0.6 * external (0-60) = final (0-100).
      </div>
    </div>
  );
}