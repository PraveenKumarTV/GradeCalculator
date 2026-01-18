import React, { useState } from "react";
import InternalMarks from "./components/InternalMarks";
import ExternalMarks from "./components/ExternalMarks";
import Result from "./components/Result";
import TargetCalculator from "./components/TargetCalculator";
import Header from "./components/Header";
import logo from "./assets/logo1.png";
import AnimatedBackground from "./components/AnimatedBackground";

function getGradeAndPoints(score) {
  // score is 0-100
  if (score >= 91) return { grade: "O", points: 10, min: 91 };
  if (score >= 81) return { grade: "A+", points: 9, min: 81 };
  if (score >= 71) return { grade: "A", points: 8, min: 71 };
  if (score >= 61) return { grade: "B+", points: 7, min: 61 };
  if (score >= 56) return { grade: "B", points: 6, min: 56 };
  if (score >= 50) return { grade: "C", points: 5, min: 50 };
  return { grade: "U", points: 0, min: 0 };
}

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
      { key: "a1", value: a1, min: 0, max: 40 },
      { key: "a2", value: a2, min: 0, max: 40 },
      { key: "cat1", value: cat1, min: 0, max: 60 },
      { key: "cat2", value: cat2, min: 0, max: 60 },
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

    // Assignments: two each out of 40 => total max 80
    const assignTotal = iA1 + iA2; // out of 80
    // CATs: two each out of 60 => total max 120
    const catTotal = iCat1 + iCat2; // out of 120

    // Convert to percentages (0-100)
    const assignPct = (assignTotal / 80) * 100;
    const catPct = (catTotal / 120) * 100;

    // Internal marks out of 100: 40% assignments + 60% CATs
    const internalMarks = assignPct * 0.4 + catPct * 0.6;

    // Contributions
    const internalContribution = internalMarks * 0.4; // 40% of internal
    const externalContribution = iExternal * 0.6; // 60% of external

    const finalTotal = internalContribution + externalContribution; // out of 100

    const { grade, points } = getGradeAndPoints(finalTotal);

    return {
      internalMarks: Number(internalMarks.toFixed(2)),
      internalContribution: Number(internalContribution.toFixed(2)),
      externalRaw: Number(iExternal.toFixed(2)),
      externalContribution: Number(externalContribution.toFixed(2)),
      finalTotal: Number(finalTotal.toFixed(2)),
      grade,
      points
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        {/* <h1 className="text-2xl font-semibold mb-4 text-slate-700">Grade Calculator</h1> */}
        <Header title="Grade Calculator" subtitle="Internal & External grade calculator (Applies only for standard grading scale.)" logoSrc={logo} />

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
            Assignments: each out of 40. CATs: each out of 60. Internal = 40% assignments + 60% CATs (out of 100).
            Final = 40% internal + 60% external. Select target grade in the target calculator below. 
          </div>
        </div>

        <div className="mt-6">
          <Result result={result} />
        </div>

        <div className="mt-6">
          <TargetCalculator />
        </div>
        <footer className="mt-8 text-center">
      <hr className="border-slate-200 my-4" />
      <p className="text-sm text-slate-500 italic">
       Created to simplify academic life
      </p>
    </footer>
      </div>
    </div>
  );
}