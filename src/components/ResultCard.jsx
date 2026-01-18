import React from 'react';

const ResultCard = ({ internalTotal, externalScaled, finalTotal, grade }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h2 className="text-xl font-bold mb-4">Grade Result</h2>
            <div className="mb-2">
                <span className="font-semibold">Internal Total:</span> {internalTotal} / 70
            </div>
            <div className="mb-2">
                <span className="font-semibold">External Scaled Marks:</span> {externalScaled} / 30
            </div>
            <div className="mb-2">
                <span className="font-semibold">Final Total:</span> {finalTotal} / 100
            </div>
            <div className="mb-2">
                <span className="font-semibold">Grade:</span> {grade}
            </div>
        </div>
    );
};

export default ResultCard;