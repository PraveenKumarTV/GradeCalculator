import React, { useState } from 'react';
import InternalMarks from './InternalMarks';
import ExternalMarks from './ExternalMarks';
import { calculateFinalGrade } from '../utils/calculation';

const GradeForm = () => {
    const [internalMarks, setInternalMarks] = useState(0);
    const [externalMarks, setExternalMarks] = useState(0);
    const [finalGrade, setFinalGrade] = useState(null);

    const handleInternalMarksChange = (marks) => {
        setInternalMarks(marks);
    };

    const handleExternalMarksChange = (marks) => {
        setExternalMarks(marks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalTotal = calculateFinalGrade(internalMarks, externalMarks);
        setFinalGrade(finalTotal);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Grade Calculator</h2>
            <InternalMarks onChange={handleInternalMarksChange} />
            <ExternalMarks onChange={handleExternalMarksChange} />
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Calculate Grade
            </button>
            {finalGrade && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Final Grade: {finalGrade}</h3>
                </div>
            )}
        </form>
    );
};

export default GradeForm;