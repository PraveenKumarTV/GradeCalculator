import React from 'react';
import Layout from '../components/Layout';
import GradeForm from '../components/GradeForm';
import ResultCard from '../components/ResultCard';
import { useForm } from '../hooks/useForm';

const Home = () => {
    const { internalMarks, externalMarks, finalGrade, calculateGrade } = useForm();

    return (
        <Layout>
            <h1 className="text-2xl font-bold text-center mb-4">Grade Calculator</h1>
            <GradeForm 
                internalMarks={internalMarks} 
                externalMarks={externalMarks} 
                onCalculate={calculateGrade} 
            />
            {finalGrade && <ResultCard finalGrade={finalGrade} />}
        </Layout>
    );
};

export default Home;