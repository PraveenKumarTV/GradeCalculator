export const calculateInternalTotal = (internalMarks) => {
    return internalMarks.reduce((total, mark) => total + mark, 0);
};

export const scaleExternalMarks = (externalMarks) => {
    const totalExternalMarks = externalMarks.reduce((total, mark) => total + mark, 0);
    return (totalExternalMarks / (externalMarks.length * 100)) * 30; // Scale to 30
};

export const calculateFinalGrade = (internalTotal, externalScaled) => {
    const finalTotal = internalTotal + externalScaled;

    if (finalTotal >= 90) {
        return 'A+';
    } else if (finalTotal >= 80) {
        return 'A';
    } else if (finalTotal >= 70) {
        return 'B+';
    } else if (finalTotal >= 60) {
        return 'B';
    } else if (finalTotal >= 50) {
        return 'C';
    } else if (finalTotal >= 40) {
        return 'D';
    } else {
        return 'F';
    }
};